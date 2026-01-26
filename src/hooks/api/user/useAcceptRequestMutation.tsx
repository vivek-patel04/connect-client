import { RelationType, UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const acceptRequest = async (userID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/request/accept/${userID}`, {
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
        throw new Error(data.message || "Failed to accept request");
    }

    return data;
};

export const useAcceptRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptRequest,
        retry: false,

        onMutate: async userID => {
            await queryClient.cancelQueries({ queryKey: [`relation:${userID}`] });

            const previousData = queryClient.getQueryData([`relation:${userID}`]);

            const updateFn = (old: RelationType) => {
                if (!old) return old;
                return { ...old, relation: "connection" };
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
            queryClient.invalidateQueries({ queryKey: ["connectionCount"] });
            queryClient.invalidateQueries({ queryKey: ["connections"] });
            queryClient.invalidateQueries({ queryKey: ["connections-az"] });
            queryClient.invalidateQueries({ queryKey: ["feedPosts"] });

            await queryClient.cancelQueries({ queryKey: ["receivedRequests"] });

            queryClient.setQueryData(["receivedRequests"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({ ...page, users: page.users.filter((user: UserMiniType) => user.id !== userID) })),
                };
            });
        },
    });
};
