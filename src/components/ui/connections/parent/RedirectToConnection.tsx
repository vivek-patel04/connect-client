"use client";

import { useRouter } from "next/navigation";

export default function RedirectToConnection() {
    const router = useRouter();
    return (
        <div>
            <button
                className="btn-outline"
                onClick={() => {
                    router.push("/connections");
                }}
            >
                All Connections
            </button>
        </div>
    );
}
