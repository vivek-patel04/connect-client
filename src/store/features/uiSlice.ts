import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserSidebarOpen: false,
    isNotificationDesktopOpen: false,
    isNotificationMobileOpen: false,
    isBurgerMenuOpen: false,
};
const uiSlice = createSlice({
    name: "uiSlice",
    initialState,
    reducers: {
        openUserSidebar: state => {
            state.isUserSidebarOpen = true;
        },
        closeUserSidebar: state => {
            state.isUserSidebarOpen = false;
        },

        toggleNotificationDesktop: state => {
            state.isNotificationDesktopOpen = !state.isNotificationDesktopOpen;
        },
        closeNotificationDesktop: state => {
            state.isNotificationDesktopOpen = false;
        },

        openNotificationMobile: state => {
            state.isNotificationMobileOpen = true;
        },
        closeNotificationMobile: state => {
            state.isNotificationMobileOpen = false;
        },

        toggleBurgerMenu: state => {
            state.isBurgerMenuOpen = !state.isBurgerMenuOpen;
        },
        closeBurgerMenu: state => {
            state.isBurgerMenuOpen = false;
        },
    },
});

export const {
    openUserSidebar,
    closeUserSidebar,
    closeNotificationDesktop,
    toggleNotificationDesktop,
    openNotificationMobile,
    closeNotificationMobile,
    closeBurgerMenu,
    toggleBurgerMenu,
} = uiSlice.actions;
export default uiSlice.reducer;
