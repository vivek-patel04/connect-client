"use client";

import Users from "../child/Users";
import { useState } from "react";

export default function SearchWindow({ onClose }: { onClose: () => void }) {
    const [searchInput, setSearchInput] = useState("");
    return (
        <div className="fixed inset-0 z-10 bg-[hsla(216,15%,10%,0.5)] flex justify-center items-start">
            <div className="fixed top-[62px] md:top-[72px] xl:top-[84px] backdrop-white-1 py-5 w-full md:max-w-[520px] max-h-[60vh] text-black overflow-y-auto">
                <div className="w-full">
                    <input type="text" placeholder="Type Name..." className="input-text" value={searchInput} onChange={e => setSearchInput(e.target.value)} />

                    <div className="flex justify-end mt-5">
                        <button className="btn btn-primary" onClick={onClose}>
                            close
                        </button>
                    </div>

                    <div className="my-2">
                        <Users searchInput={searchInput.trim()} />
                    </div>
                </div>
            </div>
        </div>
    );
}
