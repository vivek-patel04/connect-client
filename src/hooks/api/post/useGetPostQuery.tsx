import { PostType } from "@/types/post/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getPost = async ({ postID }: { postID: string }): Promise<PostType> => {
    const apiCall = async () => {
        const res = await fetch(`/api/post/post/${postID}`, {
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
        throw new Error(data.message || "Failed to get posts");
    }

    return data.post;
};

export const useGetPostQuery = ({ postID }: { postID: string }) => {
    return useQuery({
        queryKey: [`post:${postID}`],
        queryFn: () => getPost({ postID }),
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
