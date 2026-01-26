import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProfilePicture = async () => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        return await fetch(`/api/user/del/profile-picture`, {
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
        throw new Error(data.message || "Failed to delete profile picture");
    }

    return data;
};

export const useDeleteProfilePictureMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProfilePicture,
        retry: false,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
            queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
        },
    });
};
