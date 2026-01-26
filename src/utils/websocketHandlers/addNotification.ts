import { NotificationsType, NotificationType } from "@/types/notification/types";
import { QueryClient } from "@tanstack/react-query";
interface OldType {
    pages: NotificationsType[];
}
interface ParametersType {
    queryClient: QueryClient;
    messageData: NotificationType;
    userID?: string;
}

export const addNotification = ({ queryClient, messageData }: ParametersType) => {
    queryClient.setQueryData(["notifications"], (old: OldType) => {
        if (!old) return old;

        let updated = { ...old };
        if (messageData.type === "like" || messageData.type === "send-request") {
            updated = {
                ...old,
                pages: old.pages.map((page: NotificationsType) => ({
                    ...page,
                    notifications: page.notifications.filter((notification: NotificationType) => String(notification._id) !== String(messageData._id)),
                })),
            };
        }
        return {
            ...updated,
            pages: [{ ...updated.pages[0], notifications: [{ ...messageData }, ...updated.pages[0].notifications] }, ...updated.pages.slice(1)],
        };
    });

    queryClient.setQueryData(["unreadNotificationsCount"], (old: any) => {
        if (!old) return old;
        return { ...old, count: old.count + 1 };
    });

    if (messageData.type === "accept-request") {
        queryClient.invalidateQueries({ queryKey: ["connectionCount"] });
        queryClient.invalidateQueries({ queryKey: [`relation:${messageData.meta.userID}`] });
        queryClient.invalidateQueries({ queryKey: ["connections"] });
        queryClient.invalidateQueries({ queryKey: ["connections-az"] });
        queryClient.invalidateQueries({ queryKey: ["sentRequests"] });
        queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    }

    if (messageData.type === "send-request") {
        queryClient.invalidateQueries({ queryKey: [`relation:${messageData.meta.userID}`] });
        queryClient.invalidateQueries({ queryKey: ["receivedRequests"] });
        queryClient.invalidateQueries({ queryKey: ["userSuggestion"] });
    }
};
