"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import WeekCalendar from "@/components/week-calendar"
import BottomNavbar from "@/components/navbar/bottom-navbar"
import SettingsWidget from "@/components/widgets/settings-widget"
import FooterSpace from "@/components/footer-spacer"
import QuickNoteWidget from "@/components/widgets/quick-note-widget"
import DailyRatingsModal from "@/components/modals/daily-ratings-modal"
import { useDailyRatingsStore } from "@/store/use-daily-ratings"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isSignedIn } = useUser()
  const { resetDailyRatingsCompletion, hasCompletedDailyRatings } =
    useDailyRatingsStore()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // if (!isSignedIn || !user) {
    //   setLoading(false)
    //   return
    // }

    // Function to reset daily ratings completion at the start of each day
    const resetAtMidnight = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0) // Set to midnight of the current day

      const timeUntilMidnight = midnight.getTime() - now.getTime()

      setTimeout(() => {
        resetDailyRatingsCompletion() // Reset the daily ratings completion
        setInterval(
          () => {
            resetDailyRatingsCompletion() // Reset every day at midnight
          },
          24 * 60 * 60 * 1000
        ) // 24 hours interval
      }, timeUntilMidnight) // Wait until midnight to reset
    }

    resetAtMidnight()

    return () => {
      // Cleanup any intervals or timeouts if the component unmounts
      resetDailyRatingsCompletion()
    }
  }, [isSignedIn, user, resetDailyRatingsCompletion])

  // Define base routes where the calendar should be hidden
  const hiddenRoutes = [
    "/auth/notes",
    "/auth/referral",
    "/user-profile/(.*)",
    "/auth/settings",
    "/auth/daily-ratings",
  ]
  const shouldShowCalendar =
    isSignedIn && !hiddenRoutes.some((route) => pathname.startsWith(route))

  // if (loading) return <p>Loading...</p> // Prevent rendering until check completes

  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      {pathname !== "/auth/daily-ratings" && hasCompletedDailyRatings && (
        <DailyRatingsModal />
      )}
      {shouldShowCalendar && <WeekCalendar />}
      {children}
      <SettingsWidget />
      <QuickNoteWidget />
      <FooterSpace />
      <BottomNavbar />
    </main>
  )
}
