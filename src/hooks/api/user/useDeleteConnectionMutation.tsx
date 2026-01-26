import { RelationType, UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteConnection = async (userID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/del/connection/${userID}`, {
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
        throw new Error(data.message || "Failed to delete connection");
    }

    return data;
};

export const useDeleteConnectionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteConnection,
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
            queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
            queryClient.invalidateQueries({ queryKey: ["connectionCount"] });

            await queryClient.cancelQueries({ queryKey: ["connections"] });
            await queryClient.cancelQueries({ queryKey: ["connections-az"] });

            queryClient.setQueryData(["connections"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({ ...page, users: page.users.filter((user: UserMiniType) => user.id !== userID) })),
                };
            });

            queryClient.setQueryData(["connections-az"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({ ...page, users: page.users.filter((user: UserMiniType) => user.id !== userID) })),
                };
            });
        },
    });
};
