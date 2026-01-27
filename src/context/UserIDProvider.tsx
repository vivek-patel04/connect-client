"use client";

import { createContext, useContext } from "react";

interface ContextType {
    userID: string;
}

interface PropsType {
    children: React.ReactNode;
    userID: string;
}

const UserIDContext = createContext<ContextType | null>(null);

function UserIDProvider({ children, userID }: PropsType) {
    return <UserIDContext.Provider value={{ userID }}>{children}</UserIDContext.Provider>;
}

const useUserIDContext = () => {
    const ctx = useContext(UserIDContext);

    if (!ctx) throw new Error("useUserIDContext must be used inside <UserIDProvider>");

    return ctx;
};

export default UserIDProvider;
export { useUserIDContext };
