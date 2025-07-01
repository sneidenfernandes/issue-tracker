import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  console.log("Middleware reached.");

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Session not found!" },
      { status: 401 },

    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};