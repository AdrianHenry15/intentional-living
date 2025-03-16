import DailyRatings from "@/components/daily-ratings"
import { checkDailyRating } from "@/lib/utils/check-daily-rating"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DailyRatingsPage() {
  // Get authenticated user
  const userId = (await auth()).userId
  if (!userId) {
    return redirect("/sign-in") // Redirect to sign-in if not authenticated
  }

  // Check if the user has already submitted their daily ratings
  const hasSubmitted = await checkDailyRating()
  if (hasSubmitted) {
    redirect("/") // Redirect to home or another page if already submitted
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6 md:px-0">
      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-black to-yellow-900 animate-pulse opacity-40"></div>

      {/* 🔥 Floating Glows for Extra Depth */}
      <div className="absolute w-96 h-96 bg-yellow-500 rounded-full blur-[140px] opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-yellow-400 rounded-full blur-[100px] opacity-25 bottom-10 right-10"></div>

      {/* Actual Quiz Component */}
      <div className="relative z-10 w-full max-w-[500px]">
        <DailyRatings />
      </div>
    </div>
  )
}
