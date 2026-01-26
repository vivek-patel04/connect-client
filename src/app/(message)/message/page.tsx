"use client";

import Users from "@/components/ui/message/parent/Users";
import Conversation from "@/components/ui/message/parent/Conversation";
import { LuX } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { closeUserSidebar, openUserSidebar } from "@/store/features/uiSlice";
import MessageInputBox from "@/components/ui/message/parent/MessageInputBox";

export default function Message() {
    const { isUserSidebarOpen } = useAppSelector(state => state.ui);
    const dispatch = useAppDispatch();

    return (
        <div className="flex items-start gap-10 h-full relative">
            <section className="backdrop-message-window flex-1 flex flex-col gap-3 overflow-hidden relative">
                <button className="btn absolute top-4 right-2 md:hidden" onClick={() => dispatch(openUserSidebar())}>
                    Show Users
                </button>

                <div className="flex-1 overflow-hidden">
                    <Conversation />
                </div>

                <div>
                    <MessageInputBox />
                </div>
            </section>

            <section className="w-[316px] h-full overflow-hidden hidden md:block">
                <Users />
            </section>

            <section className={`absolute top-0 right-0 backdrop-message-users overflow-hidden md:hidden ${isUserSidebarOpen ? "block" : "hidden"}`}>
                <button className="btn-icon text-black" onClick={() => dispatch(closeUserSidebar())}>
                    <LuX size={18} />
                </button>

                <div className="mt-1">
                    <Users />
                </div>
            </section>
        </div>
    );
}
