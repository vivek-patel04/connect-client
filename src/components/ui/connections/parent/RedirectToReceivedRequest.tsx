"use client";

import { useRouter } from "next/navigation";

export default function RedirectToReceivedRequest() {
    const router = useRouter();
    return (
        <div>
            <button
                className="btn-outline"
                onClick={() => {
                    router.push("/connections/requests/received");
                }}
            >
                Received Requests
            </button>
        </div>
    );
}
