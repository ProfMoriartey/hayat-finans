import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()
  const url = req.nextUrl

  const isAdminRoute = url.pathname.startsWith("/admin")
  const isDashboardRoute = url.pathname.startsWith("/dashboard")

  if (isAdminRoute || isDashboardRoute) {
    if (!userId) {
      return redirectToSignIn()
    }
  }

  if (isAdminRoute) {
    if (sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
}