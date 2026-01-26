import { QueryClient } from "@tanstack/react-query";

interface ParametersType {
    queryClient: QueryClient;
    messageData: any;
    userID: string;
}

export const deleteLike = ({ queryClient, messageData, userID }: ParametersType) => {
    if (messageData.userID === userID) return;

    queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                posts: page.posts.map((post: any) => (post.id === messageData.postID ? { ...post, likeCount: post.likeCount - 1 } : post)),
            })),
        };
    });

    queryClient.setQueryData(["userPosts"], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                posts: page.posts.map((post: any) => (post.id === messageData.postID ? { ...post, likeCount: post.likeCount - 1 } : post)),
            })),
        };
    });

    queryClient.setQueryData([`post:${messageData.postID}`], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            likeCount: old.likeCount - 1,
        };
    });

    queryClient.invalidateQueries({ queryKey: [`likes:${messageData.postID}`] });
};
