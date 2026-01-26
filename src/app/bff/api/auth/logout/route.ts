import { NextResponse } from "next/server";

const baseURL = process.env.SERVER_BASE_URL;

export async function POST(request: Request) {
    const rawCookieFromBrowser = request.headers.get("cookie");
    void fetch(`${baseURL}/api/auth/logout`, { method: "POST", headers: rawCookieFromBrowser ? { cookie: rawCookieFromBrowser } : undefined });

    const responseToBrowser = NextResponse.json({ success: true }, { status: 200 });

    responseToBrowser.cookies.delete("accessToken");
    responseToBrowser.cookies.delete("refreshToken");
    responseToBrowser.cookies.delete("csrfToken");

    return responseToBrowser;
}
