import { CursorType, ConnectionsType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

const getConnections = async (cursor: CursorType): Promise<ConnectionsType> => {
    const apiCall = async () => {
        return await fetch(`/api/user/connection-recent?cursor=${JSON.stringify(cursor)}`, {
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
        throw new Error(data.message || "Failed to get connections");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    createdAt: new Date("9999-12-31").toISOString(),
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
};

export const useGetConnectionsQuery = () => {
    return useInfiniteQuery({
        queryKey: ["connections"],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getConnections(pageParam),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
