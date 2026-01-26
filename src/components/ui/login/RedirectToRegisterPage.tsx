"use client";

import { useRouter } from "next/navigation";

export default function RedirectToRegisterPage() {
    const router = useRouter();
    return (
        <button
            className="btn-auth-outline"
            onClick={() => {
                router.push("/register");
            }}
        >
            Join now
        </button>
    );
}
