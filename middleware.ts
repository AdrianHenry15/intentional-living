import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { useQuizStore } from "./store/use-quiz-store"

const isProtectedRoute = createRouteMatcher(["/auth(.*)"])
const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/api(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()

  // Get authentication state
  const userId = await (await auth()).userId

  // Allow public routes
  if (isPublicRoute(req)) return NextResponse.next()

  // If user is signed in, check quiz completion
  if (userId) {
    const { hasCompletedQuiz } = useQuizStore.getState()

    // Redirect to quiz if not completed
    if (!hasCompletedQuiz) {
      return NextResponse.redirect(new URL("/quiz", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
