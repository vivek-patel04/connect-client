"use client";

import { useState } from "react";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";
import UserSuggestions from "../../common/UserSuggestions";

export default function UserSuggestionsMobile() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <div className="px-3 py-2  bg-black text-white rounded-xl flex justify-between items-center">
                <h1 className="font-semibold">Suggestions</h1>

                <button className={`hover:cursor-pointer ${isExpanded ? "hidden" : "block"}`} onClick={() => setIsExpanded(true)}>
                    <LuMaximize2 size={16} />
                </button>

                <button className={`hover:cursor-pointer ${isExpanded ? "block" : "hidden"}`} onClick={() => setIsExpanded(false)}>
                    <LuMinimize2 size={16} />
                </button>
            </div>

            <div className={`mt-1.5 ${isExpanded ? "block" : "hidden"}`}>
                <UserSuggestions />
            </div>
        </>
    );
}
