"use client";

import { useUpdateNotificationReadMutation } from "@/hooks/api/notification/useUpdateNotificationReadMutation";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { closeNotificationDesktop, closeNotificationMobile } from "@/store/features/uiSlice";
import { NotificationType } from "@/types/notification/types";
import { useRouter } from "next/navigation";

export default function NotificationCard({ notification }: { notification: NotificationType }) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { mutateAsync: markAsRead } = useUpdateNotificationReadMutation();

    const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(notification.createdAt));

    const handleClickNotification = async () => {
        try {
            await markAsRead(notification._id);
            switch (notification.type) {
                case "like":
                    router.push(`/post/${notification.meta.postID}`);
                    break;

                case "comment":
                    router.push(`/post/${notification.meta.postID}`);
                    break;

                case "send-request":
                    router.push(`/profile/${notification.meta.userID}`);
                    break;

                case "accept-request":
                    router.push(`/profile/${notification.meta.userID}`);
                    break;

                case "welcome-message":
                    router.push(`/profile`);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(closeNotificationDesktop());
            dispatch(closeNotificationMobile());
        }
    };

    return (
        <div
            className={`${notification.isRead ? "bg-white" : "bg-body"} text-white-40 px-7 py-3 hover:cursor-pointer border-t border-t-white-85`}
            onClick={handleClickNotification}
        >
            <p>{notification.message}</p>
            <div className="text-[0.7rem] text-white-60 mt-3 flex justify-end font-normal">
                <p>{formattedDateTime}</p>
            </div>
        </div>
    );
}
