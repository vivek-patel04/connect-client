import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BodyType {
    skillName: string;
    description?: string | null;
}
const updateSkill = async (body: BodyType, skillID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/update/skill/${skillID}`, {
            method: "PATCH",
            credentials: "include",
            headers: { Accept: "application/json", "Content-Type": "application/json", "x-csrf-token": csrfToken },
            body: JSON.stringify(body),
        });
    };
    let response = await apiCall();

    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update skill");
    }

    return data.skills;
};

interface UpdateSkillParams {
    body: BodyType;
    skillID: string;
}

export const useUpdateSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ body, skillID }: UpdateSkillParams) => updateSkill(body, skillID),
        retry: false,

        onSuccess: async data => {
            const updateFunction = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: {
                        ...old.personalData,
                        skills: data,
                    },
                };
            };

            queryClient.setQueryData(["me"], updateFunction);
        },
    });
};
