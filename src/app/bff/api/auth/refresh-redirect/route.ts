import { NextResponse } from "next/server";

const baseURL = process.env.SERVER_BASE_URL as string;
const clientBaseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const redirectPage = url.searchParams.get("path");

        const browserCookie = request.headers.get("cookie");

        if (!browserCookie) {
            return NextResponse.json({ success: false, message: "Invalid Request" }, { status: 401 });
        }

        const responseFromBackend = await fetch(`${baseURL}/api/auth/refresh`, {
            method: "GET",
            cache: "no-store",
            headers: { cookie: browserCookie },
        });

        if (!responseFromBackend.ok) {
            if (responseFromBackend.status === 401) {
                const redirectResponseToBrowser = NextResponse.redirect(new URL("/", request.url));
                redirectResponseToBrowser.cookies.delete("accessToken");
                redirectResponseToBrowser.cookies.delete("refreshToken");
                redirectResponseToBrowser.cookies.delete("csrfToken");

                return redirectResponseToBrowser;
            }
            return NextResponse.json(
                { success: false, message: (await responseFromBackend.json()) || "Unknown error, try after some time" },
                { status: responseFromBackend.status }
            );
        }

        const redirectResponseToBrowser = NextResponse.redirect(`${redirectPage ? clientBaseURL + redirectPage : clientBaseURL}`);

        for (let [name, value] of responseFromBackend.headers) {
            if (name.toLowerCase() === "set-cookie") {
                redirectResponseToBrowser.headers.append("set-cookie", value);
            }
        }

        return redirectResponseToBrowser;
    } catch (error) {
        return NextResponse.json({ success: false, message: "Proxy server error" }, { status: 500 });
    }
}
