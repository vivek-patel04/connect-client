"use client";

import { useRouter } from "next/navigation";

export default function RedirectToSentRequest() {
    const router = useRouter();
    return (
        <div>
            <button
                className="btn-outline"
                onClick={() => {
                    router.push("/connections/requests/sent");
                }}
            >
                Sent Requests
            </button>
        </div>
    );
}
