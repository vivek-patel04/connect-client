import { FeedPostsType } from "@/types/post/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePost = async (payload: { postID: string }) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        const res = await fetch(`/api/post/del/post/${payload.postID}`, {
            method: "DELETE",
            credentials: "include",
            headers: { Accept: "application/json", "x-csrf-token": csrfToken },
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
        throw new Error(data.message || "Failed to delete post");
    }

    return data;
};

interface OldType {
    pages: FeedPostsType[];
}

export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        retry: false,
        onMutate: async payload => {
            await queryClient.cancelQueries({ queryKey: ["feedPosts"] });
            await queryClient.cancelQueries({ queryKey: ["userPosts"] });

            const previousFeedPosts = queryClient.getQueryData(["feedPosts"]);
            const previousUserPosts = queryClient.getQueryData(["userPosts"]);

            const updateFeed = (old: OldType) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map(page => ({
                        ...page,
                        posts: page.posts.filter(p => p.id !== payload.postID),
                    })),
                };
            };

            queryClient.setQueryData(["feedPosts"], updateFeed);
            queryClient.setQueryData(["userPosts"], updateFeed);

            return { previousFeedPosts, previousUserPosts };
        },

        onError: (_error, _postId, context) => {
            if (context?.previousFeedPosts) {
                queryClient.setQueryData(["feedPosts"], context.previousFeedPosts);
            }
            if (context?.previousUserPosts) {
                queryClient.setQueryData(["feedPosts"], context.previousUserPosts);
            }
        },
    });
};
