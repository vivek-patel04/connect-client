"use client";

import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import { MessageType } from "@/types/message/types";

export default function ConversationMessage({ message }: { message: MessageType }) {
    const { data: me } = useGetMeQuery();
    if (!me) return null;

    const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(message.createdAt));
    return (
        <>
            {me.id === message.senderUserID ? (
                <div className="flex flex-col items-end">
                    <div className="max-w-[90%] bg-[hsl(216,25%,92%)] px-5 py-2 rounded-3xl">
                        <p className=" text-white-30 font-medium text-justify">{message.content}</p>
                    </div>

                    <p className="text-[0.7rem] text-[hsl(216,10%,75%)] mr-2 mt-0.5">{formattedDateTime}</p>
                </div>
            ) : (
                <div className="flex flex-col items-start">
                    <div className="max-w-[90%] bg-black px-5 py-2 rounded-3xl">
                        <p className="text-white text-justify">{message.content}</p>
                    </div>

                    <p className="text-[0.7rem] text-[hsl(216,10%,70%)] ml-2 mt-0.5">{formattedDateTime}</p>
                </div>
            )}
        </>
    );
}
