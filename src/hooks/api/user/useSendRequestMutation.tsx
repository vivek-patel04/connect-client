import { RelationType, UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const sendRequest = async (userID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/request/send/${userID}`, {
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
        throw new Error(data.message || "Failed to send request");
    }

    return data;
};

export const useSendRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendRequest,
        retry: false,

        onMutate: async userID => {
            await queryClient.cancelQueries({ queryKey: [`relation:${userID}`] });

            const previousData = queryClient.getQueryData([`relation:${userID}`]);

            const updateFn = (old: RelationType) => {
                if (!old) return old;
                return { ...old, relation: "request sent" };
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
            queryClient.invalidateQueries({ queryKey: ["sentRequests"] });

            await queryClient.cancelQueries({ queryKey: ["userSuggestion"] });

            queryClient.setQueryData(["userSuggestion"], (old: UserMiniType[]) => {
                if (!old) return old;

                return old.filter(user => user.id !== userID);
            });
        },
    });
};
