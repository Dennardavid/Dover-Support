import { auth } from "./auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/users", "/admin"];
const authPageRoutes = ["/", "/signup"];
const apiAuthPrefix = "/api/auth";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const path = nextUrl.pathname;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthPageRoute = authPageRoutes.includes(path);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isLoggedIn && isAuthPageRoute) {
    const role = req.auth?.user?.role;

    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/users", req.nextUrl));
    }
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
