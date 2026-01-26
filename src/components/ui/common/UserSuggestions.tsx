"use client";

import { useGetUserSuggestionQuery } from "@/hooks/api/user/useGetUserSuggestionQuery";
import ErrorMessage from "../error/ErrorMessage";
import UserSuggestionCard from "./UserSuggestionCard";

export default function UserSuggestions({ limit = 15 }: { limit?: number }) {
    const { data, isLoading, error } = useGetUserSuggestionQuery();

    if (isLoading)
        return (
            <div className="flex flex-col gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="loading-line-small"></div>
                ))}
            </div>
        );

    if (error) {
        console.log(error);
        return <ErrorMessage message={"Something went wrong. Please try again later."} />;
    }

    if (!data) return null;

    const users = data.slice(0, limit);

    if (users.length === 0)
        return (
            <div className="flex justify-center">
                <p className="text-small text-white-50">No suggestions</p>
            </div>
        );

    return (
        <ul className="overflow-hidden flex flex-col gap-1.5">
            {users.map(user => (
                <li key={user.id}>
                    <UserSuggestionCard user={user} />
                </li>
            ))}
        </ul>
    );
}
