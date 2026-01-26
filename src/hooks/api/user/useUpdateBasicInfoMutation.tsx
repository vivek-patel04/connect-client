import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BodyType {
    dob?: string | null;
    gender?: string | null;
    hometown?: string | null;
    languages?: string[];
    interests?: string[];
}
const updateBasicInfo = async (body: BodyType) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/update/basic-info`, {
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
        throw new Error(data.message || "Failed to update basic info");
    }

    return data.userBasicInfo;
};

export const useUpdateBasicInfoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBasicInfo,
        retry: false,

        onSuccess: async data => {
            const updateFunction = (old: UserProfileType) => {
                if (!old) return old;

                return {
                    ...old,
                    personalData: {
                        ...old.personalData,
                        ...data,
                    },
                };
            };

            queryClient.setQueryData(["me"], updateFunction);
        },
    });
};
