"use client";

import { clientBaseUrl } from "@/utils/baseURL";
import { HiMiniPower } from "react-icons/hi2";

export default function LogoutDesktop() {
    const handleLogout = async () => {
        await fetch(`/bff/api/auth/logout`, { method: "POST", credentials: "include" }).catch(error => ({}));
        window.location.replace(clientBaseUrl as string);
    };
    return (
        <button className="nav-item-desktop block" onClick={handleLogout}>
            <HiMiniPower size={19} />
        </button>
    );
}
