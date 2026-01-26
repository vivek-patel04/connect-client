import { MessagesType } from "@/types/message/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

interface CursorType {
    createdAt: string;
    id: string;
}

const getMessages = async (cursor: CursorType, peerUserID: string): Promise<MessagesType> => {
    const apiCall = async () => {
        if (!peerUserID) {
            throw new Error("Peer user id is required");
        }
        const res = await fetch(`/api/message/conversation/${peerUserID}?cursor=${JSON.stringify(cursor)}`, {
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
        throw new Error(data.message || "Failed to get messages");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    createdAt: new Date("9999-12-31").toISOString(),
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
};

export const useGetMessagesQuery = (peerUserID: string) => {
    return useInfiniteQuery({
        queryKey: [`messages:${peerUserID}`],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getMessages(pageParam, peerUserID),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
