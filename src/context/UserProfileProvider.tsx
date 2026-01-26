"use client";

import { createContext, useContext } from "react";
import { UserProfileType } from "@/types/user/types";

interface ContextType {
    userProfile: UserProfileType;
}

interface PropsType {
    children: React.ReactNode;
    userProfile: UserProfileType;
}

const UserProfileContext = createContext<ContextType | null>(null);

function UserProfileProvider({ children, userProfile }: PropsType) {
    return <UserProfileContext.Provider value={{ userProfile }}>{children}</UserProfileContext.Provider>;
}

const useUserProfileContext = () => {
    const ctx = useContext(UserProfileContext);

    if (!ctx) throw new Error("useUserProfileContext must be used inside <UserProfileProvider>");

    return ctx;
};

export default UserProfileProvider;
export { useUserProfileContext };
