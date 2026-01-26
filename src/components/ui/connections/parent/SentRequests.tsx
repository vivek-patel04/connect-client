"use client";

import SentRequestCard from "../child/SentRequestCard";
import { useGetSentRequestsQuery } from "@/hooks/api/user/useGetSentRequestsQuery";
import ErrorMessage from "../../error/ErrorMessage";
import { useMemo } from "react";

export default function SentRequests() {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, error } = useGetSentRequestsQuery();

    const users = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.users);
    }, [data]);

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
                <p className="text-small text-white-50">No sent requests</p>
            </div>
        );
    }

    return (
        <div>
            <ul className="flex flex-col gap-1.5">
                {users.map(user => (
                    <li key={user.id}>
                        <SentRequestCard user={user} />
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
