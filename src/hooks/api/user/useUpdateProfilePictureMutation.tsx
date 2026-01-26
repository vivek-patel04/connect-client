import { authWithRefresh } from "@/utils/authWithRefresh";
import { getCsrfTokenFromCookie } from "@/utils/getCsrfToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateProfilePicture = async (file: File) => {
    const apiCall = async () => {
        const csrfToken = getCsrfTokenFromCookie();
        if (!csrfToken) throw new Error("Invalid Token");

        const formData = new FormData();
        formData.append("profilePic", file);

        return fetch(`/api/user/update/profile-picture`, {
            method: "PATCH",
            credentials: "include",
            headers: { Accept: "application/json", "x-csrf-token": csrfToken },
            body: formData,
        });
    };

    let response = await apiCall();

    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();
    console.log(response);
    console.log(data);
    if (!response.ok) {
        throw new Error(data?.message || "Failed to update profile picture");
    }

    return data;
};

interface UpdateProfilePictureParams {
    file: File;
}

export const useUpdateProfilePictureMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ file }: UpdateProfilePictureParams) => updateProfilePicture(file),
        retry: false,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
            queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
        },
    });
};
