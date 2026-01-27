import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getprofile = async (userID: string): Promise<UserProfileType> => {
    const apiCall = async () => {
        return await fetch(`/api/user/profile/${userID}`, {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
        });
    };
    let response = await apiCall();
    if (response.status === 401) {
        await authWithRefresh();
        response = await apiCall();
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get profile");
    }

    return data.userProfile;
};

export const useGetUserProfileQuery = (userID: string) => {
    return useQuery({
        queryKey: [`user-profile:${userID}`],
        queryFn: () => getprofile(userID),
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
