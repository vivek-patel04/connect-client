import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ParameterType {
    body: { comment: string };
    postID: string;
}

const addComment = async (parameter: ParameterType) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/post/add/comment/${parameter.postID}`, {
            method: "POST",
            credentials: "include",
            headers: { Accept: "application/json", "Content-Type": "application/json", "x-csrf-token": csrfToken },
            body: JSON.stringify(parameter.body),
        });
    };
    let response = await apiCall();

    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
    }

    return data;
};

export const useAddCommentMutation = ({ postID }: { postID: string }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: { comment: string }) => addComment({ body, postID }),
        retry: false,

        // onSuccess: async () => {
        //     await Promise.all([
        //         queryClient.refetchQueries({
        //             queryKey: [`comments:${postID}`],
        //         }),

        //         queryClient.refetchQueries({
        //             queryKey: [`post:${postID}`],
        //         }),
        //     ]);
        // },
    });
};
