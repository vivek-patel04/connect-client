import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BodyType {
    institute: string;
    instituteType: string;
    startDate: string;
    endDate?: string | null;
    description?: string | null;
}
const updateEducation = async (body: BodyType, educationID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/update/education/${educationID}`, {
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
        throw new Error(data.message || "Failed to update education");
    }

    return data.education;
};

interface UpdateEducationParams {
    body: BodyType;
    educationID: string;
}

export const useUpdateEducationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ body, educationID }: UpdateEducationParams) => updateEducation(body, educationID),
        retry: false,

        onSuccess: async data => {
            const updateFunction = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: {
                        ...old.personalData,
                        education: data,
                    },
                };
            };

            queryClient.setQueryData(["me"], updateFunction);
        },
    });
};
