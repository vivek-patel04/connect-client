import { FeedPostsType } from "@/types/post/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useInfiniteQuery } from "@tanstack/react-query";

interface CursorType {
    createdAt: string;
    id: string;
}

const getPosts = async (cursor: CursorType): Promise<FeedPostsType> => {
    const apiCall = async () => {
        const res = await fetch(`/api/post/posts/user?cursor=${JSON.stringify(cursor)}`, {
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
        throw new Error(data.message || "Failed to get user posts");
    }

    return data;
};

const INITIAL_CURSOR: CursorType = {
    createdAt: new Date("9999-12-31").toISOString(),
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
};

export const useGetUserPostsQuery = () => {
    return useInfiniteQuery({
        queryKey: ["userPosts"],
        initialPageParam: INITIAL_CURSOR,
        queryFn: ({ pageParam }) => getPosts(pageParam),
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
