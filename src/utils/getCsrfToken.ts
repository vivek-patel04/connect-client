import { parse } from "cookie";

export const getCsrfTokenFromCookie = (): string | null => {
    if (typeof document === "undefined") return null;

    const browserCookie = document.cookie;
    const csrfToken = parse(browserCookie).csrfToken ?? null;

    return csrfToken;
};
