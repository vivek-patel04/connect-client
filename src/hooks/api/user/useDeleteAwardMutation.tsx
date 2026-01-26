import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAward = async (awardID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/del/award/${awardID}`, {
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
        throw new Error(data.message || "Failed to delete award");
    }

    return data;
};

interface DeleteAwardParams {
    awardID: string;
}

export const useDeleteAwardMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ awardID }: DeleteAwardParams) => deleteAward(awardID),
        retry: false,

        onMutate: async ({ awardID }: DeleteAwardParams) => {
            await queryClient.cancelQueries({ queryKey: ["me"] });

            const previousMe = queryClient.getQueryData(["me"]);

            const updateMe = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: { ...old.personalData, awards: old.personalData.awards.filter(award => award.id !== awardID) },
                };
            };

            queryClient.setQueryData(["me"], updateMe);
            return { previousMe };
        },

        onError: (_error, _ids, context) => {
            if (context?.previousMe) {
                queryClient.setQueryData(["me"], context.previousMe);
            }
        },
    });
};
