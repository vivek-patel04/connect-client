import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BodyType {
    skillName: string;
    description?: string | null;
}

const addSkill = async (body: BodyType) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/add/skill`, {
            method: "POST",
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
        throw new Error(data.message || "Failed to add skill");
    }

    return data.skills;
};

export const useAddSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addSkill,
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
