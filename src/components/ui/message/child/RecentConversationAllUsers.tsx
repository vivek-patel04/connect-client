"use client";

import { useGetRecentConversationUsersQuery } from "@/hooks/api/message/useGetRecentConversationUsersQuery";
import { useMemo } from "react";
import ErrorMessage from "../../error/ErrorMessage";
import RecentConversationUserCard from "./RecentConversationUserCard";

export default function RecentConversationAllUsers() {
    const { data, hasNextPage, fetchNextPage, isLoading, error } = useGetRecentConversationUsersQuery();

    const recentConversationUsers = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(c => c.recentConversationsUsers);
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

    if (recentConversationUsers.length === 0) {
        return (
            <div className="flex justify-center">
                <p className="text-small text-white-50">No recent conversations</p>
            </div>
        );
    }

    return (
        <>
            <ul className="flex flex-col gap-1.5 mt-1.5">
                {recentConversationUsers.map(c => (
                    <li key={c.id}>
                        <RecentConversationUserCard conversationUser={c} />
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
