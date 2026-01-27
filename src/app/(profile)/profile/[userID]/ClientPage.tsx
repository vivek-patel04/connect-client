"use client";

import { useUserAuthQuery } from "@/hooks/api/auth/useUserAuthQuery";
import OtherUserProfile from "./OtherUserProfile";
import OwnProfile from "./OwnProfile";

export default function ClientPage({ userID }: { userID: string }) {
    const { data: viewer } = useUserAuthQuery();

    if (!viewer) return null;

    if (viewer.id === userID) return <OwnProfile />;

    return <OtherUserProfile userID={userID} />;
}
