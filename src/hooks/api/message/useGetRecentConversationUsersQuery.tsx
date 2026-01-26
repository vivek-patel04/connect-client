import { RecentConversationUsersType } from "@/types/message/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

interface CursorType {
    lastMessageAt: string;
    id: string;
}

const getUsers = async (lastMessageAtCursor: CursorType): Promise<RecentConversationUsersType> => {
    const apiCall = async () => {
        const res = await fetch(`/api/message/recent-conversations/users?lastMessageAtCursor=${JSON.stringify(lastMessageAtCursor)}`, {
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
        throw new Error(data.message || "Failed to get users by recent chats");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    lastMessageAt: new Date("9999-12-31").toISOString(),
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
};

export const useGetRecentConversationUsersQuery = () => {
    return useInfiniteQuery({
        queryKey: [`recent-conversation-users`],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getUsers(pageParam),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
