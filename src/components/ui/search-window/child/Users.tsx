import { useGetSearchedUsersQuery } from "@/hooks/api/user/useGetSearchedUsersQuery";
import { useEffect, useState } from "react";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import ErrorMessage from "../../error/ErrorMessage";

export default function Users({ searchInput }: { searchInput: string }) {
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        if (searchInput.trim().length < 3) {
            setDebouncedSearch("");
            return;
        }
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const { data, isLoading, error } = useGetSearchedUsersQuery(debouncedSearch);

    if (searchInput.length < 3) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-heading text-white-50 text-center">
                    Type at least <span className="text-xl font-semibold">three</span> characters
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-small text-white-50">Loading..</p>
            </div>
        );
    }

    if (error) {
        return <ErrorMessage />;
    }

    if (!data) return null;

    if (data.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-heading text-white-50 text-center">
                    No user found with name starts with <span className="text-xl font-semibold">{debouncedSearch}</span>
                </p>
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-3">
            {data.map(user => (
                <li key={user.id}>
                    <ThumbnailWithName userID={user.id} name={user.name} url={user.thumbnailURL} />
                </li>
            ))}
        </ul>
    );
}
