"use client";

import { useRouter } from "next/navigation";

export default function RedirectToLoginButton() {
    const router = useRouter();
    return (
        <button
            className="btn-auth-outline"
            onClick={() => {
                router.push("/login");
            }}
        >
            Login
        </button>
    );
}
