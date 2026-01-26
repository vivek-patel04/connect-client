import { serverBaseUrl } from "@/utils/baseURL";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

const baseURL = serverBaseUrl;

export async function GET(request: Request) {
    try {
        const browserCookie = request.headers.get("cookie");

        if (!browserCookie || !browserCookie.includes("refreshToken=")) {
            return NextResponse.json({ success: false, message: "Invalid Request, cookie is missing" }, { status: 400 });
        }

        const responseFromBackend = await fetch(`${baseURL}/api/user/me`, {
            method: "GET",
            cache: "no-store",
            headers: { cookie: browserCookie },
        });

        const jsonDataFromBackend = await responseFromBackend.json().catch(error => ({}));

        return NextResponse.json(jsonDataFromBackend, { status: responseFromBackend.status });
    } catch (error) {
        logger.error("Error on get me", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
