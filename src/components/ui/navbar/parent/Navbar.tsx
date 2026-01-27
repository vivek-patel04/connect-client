"use client";

import Logo from "../child/Logo";
import { LuMenu, LuX } from "react-icons/lu";
import SearchDesktop from "../child/SearchDesktop";
import MessageDesktop from "../child/MessageDesktop";
import NotificationDesktop from "../child/NotificationDesktop";
import ConnectionsDesktop from "../child/ConnectionsDesktop";
import ProfileDesktop from "../child/ProfileDesktop";
import LogoutDesktop from "../child/LogoutDesktop";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { closeNotificationMobile, toggleBurgerMenu } from "@/store/features/uiSlice";
import SearchMobile from "../child/SearchMobile";
import MessageMobile from "../child/MessageMobile";
import NotificationMobile from "../child/NotificationMobile";
import ConnectionsMobile from "../child/ConnectionsMobile";
import ProfileMobile from "../child/ProfileMobile";
import LogoutMobile from "../child/LogoutMobile";
import NotificationWindow from "../../notification-window/parent/NotificationWindow";
import { useState } from "react";
import SearchWindow from "../../search-window/parent/SearchWindow";
import { useUserAuthQuery } from "@/hooks/api/auth/useUserAuthQuery";

export default function Navbar() {
    const { isNotificationMobileOpen, isBurgerMenuOpen } = useAppSelector(state => state.ui);
    const dispatch = useAppDispatch();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data: authentication } = useUserAuthQuery();

    return (
        <div className="relative">
            <nav className="navbar flex justify-between items-center">
                <span>
                    <Logo />
                </span>

                <ul className="hidden md:flex gap-5 items-center">
                    <li>
                        <SearchDesktop />
                    </li>

                    <li>
                        <MessageDesktop />
                    </li>

                    <li>
                        <NotificationDesktop />
                    </li>

                    <li>
                        <ConnectionsDesktop />
                    </li>

                    <li>
                        <ProfileDesktop />
                    </li>

                    <li>
                        <LogoutDesktop />
                    </li>
                </ul>

                <div className="text-[25px] md:hidden">
                    <button
                        onClick={() => {
                            dispatch(toggleBurgerMenu());
                            dispatch(closeNotificationMobile());
                        }}
                        className="hover:cursor-pointer"
                    >
                        {isBurgerMenuOpen ? <LuX /> : <LuMenu />}
                    </button>
                </div>

                {isBurgerMenuOpen && (
                    <ul className={`backdrop-burger-menu md:hidden absolute right-0 top-[56px] z-10 flex flex-col gap-5`}>
                        <li>
                            <SearchMobile openSearch={() => setIsSearchOpen(true)} />
                        </li>

                        <li>
                            <MessageMobile />
                        </li>

                        <li>
                            <NotificationMobile />
                        </li>

                        <li>
                            <ConnectionsMobile />
                        </li>

                        <li>
                            <ProfileMobile />
                        </li>

                        <li>
                            <LogoutMobile />
                        </li>
                    </ul>
                )}
            </nav>

            {isNotificationMobileOpen && (
                <div className="md:hidden">
                    <NotificationWindow />
                </div>
            )}

            {isSearchOpen && (
                <div className="md:hidden">
                    <SearchWindow onClose={() => setIsSearchOpen(false)} />
                </div>
            )}
        </div>
    );
}
