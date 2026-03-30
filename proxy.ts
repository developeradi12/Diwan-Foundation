import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  // protected role routes
  const roleRoutes: Record<string, string[]> = {
    "/admin": ["admin"],
    "/donor": ["donor"],
    "/member": ["member"],
  };

  const matchedRoute = Object.keys(roleRoutes).find((route) =>
    pathname.startsWith(route),
  );
  // public route
  if (!matchedRoute) return NextResponse.next();

  // not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

 
  try {
    // ⭐ verify JWT
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

    const { payload } = await jwtVerify(token, secret);
    // console.log("Payload", payload);
    let role = ((payload.role as string) || "").toLowerCase().trim();

    const allowedRoles = roleRoutes[matchedRoute];

    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    // invalid token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
