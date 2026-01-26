import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getUnreadNotificationsCount = async (): Promise<{ count: number }> => {
    const apiCall = async () => {
        const res = await fetch(`/api/notification/get/unreadCount`, {
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
        throw new Error(data.message || "Failed to get unread notifications count");
    }

    return data;
};

export const useGetUnreadNotificationsCountQuery = () => {
    return useQuery({
        queryKey: ["unreadNotificationsCount"],
        queryFn: getUnreadNotificationsCount,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
