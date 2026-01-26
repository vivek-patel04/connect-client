"use client";

import { useState } from "react";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";
import RecentConversationAllUsers from "../child/RecentConversationAllUsers";
import ConnectionAllUsers from "../child/ConnectionAllUsers";

export default function Users() {
    const [isConnectionTabOpen, setIsConnectionTabOpen] = useState(false);

    return (
        <div className="max-h-full overflow-y-auto thin-scrollbar">
            <section>
                <h2 className="backdrop-heading">Recent Conversation</h2>

                <div className="mt-1.5">
                    <RecentConversationAllUsers />
                </div>
            </section>

            <section className="mt-2">
                <div className="backdrop-heading flex justify-between items-center">
                    <h2>All Connections</h2>

                    <button className={`${isConnectionTabOpen ? "hidden" : ""} hover:cursor-pointer`} onClick={() => setIsConnectionTabOpen(true)}>
                        <LuMaximize2 size={16} />
                    </button>

                    <button className={`${isConnectionTabOpen ? "" : "hidden"} hover:cursor-pointer`} onClick={() => setIsConnectionTabOpen(false)}>
                        <LuMinimize2 size={16} />
                    </button>
                </div>

                {isConnectionTabOpen && (
                    <div className="mt-1.5">
                        <ConnectionAllUsers />
                    </div>
                )}
            </section>
        </div>
    );
}
