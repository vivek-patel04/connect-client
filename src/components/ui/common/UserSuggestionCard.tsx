"use client";

import { UserMiniType } from "@/types/user/types";
import { useState } from "react";
import { useSendRequestMutation } from "@/hooks/api/user/useSendRequestMutation";
import ThumbnailWithName from "./ThumbnailWithName";

export default function UserSuggestionCard({ user }: { user: UserMiniType }) {
    const [isRequestSent, setIsRequestSent] = useState(false);

    const { mutateAsync: sendRequest } = useSendRequestMutation();

    const handleConnect = () => {
        setIsRequestSent(true);

        setTimeout(async () => {
            try {
                await sendRequest(user.id);
            } catch (error) {
                setIsRequestSent(false);
            }
        }, 2000);
    };

    return (
        <div className="flex items-center justify-between backdrop-user-mini">
            <ThumbnailWithName userID={user.id} name={user.name} url={user.thumbnailURL} />
            {isRequestSent ? (
                <span className="btn-disable">Requested</span>
            ) : (
                <button className="btn" onClick={handleConnect}>
                    Connect
                </button>
            )}
        </div>
    );
}
