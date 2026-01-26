"use client";

import { useAppDispatch } from "@/hooks/redux/hooks";
import { closeBurgerMenu } from "@/store/features/uiSlice";
import { useRouter } from "next/navigation";

export default function ConnectionsMobile() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return (
        <button
            className="nav-item-mobile"
            onClick={() => {
                router.push("/connections");
                dispatch(closeBurgerMenu());
            }}
        >
            Connections
        </button>
    );
}
