import { FeedPostsType, PostType } from "@/types/post/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addLike = async (payload: { postID: string }) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/post/add/like/${payload.postID}`, {
            method: "POST",
            credentials: "include",
            headers: { Accept: "application/json", "x-csrf-token": csrfToken },
        });
    };
    let response = await apiCall();

    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add like");
    }

    return data;
};

interface OldFeedType {
    pages: FeedPostsType[];
}

export const useAddLikeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addLike,
        retry: false,
        onMutate: async payload => {
            await Promise.all([
                queryClient.cancelQueries({ queryKey: ["feedPosts"] }),
                queryClient.cancelQueries({ queryKey: ["userPosts"] }),
                queryClient.cancelQueries({ queryKey: [`post:${payload.postID}`] }),
            ]);

            const previousFeedPosts = queryClient.getQueryData(["feedPosts"]);
            const previousUserPosts = queryClient.getQueryData(["userPosts"]);
            const previousPost = queryClient.getQueryData([`post:${payload.postID}`]);

            const updateFeedFunction = (oldFeed: OldFeedType) => {
                if (!oldFeed) return oldFeed;

                return {
                    ...oldFeed,
                    pages: oldFeed.pages.map(page => ({
                        ...page,
                        posts: page.posts.map(post =>
                            post.id === payload.postID ? { ...post, viewerLiked: true, likeCount: post.likeCount + 1, commentCount: post.commentCount } : post
                        ),
                    })),
                };
            };

            const updatePostFunction = (oldPost: PostType) => {
                if (!oldPost) return oldPost;

                return {
                    ...oldPost,
                    viewerLiked: true,
                    likeCount: oldPost.likeCount + 1,
                    commentCount: oldPost.commentCount,
                };
            };

            queryClient.setQueryData(["feedPosts"], updateFeedFunction);
            queryClient.setQueryData(["userPosts"], updateFeedFunction);
            queryClient.setQueryData([`post:${payload.postID}`], updatePostFunction);

            return { previousFeedPosts, previousUserPosts, previousPost };
        },

        onError: (_error, _postId, context) => {
            if (context?.previousFeedPosts) {
                queryClient.setQueryData(["feedPosts"], context.previousFeedPosts);
            }

            if (context?.previousUserPosts) {
                queryClient.setQueryData(["userPosts"], context.previousUserPosts);
            }

            if (context?.previousPost) {
                queryClient.setQueryData([`post:${_postId.postID}`], context.previousPost);
            }
        },

        onSuccess: async (data, _ids) => {
            await queryClient.invalidateQueries({
                queryKey: [`likes:${_ids.postID}`],
            });
        },
    });
};
