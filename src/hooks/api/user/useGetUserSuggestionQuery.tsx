import { UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getUserSuggestion = async (): Promise<UserMiniType[]> => {
    const apiCall = async () => {
        return await fetch(`/api/user/connection/suggestion`, {
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
        throw new Error(data.message || "Failed to get user suggestion");
    }

    return data.users;
};

export const useGetUserSuggestionQuery = () => {
    return useQuery({
        queryKey: ["userSuggestion"],
        queryFn: getUserSuggestion,
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
