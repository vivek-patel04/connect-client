"use client";

import { clientBaseUrl } from "@/utils/baseURL";

export default function LogoutMobile() {
    const handleLogout = async () => {
        await fetch(`/api/auth/logout`, { method: "POST", credentials: "include" }).catch(error => ({}));
        window.location.replace(clientBaseUrl as string);
    };
    return (
        <button className="nav-item-mobile" onClick={handleLogout}>
            Log Out
        </button>
    );
}
