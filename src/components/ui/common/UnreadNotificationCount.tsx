"use client";

import { useGetUnreadNotificationsCountQuery } from "@/hooks/api/notification/useGetUnreadNotificationsCountQuery";

export default function UnreadNotificationCount() {
    const { data } = useGetUnreadNotificationsCountQuery();
    if (!data || data.count === 0) return <span></span>;
    return <span className="text-[0.7rem] font-semibold text-black px-1 bg-white-85 rounded-full">{data.count}</span>;
}
