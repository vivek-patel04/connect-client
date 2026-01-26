"use client";

import { useMemo } from "react";
import ErrorMessage from "../../error/ErrorMessage";
import { useGetConnectionsAtoZQuery } from "@/hooks/api/user/useGetConnectionsAtoZQuery";
import ConnectionUserCard from "./ConnectionUserCard";

export default function ConnectionAllUsers() {
    const { data, hasNextPage, fetchNextPage, isLoading, error } = useGetConnectionsAtoZQuery();

    const connections = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(c => c.users);
    }, [data]);

    if (isLoading)
        return (
            <div className="flex flex-col gap-1.5">
                {[...Array(7)].map((_, index) => (
                    <div className="loading-line-small" key={index} />
                ))}
            </div>
        );

    if (error) {
        return <ErrorMessage />;
    }

    if (connections.length === 0) {
        return (
            <div className="flex justify-center">
                <p className="text-small text-white-50">No connections</p>
            </div>
        );
    }

    return (
        <>
            <ul className="flex flex-col gap-1.5">
                {connections.map(c => (
                    <li key={c.id}>
                        <ConnectionUserCard connection={c} />
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                {hasNextPage && (
                    <button onClick={() => fetchNextPage()} className="btn-outline mt-2">
                        Load More
                    </button>
                )}
            </div>
        </>
    );
}
