"use client";

import { useWebsocketContext } from "@/context/WebsocketProvider";
import { useAppSelector } from "@/hooks/redux/hooks";
import { useState } from "react";

export default function MessageInputBox() {
    const [input, setInput] = useState("");
    const { socket, loggedinUserID } = useWebsocketContext();
    const peer = useAppSelector(state => state.activeChat);

    const handleOnSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!input.trim()) return;

        if (!socket || !loggedinUserID || !peer.userID) return null;

        socket.send(
            JSON.stringify({
                type: "save-message",
                data: {
                    senderUserID: loggedinUserID,
                    receiverUserID: peer.userID,
                    content: input.trim(),
                },
            })
        );

        setInput("");
    };
    return (
        <div className="w-full h-[90px] bg-body border border-white-85 rounded-xl relative">
            <form className="flex items-end h-full">
                <div className="grow h-full rounded-xl p-2">
                    <textarea
                        className="outline-none w-full h-full resize-none placeholder:text-white-50"
                        placeholder="Write your message here..."
                        maxLength={700}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>

                <div className="m-2">
                    <button type="submit" onClick={handleOnSubmit} className="cursor-pointer btn">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
