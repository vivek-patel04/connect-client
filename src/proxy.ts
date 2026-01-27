import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const cookies = request.headers.get("cookie");
    const url = new URL(request.url);

    if (cookies?.includes("refreshToken=")) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ["/feed", "/profile/:path*", "/post/:path*", "/connections", "/connections/:path*", "/message"],
};
