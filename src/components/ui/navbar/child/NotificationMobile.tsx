"use client";

import { closeBurgerMenu, openNotificationMobile } from "@/store/features/uiSlice";
import { useAppDispatch } from "@/hooks/redux/hooks";
import UnreadNotificationCount from "../../common/UnreadNotificationCount";

export default function NotificationMobile() {
    const dispatch = useAppDispatch();
    return (
        <button
            className="nav-item-mobile"
            onClick={() => {
                dispatch(openNotificationMobile());
                dispatch(closeBurgerMenu());
            }}
        >
            Notification <UnreadNotificationCount />
        </button>
    );
}
