import { QueryClient } from "@tanstack/react-query";

interface ParametersType {
    queryClient: QueryClient;
    messageData: any;
    userID: string;
}

export const deleteComment = ({ queryClient, messageData, userID }: ParametersType) => {
    queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                posts: page.posts.map((post: any) => (post.id === messageData.postID ? { ...post, commentCount: post.commentCount - 1 } : post)),
            })),
        };
    });

    queryClient.setQueryData(["userPosts"], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                posts: page.posts.map((post: any) => (post.id === messageData.postID ? { ...post, commentCount: post.commentCount - 1 } : post)),
            })),
        };
    });

    queryClient.setQueryData([`post:${messageData.postID}`], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            commentCount: old.commentCount - 1,
        };
    });

    queryClient.setQueryData([`comments:${messageData.postID}`], (old: any) => {
        if (!old) return old;

        if (messageData.userID === userID) {
            return old;
        }

        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                comments: page.comments.filter((comment: any) => comment.id !== messageData.id),
            })),
        };
    });
};
