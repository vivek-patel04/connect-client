import { CursorType, ConnectionsType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

const getSentRequests = async (cursor: CursorType): Promise<ConnectionsType> => {
    const apiCall = async () => {
        return await fetch(`/api/user/request/sent?cursor=${JSON.stringify(cursor)}`, {
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
        throw new Error(data.message || "Failed to get sent requests");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    createdAt: new Date("9999-12-31").toISOString(),
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
};

export const useGetSentRequestsQuery = () => {
    return useInfiniteQuery({
        queryKey: ["sentRequests"],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getSentRequests(pageParam),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
