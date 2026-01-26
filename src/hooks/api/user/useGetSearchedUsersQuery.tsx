import { UserMiniType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getSearchedUsers = async (name: string): Promise<UserMiniType[]> => {
    const apiCall = async () => {
        return await fetch(`/api/user/search?name=${name}`, {
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
        throw new Error(data.message || "Failed to get searched users");
    }

    return data.users;
};

export const useGetSearchedUsersQuery = (name: string) => {
    return useQuery({
        queryKey: ["searchedUsers", name],
        queryFn: () => getSearchedUsers(name),
        retry: false,
        staleTime: 1000 * 60,
        enabled: name.length >= 3,
    });
};
