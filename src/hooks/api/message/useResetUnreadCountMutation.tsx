import { authWithRefresh } from "@/utils/authWithRefresh";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const resetUnreadCount = async (peerUserID: string) => {
    const apiCall = async () => {
        return await fetch(`/api/message/reset/unread-count/${peerUserID}`, {
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
        throw new Error(data.message || "Failed to reset unread count");
    }

    return data;
};

export const useResetUnreadCountMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resetUnreadCount,
        retry: false,

        onSuccess: (_data, peerUserID) => {
            queryClient.setQueryData(["recent-conversation-users"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        recentConversationsUsers: page.recentConversationsUsers.map((conversation: any) =>
                            conversation.user.id === peerUserID
                                ? {
                                      ...conversation,
                                      unreadMessageCount: 0,
                                  }
                                : conversation
                        ),
                    })),
                };
            });
        },
    });
};
