export interface NotificationType {
    _id: string;
    type: string;
    receiverUserID: string;
    isRead: boolean;
    message: string;
    createdAt: string;
    meta: {
        userID: string;
        postID: string;
    };
}

export interface NotificationsType {
    notifications: NotificationType[];
    nextCursor: {
        createdAt: string;
        id: string;
    };
}
