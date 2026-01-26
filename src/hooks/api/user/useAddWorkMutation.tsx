import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BodyType {
    organization: string;
    role: string;
    location: string;
    startDate: string;
    endDate?: string | null;
    description?: string | null;
}

const addWork = async (body: BodyType) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/add/work`, {
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
        throw new Error(data.message || "Failed to add work experience");
    }

    return data.workExperience;
};

export const useAddWorkMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addWork,
        retry: false,

        onSuccess: async data => {
            const updateFunction = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: {
                        ...old.personalData,
                        workExperience: data,
                    },
                };
            };

            queryClient.setQueryData(["me"], updateFunction);
        },
    });
};
