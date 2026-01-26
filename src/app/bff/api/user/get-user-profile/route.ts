import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

const baseURL = process.env.SERVER_BASE_URL;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userID = searchParams.get("userID");

        if (!userID) {
            return NextResponse.json({ success: false, message: "Invalid request, ID is missing" }, { status: 400 });
        }

        const responseFromBackend = await fetch(`${baseURL}/api/user/profile/${userID}`, {
            method: "GET",
            cache: "no-store",
            headers: { Accept: "application/json" },
        });
        const responseBody = await responseFromBackend.json().catch(error => ({}));

        return NextResponse.json(responseBody, { status: responseFromBackend.status });
    } catch (error) {
        logger.error("Error on get user profile", { error });
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
