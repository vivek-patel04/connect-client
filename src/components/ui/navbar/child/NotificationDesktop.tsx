"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { closeNotificationDesktop, toggleNotificationDesktop } from "@/store/features/uiSlice";
import { useEffect, useRef } from "react";
import UnreadNotificationCount from "../../common/UnreadNotificationCount";
import NotificationWindow from "../../notification-window/parent/NotificationWindow";

export default function NotificationDesktop() {
    const { isNotificationDesktopOpen } = useAppSelector(state => state.ui);
    const dispatch = useAppDispatch();

    const notificationRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isNotificationDesktopOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                dispatch(closeNotificationDesktop());
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isNotificationDesktopOpen]);

    return (
        <div ref={notificationRef}>
            <button
                className="nav-item-desktop"
                onClick={() => {
                    dispatch(toggleNotificationDesktop());
                }}
            >
                Notification <UnreadNotificationCount />
            </button>

            {isNotificationDesktopOpen && (
                <div>
                    <NotificationWindow />
                </div>
            )}
        </div>
    );
}
