"use client";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import { addComment } from "@/utils/websocketHandlers/addComment";
import { addLike } from "@/utils/websocketHandlers/addLike";
import { addMessage } from "@/utils/websocketHandlers/addMessage";
import { addNotification } from "@/utils/websocketHandlers/addNotification";
import { deleteComment } from "@/utils/websocketHandlers/deleteComment";
import { deleteLike } from "@/utils/websocketHandlers/deleteLike";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
    socket: WebSocket | null;
    loggedinUserID: string | undefined;
}

const WebsocketContext = createContext<ContextType | null>(null);

export default function WebsocketProvider({ children }: { children: React.ReactNode }) {
    const { data: user } = useGetMeQuery();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!user?.id) return;
        const socket = new WebSocket("ws://localhost:8080/ws/");

        socket.onopen = () => {
            console.log("live");
            setSocket(socket);
        };

        socket.onmessage = event => {
            let message;
            try {
                message = JSON.parse(event.data);
            } catch (error) {
                console.error("WebSocket message parsing error:", error);
            }

            if (message.type === "notification") {
                addNotification({ queryClient, messageData: message.data });
            }

            if (message.type === "like") {
                addLike({ queryClient, messageData: message.data, userID: user.id });
            }

            if (message.type === "delete-like") {
                deleteLike({ queryClient, messageData: message.data, userID: user.id });
            }

            if (message.type === "comment") {
                addComment({ queryClient, messageData: message.data, userID: user.id });
            }

            if (message.type === "delete-comment") {
                deleteComment({ queryClient, messageData: message.data, userID: user.id });
            }

            if (message.type === "message") {
                addMessage({ queryClient, data: message.data, userID: user.id });
            }
        };
    }, [user?.id]);

    return <WebsocketContext.Provider value={{ socket, loggedinUserID: user?.id }}>{children}</WebsocketContext.Provider>;
}

export const useWebsocketContext = () => {
    const ctx = useContext(WebsocketContext);

    if (!ctx) throw new Error("useWebsocketContext must be used inside <WebsocketProvider>");

    return ctx;
};
