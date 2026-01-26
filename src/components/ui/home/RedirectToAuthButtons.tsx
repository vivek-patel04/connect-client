"use client";

import { useRouter } from "next/navigation";

export default function RedirectToAuthButtons() {
    const router = useRouter();
    return (
        <div className="w-full">
            <button
                className="btn-auth"
                onClick={() => {
                    router.push("/register");
                }}
            >
                Join now
            </button>
            <button
                className="mt-2.5 btn-auth-outline"
                onClick={() => {
                    router.push("/login");
                }}
            >
                Log in
            </button>
        </div>
    );
}
