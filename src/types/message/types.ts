import { UserMiniType } from "../user/types";

export interface MessageType {
    id: string;
    senderUserID: string;
    receiverUserID: string;
    status: "sent" | "delivered" | "read";
    createdAt: string;
    conversationID: string;
    content: string;
}

export interface MessagesType {
    messages: MessageType[];
    nextCursor: {
        createdAt: string;
        id: string;
    };
}

export interface WsMessageType {
    type: "message";
    data: MessageType;
}

export interface WsErrorMessageType {
    type: "error";
    code: number;
    message: string;
}

export interface RecentConversationUserType {
    id: string;
    user: UserMiniType;
    unreadMessageCount: number;
}

export interface RecentConversationUsersType {
    recentConversationsUsers: RecentConversationUserType[];
    nextCursor: {
        lastMessageAt: string;
        id: string;
    };
}
