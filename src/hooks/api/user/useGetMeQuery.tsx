import { UserProfileType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { clientBaseUrl } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

const getMe = async (): Promise<UserProfileType> => {
    const apiCall = async () => {
        return await fetch(`${clientBaseUrl}/bff/api/user/get-me`, {
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
        throw new Error(data.message || "Failed to get me");
    }

    return data.me;
};

export const useGetMeQuery = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
