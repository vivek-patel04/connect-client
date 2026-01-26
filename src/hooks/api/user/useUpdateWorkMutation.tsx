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
const updateWork = async (body: BodyType, workID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/update/work/${workID}`, {
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
        throw new Error(data.message || "Failed to update work");
    }

    return data.workExperience;
};

interface UpdateWorkParams {
    body: BodyType;
    workID: string;
}

export const useUpdateWorkMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ body, workID }: UpdateWorkParams) => updateWork(body, workID),
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
