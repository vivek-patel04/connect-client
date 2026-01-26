import { NotificationsType } from "@/types/notification/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

interface CursorType {
    createdAt: string;
    id: string;
}

const getNotifications = async (cursor: CursorType): Promise<NotificationsType> => {
    const apiCall = async () => {
        const res = await fetch(`/api/notification/get/notifications?cursor=${encodeURIComponent(JSON.stringify(cursor))}`, {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
        });
        return res;
    };
    let response = await apiCall();

    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get notifications");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    createdAt: new Date("9999-12-31").toISOString(),
    id: "ffffffffffffffffffffffff",
};

export const useGetNotificationsQuery = () => {
    return useInfiniteQuery({
        queryKey: ["notifications"],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getNotifications(pageParam),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
