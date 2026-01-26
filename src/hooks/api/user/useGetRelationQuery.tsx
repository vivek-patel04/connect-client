import { RelationType } from "@/types/user/types";
import { authWithRefresh } from "@/utils/authWithRefresh";
import { useQuery } from "@tanstack/react-query";

const getRelation = async (userID: string): Promise<RelationType> => {
    const apiCall = async () => {
        return await fetch(`/api/user/relation/${userID}`, {
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
        throw new Error(data.message || "Failed to get relation");
    }

    return data;
};

export const useGetRelationQuery = (userID: string) => {
    return useQuery({
        queryKey: [`relation:${userID}`],
        queryFn: () => getRelation(userID),
        retry: false,
        staleTime: 1000 * 60 * 30,
    });
};
