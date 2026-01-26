"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useState } from "react";
import WebsocketProvider from "@/context/WebsocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={client}>
            <Provider store={store}>
                <WebsocketProvider>{children}</WebsocketProvider>
            </Provider>
        </QueryClientProvider>
    );
}
