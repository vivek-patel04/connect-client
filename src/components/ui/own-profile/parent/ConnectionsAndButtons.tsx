"use client";

import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import { useGetConnectionCountQuery } from "@/hooks/api/user/useGetConnectionCountQuery";
import { useState } from "react";
import UpdateProfilePictureForm from "../child/UpdateProfilePictureForm";
import { useDeleteProfilePictureMutation } from "@/hooks/api/user/useDeleteProfilePictureMutation";
import { useRouter } from "next/navigation";
import ErrorMessage from "../../error/ErrorMessage";

export default function ConnectionsAndButtons() {
    const { data: user, isLoading: isUserLoading, error: userError } = useGetMeQuery();
    const { data: connectionCount, isLoading: isConnectionCountLoading, error: connectionCountError } = useGetConnectionCountQuery(user?.id || "");

    const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);
    const { mutateAsync, isPending } = useDeleteProfilePictureMutation();

    const router = useRouter();

    if (isUserLoading || isConnectionCountLoading) {
        return (
            <div>
                <div className="loading-line-small" />
                <div className="loading-line-mid mt-3" />
            </div>
        );
    }

    if (userError || connectionCountError) {
        return <ErrorMessage message={"Error on fetching user or connection count. Please try again later."} />;
    }

    if (!user || connectionCount === undefined) {
        return null;
    }

    const handleDeleteProfilePicture = async () => {
        if (isPending) return;
        try {
            await mutateAsync();
        } catch (error) {}
    };

    return (
        <div className="flex flex-col items-start gap-4">
            <div className="text-small font-medium hover:cursor-pointer hover:underline" onClick={() => router.push("/connections")}>
                <p>Connections: {connectionCount}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                <button className="btn" onClick={() => setIsUpdatingProfilePicture(true)}>
                    Update profile picture
                </button>

                <button className="btn" onClick={handleDeleteProfilePicture} disabled={isPending}>
                    Delete profile picture
                </button>
            </div>

            {isUpdatingProfilePicture && <UpdateProfilePictureForm onCancel={() => setIsUpdatingProfilePicture(false)} />}
        </div>
    );
}
