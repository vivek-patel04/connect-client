import { MessagesType, MessageType, RecentConversationUsersType, RecentConversationUserType } from "@/types/message/types";
import { UserMiniType } from "@/types/user/types";
import { QueryClient } from "@tanstack/react-query";

interface OldMessagesType {
    pages: MessagesType[];
}

interface OldRecentConversationUsersType {
    pages: RecentConversationUsersType[];
}

interface ParametersType {
    queryClient: QueryClient;
    data: {
        messageData: MessageType;

        conversationForReceiver: {
            id: string;
            user: UserMiniType;
            unreadMessageCount: number;
        };

        conversationForSender: {
            id: string;
            user: UserMiniType;
            unreadMessageCount: number;
        };
    };
    userID: string;
}

export const addMessage = ({ queryClient, data, userID }: ParametersType) => {
    const messageData = data.messageData;
    const peerUserID = messageData.receiverUserID === userID ? messageData.senderUserID : messageData.receiverUserID;

    queryClient.setQueryData([`messages:${peerUserID}`], (old: OldMessagesType) => {
        if (!old) return old;

        return {
            ...old,
            pages: [{ ...old.pages[0], messages: [{ ...messageData }, ...old.pages[0].messages] }, ...old.pages.slice(1)],
        };
    });

    queryClient.setQueryData(["recent-conversation-users"], (old: OldRecentConversationUsersType) => {
        if (!old) return old;

        const oldUpdated = {
            ...old,
            pages: old.pages.map((page: RecentConversationUsersType) => ({
                ...page,
                recentConversationsUsers: page.recentConversationsUsers.filter(
                    (conversation: RecentConversationUserType) => conversation.id !== messageData.conversationID
                ),
            })),
        };

        if (userID === messageData.receiverUserID) {
            return {
                ...oldUpdated,
                pages: [
                    {
                        ...oldUpdated.pages[0],
                        recentConversationsUsers: [{ ...data.conversationForReceiver }, ...oldUpdated.pages[0].recentConversationsUsers],
                    },
                    ...oldUpdated.pages.slice(1),
                ],
            };
        }

        if (userID === messageData.senderUserID) {
            return {
                ...oldUpdated,
                pages: [
                    {
                        ...oldUpdated.pages[0],
                        recentConversationsUsers: [{ ...data.conversationForSender }, ...oldUpdated.pages[0].recentConversationsUsers],
                    },
                    ...oldUpdated.pages.slice(1),
                ],
            };
        }
    });
};
