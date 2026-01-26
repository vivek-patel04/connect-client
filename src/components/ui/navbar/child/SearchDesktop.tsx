"use client";

import { useState } from "react";
import SearchWindow from "../../search-window/parent/SearchWindow";

export default function SearchDesktop() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <div className="nav-item-desktop">
                <p onClick={() => setIsSearchOpen(true)}>Search</p>
            </div>

            {isSearchOpen && <SearchWindow onClose={() => setIsSearchOpen(false)} />}
        </>
    );
}
