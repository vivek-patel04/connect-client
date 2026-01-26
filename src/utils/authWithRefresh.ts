import { clientBaseUrl } from "./baseURL";

const baseURL = clientBaseUrl;

let refreshing: Promise<void> | null = null;

async function refresh(): Promise<void> {
    const res = await fetch(`/api/auth/refresh`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        await fetch(`${baseURL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        window.location.replace(baseURL as string);
        throw new Error("Refresh failed");
    }
}

export const authWithRefresh = async () => {
    if (!refreshing) {
        refreshing = refresh().finally(() => {
            refreshing = null;
        });
    }

    const wait = await refreshing;

    return wait;
};
