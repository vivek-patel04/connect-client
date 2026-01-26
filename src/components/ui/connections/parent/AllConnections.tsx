"use client";

import { useGetConnectionsQuery } from "@/hooks/api/user/useGetConnectionsQuery";
import ConnectionCard from "../child/ConnectionCard";
import ErrorMessage from "../../error/ErrorMessage";
import { useMemo } from "react";

export default function AllConnections() {
    const { data: connections, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, error } = useGetConnectionsQuery();

    const users = useMemo(() => {
        if (!connections) return [];
        return connections.pages.flatMap(page => page.users);
    }, [connections]);

    if (isLoading)
        return (
            <div className="flex flex-col gap-2 mt-2">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="loading-line-small"></div>
                ))}
            </div>
        );

    if (error) {
        console.log(error);
        return <ErrorMessage message={"Something went wrong. Please try again later."} />;
    }

    if (users.length === 0) {
        return (
            <div className="flex justify-center">
                <p className="text-small text-white-50">No connections</p>
            </div>
        );
    }

    return (
        <div>
            <ul className="flex flex-col gap-1.5">
                {users.map(user => (
                    <li key={user.id}>
                        <ConnectionCard user={user} />
                    </li>
                ))}
            </ul>

            <div>
                {hasNextPage && (
                    <div className="mt-3 flex justify-center">
                        <button onClick={() => fetchNextPage()} className="btn-outline">
                            {isFetchingNextPage ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
