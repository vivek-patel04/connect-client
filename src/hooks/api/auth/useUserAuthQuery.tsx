import { UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const userAuth = async (): Promise<UserMiniType> => {
    const apiCall = async () => {
        return await fetch(`/api/auth/authentication`, {
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
        throw new Error(data.message || "Failed to validate user authentication");
    }

    return data.user;
};

export const useUserAuthQuery = () => {
    return useQuery({
        queryKey: ["user-auth"],
        queryFn: userAuth,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
