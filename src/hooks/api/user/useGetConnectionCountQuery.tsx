import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getConnectionCount = async (userID: string): Promise<number> => {
    const apiCall = async () => {
        return await fetch(`/api/user/connection/count/${userID}`, {
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
        throw new Error(data.message || "Failed to get connection count");
    }

    return data.connectionCount;
};

export const useGetConnectionCountQuery = (userID: string) => {
    return useQuery({
        queryKey: ["connectionCount", `connectionCount:${userID}`],
        queryFn: () => getConnectionCount(userID),
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
