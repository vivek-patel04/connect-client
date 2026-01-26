import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteSkill = async (skillID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/del/skill/${skillID}`, {
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
        throw new Error(data.message || "Failed to delete skill");
    }

    return data;
};

interface DeleteSkillParams {
    skillID: string;
}

export const useDeleteSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ skillID }: DeleteSkillParams) => deleteSkill(skillID),
        retry: false,

        onMutate: async ({ skillID }: DeleteSkillParams) => {
            await queryClient.cancelQueries({ queryKey: ["me"] });

            const previousMe = queryClient.getQueryData(["me"]);

            const updateMe = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: { ...old.personalData, skills: old.personalData.skills.filter(skill => skill.id !== skillID) },
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
