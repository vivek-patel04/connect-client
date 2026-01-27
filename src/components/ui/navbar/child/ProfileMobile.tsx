"use client";

import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { closeBurgerMenu } from "@/store/features/uiSlice";
import { useRouter } from "next/navigation";

export default function ProfileMobile() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data } = useGetMeQuery();

    if (!data) {
        return <button className="nav-item-mobile">Profile</button>;
    }

    return (
        <button
            className="nav-item-mobile"
            onClick={() => {
                router.push(`/profile/${data.id}`);
                dispatch(closeBurgerMenu());
            }}
        >
            Profile
        </button>
    );
}
