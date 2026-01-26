import { configureStore } from "@reduxjs/toolkit";
import activeChatReducer from "./features/activeChatSlice";
import uiSliceReducer from "./features/uiSlice";

export const store = configureStore({
    reducer: {
        activeChat: activeChatReducer,
        ui: uiSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
