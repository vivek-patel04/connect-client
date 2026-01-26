import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    name: string | null;
    userID: string | null;
    thumbnailURL: string | null;
}

const initialState: InitialStateType = {
    name: null,
    userID: null,
    thumbnailURL: null,
};

const activeChatSlice = createSlice({
    name: "activeChat",
    initialState,
    reducers: {
        setActiveChat: (state, action) => {
            const { name, userID, thumbnailURL } = action.payload;
            state.name = name;
            state.userID = userID;
            state.thumbnailURL = thumbnailURL;
        },

        resetActiveChat: state => {
            state.name = null;
            state.userID = null;
            state.thumbnailURL = null;
        },
    },
});

export const { setActiveChat, resetActiveChat } = activeChatSlice.actions;
export default activeChatSlice.reducer;
