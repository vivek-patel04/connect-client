import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const markAsRead = async (notificationID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/notification/markAsRead/${notificationID}`, {
            method: "PATCH",
            credentials: "include",
            headers: { Accept: "application/json" },
        });
    };
    let response = await apiCall();

    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to mark notification as read");
    }

    return data;
};

export const useUpdateNotificationReadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsRead,
        retry: false,

        onMutate: async notificationID => {
            await queryClient.cancelQueries({
                queryKey: ["notifications"],
            });

            const previousNotifications = queryClient.getQueryData(["notifications"]);

            const updateNotificationFunction = (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        notifications: page.notifications.map((notification: any) =>
                            notification._id === notificationID ? { ...notification, isRead: true } : notification
                        ),
                    })),
                };
            };

            queryClient.setQueryData(["notifications"], updateNotificationFunction);
            return { previousNotifications };
        },

        onError: (_error, _notificationID, context) => {
            if (context?.previousNotifications) {
                queryClient.setQueryData(["notifications"], context.previousNotifications);
            }
        },

        onSuccess: () => {
            queryClient.setQueryData(["unreadNotificationsCount"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    count: old.count - 1,
                };
            });
        },
    });
};
