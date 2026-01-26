import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteEducation = async (educationID: string) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/del/education/${educationID}`, {
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
        throw new Error(data.message || "Failed to delete education");
    }

    return data;
};

interface DeleteEducationParams {
    educationID: string;
}

export const useDeleteEducationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ educationID }: DeleteEducationParams) => deleteEducation(educationID),
        retry: false,

        onMutate: async ({ educationID }: DeleteEducationParams) => {
            await queryClient.cancelQueries({ queryKey: ["me"] });

            const previousMe = queryClient.getQueryData(["me"]);

            const updateMe = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: { ...old.personalData, education: old.personalData.education.filter(education => education.id !== educationID) },
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
