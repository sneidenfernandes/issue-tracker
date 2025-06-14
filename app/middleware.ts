
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token")?.value 
             || request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Session not found!"},
      { status: 401}
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // This will match all API routes
};
