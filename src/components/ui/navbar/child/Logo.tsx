"use client";

import { useAppDispatch } from "@/hooks/redux/hooks";
import { closeBurgerMenu, closeNotificationMobile } from "@/store/features/uiSlice";
import { useRouter } from "next/navigation";
import { SiGitconnected } from "react-icons/si";

export default function Logo() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return (
        <button
            className="text-[30px] hover:cursor-pointer"
            onClick={() => {
                router.push("/feed");
                dispatch(closeBurgerMenu());
                dispatch(closeNotificationMobile());
            }}
        >
            <SiGitconnected />
        </button>
    );
}
