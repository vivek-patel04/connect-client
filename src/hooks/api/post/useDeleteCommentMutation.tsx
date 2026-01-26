import { CommentsType } from "@/types/post/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteComment = async (ids: { postID: string; commentID: string }) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/post/del/comment/${ids.postID}/${ids.commentID}`, {
            method: "DELETE",
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
        throw new Error(data.message || "Failed to delete comment");
    }

    return data;
};

interface OldCommentsType {
    pages: CommentsType[];
}

export const useDeleteCommentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: { postID: string; commentID: string }) => deleteComment(ids),
        retry: false,
        onMutate: async ids => {
            await queryClient.cancelQueries({ queryKey: [`comments:${ids.postID}`] });

            const previousComments = queryClient.getQueryData([`comments:${ids.postID}`]);

            const updateComment = (oldComments: OldCommentsType) => {
                if (!oldComments) return oldComments;

                return {
                    ...oldComments,
                    pages: oldComments.pages.map(page => ({ ...page, comments: page.comments.filter(p => p.id !== ids.commentID) })),
                };
            };

            queryClient.setQueryData([`comments:${ids.postID}`], updateComment);
            return { previousComments };
        },

        onError: (_error, _ids, context) => {
            if (context?.previousComments) {
                queryClient.setQueryData([`comments:${_ids.postID}`], context.previousComments);
            }
        },
    });
};
