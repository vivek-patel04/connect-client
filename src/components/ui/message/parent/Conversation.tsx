"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGetMessagesQuery } from "@/hooks/api/message/useGetMessageQuery";
import { useAppSelector } from "@/hooks/redux/hooks";
import ThumbnailWithName from "../../common/ThumbnailWithName";
import ErrorMessage from "../../error/ErrorMessage";
import ConversationMessage from "../child/ConversationMessage";

export default function Conversation() {
    const activeChatUser = useAppSelector(state => state.activeChat);
    const { userID, name, thumbnailURL } = activeChatUser;

    const { data, fetchNextPage, hasNextPage, isLoading, error, isFetchingNextPage } = useGetMessagesQuery(userID || "");

    const bottomRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isFirstLoad = useRef(true);
    const prevFirstPageCount = useRef(0);

    const messages = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.messages).reverse();
    }, [data]);

    useEffect(() => {
        if (!data || messages.length === 0) return;

        const firstPageCount = data.pages[0]?.messages.length ?? 0;
        const isNewMessage = firstPageCount > prevFirstPageCount.current;

        if (isFirstLoad.current) {
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
            isFirstLoad.current = false;
        } else if (isNewMessage) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        prevFirstPageCount.current = firstPageCount;
    }, [data, messages.length]);

    if (!userID || !name || !thumbnailURL)
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-heading text-white-40">
                    Click on a user to <span className="text-xl font-semibold">start</span> conversation
                </p>
            </div>
        );

    if (error) return <ErrorMessage />;

    if (isLoading || !data) return null;

    return (
        <div className="h-full flex flex-col">
            <div>
                <ThumbnailWithName userID={userID} name={name} url={thumbnailURL} />
            </div>

            <div className="flex-1 mt-3 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-white-40 text-heading">
                            Say <span className="text-xl font-semibold">hello</span>
                        </p>
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col justify-end overflow-hidden">
                        <div ref={containerRef} className="flex flex-col gap-2 max-h-full overflow-y-auto px-2 thin-scrollbar">
                            {hasNextPage && (
                                <div className="flex justify-center">
                                    <button className="btn-outline" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
                                        {isFetchingNextPage ? "Loading..." : "Load Previous"}
                                    </button>
                                </div>
                            )}
                            <ul className="flex flex-col gap-2.5">
                                {messages.map(message => (
                                    <li key={message.id}>
                                        <ConversationMessage message={message} />
                                    </li>
                                ))}
                            </ul>

                            <div ref={bottomRef} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
