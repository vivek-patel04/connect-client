import { RelationType, UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const cancelRequest = async (userID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/del/sent-request/${userID}`, {
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
        throw new Error(data.message || "Failed to cancel request");
    }

    return data;
};

export const useCancelRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelRequest,
        retry: false,

        onMutate: async userID => {
            await queryClient.cancelQueries({ queryKey: [`relation:${userID}`] });

            const previousData = queryClient.getQueryData([`relation:${userID}`]);

            const updateFn = (old: RelationType) => {
                if (!old) return old;

                return { ...old, relation: "no relation" };
            };

            queryClient.setQueryData([`relation:${userID}`], updateFn);

            return { previousData };
        },

        onError: (_error, userID, context) => {
            if (context?.previousData) {
                queryClient.setQueryData([`relation:${userID}`], context.previousData);
            }
        },

        onSuccess: async (_, userID) => {
            queryClient.invalidateQueries({ queryKey: ["userSuggestion"] });

            await queryClient.cancelQueries({ queryKey: ["sentRequests"] });

            queryClient.setQueryData(["sentRequests"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({ ...page, users: page.users.filter((user: UserMiniType) => user.id !== userID) })),
                };
            });
        },
    });
};
