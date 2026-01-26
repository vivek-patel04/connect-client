"use client";

import { useGetNotificationsQuery } from "@/hooks/api/notification/useGetNotificationsQuery";
import NotificationCard from "../child/NotificationCard";
import { LuX } from "react-icons/lu";
import { closeNotificationMobile } from "@/store/features/uiSlice";
import { useAppDispatch } from "@/hooks/redux/hooks";

export default function NotificationWindow() {
    const { data, hasNextPage, fetchNextPage, isLoading, error } = useGetNotificationsQuery();
    const dispatch = useAppDispatch();

    if (!data) return null;

    const notifications = data.pages.flatMap(p => p.notifications);

    return (
        <div className="absolute right-0 left-0 md:right-1 md:left-auto md:top-[72px] z-10 backdrop-notification md:max-w-[430px] flex flex-col">
            <div className="px-3 pt-3 pb-8 flex justify-between">
                <h1 className="font-semibold">Notifications</h1>

                <button className="btn-icon text-black md:hidden" onClick={() => dispatch(closeNotificationMobile())}>
                    <LuX />
                </button>
            </div>

            <div className="overflow-y-auto thin-scrollbar">
                <ul className="flex flex-col">
                    {notifications.map(n => (
                        <li key={n._id}>
                            <NotificationCard notification={n} />
                        </li>
                    ))}
                </ul>

                {hasNextPage ? (
                    <div className="flex justify-center my-2">
                        <button className="btn-outline" onClick={() => fetchNextPage()}>
                            Load More
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center my-2">
                        <p className="text-small text-white-50">No more notifications</p>
                    </div>
                )}
            </div>
        </div>
    );
}
