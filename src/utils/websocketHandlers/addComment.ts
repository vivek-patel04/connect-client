import { QueryClient } from "@tanstack/react-query";

interface ParametersType {
    queryClient: QueryClient;
    messageData: any;
    userID: string;
}

export const addComment = ({ queryClient, messageData, userID }: ParametersType) => {
    const updatedMessagedata = { ...messageData, viewerComment: userID === messageData.userID };

    queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old) return old;
        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                posts: page.posts.map((post: any) => (post.id === messageData.postID ? { ...post, commentCount: post.commentCount + 1 } : post)),
            })),
        };
    });

    queryClient.setQueryData(["userPosts"], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                posts: page.posts.map((post: any) => (post.id === messageData.postID ? { ...post, commentCount: post.commentCount + 1 } : post)),
            })),
        };
    });

    queryClient.setQueryData([`post:${messageData.postID}`], (old: any) => {
        if (!old) return old;

        return {
            ...old,
            commentCount: old.commentCount + 1,
        };
    });

    queryClient.setQueryData([`comments:${messageData.postID}`], (old: any) => {
        if (!old) return old;
        return {
            ...old,
            pages: [{ ...old.pages[0], comments: [{ ...updatedMessagedata }, ...old.pages[0].comments] }, ...old.pages.slice(1)],
        };
    });
};
