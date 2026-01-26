import { CursorType, ConnectionsType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

const getReceivedRequests = async (cursor: CursorType): Promise<ConnectionsType> => {
    const apiCall = async () => {
        return await fetch(`/api/user/request/received?cursor=${JSON.stringify(cursor)}`, {
            method: "GET",
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
        throw new Error(data.message || "Failed to get received requests");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    createdAt: new Date("9999-12-31").toISOString(),
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
};

export const useGetReceivedRequestsQuery = () => {
    return useInfiniteQuery({
        queryKey: ["receivedRequests"],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getReceivedRequests(pageParam),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
