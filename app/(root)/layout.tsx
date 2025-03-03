"use client"

import WeekCalendar from "@/components/week-calendar"
import BottomNavbar from "@/components/navbar/bottom-navbar"
import { useUser } from "@clerk/nextjs"
import SettingsWidget from "@/components/settings-widget"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard") // Change this to your valid route
    }
  }, [isSignedIn, router])

  // Define base routes where the calendar should be hidden
  const hiddenRoutes = ["/auth/notes", "/auth/referral", "/auth/profile"]

  // Check if pathname starts with any of the hidden routes (handles dynamic routes)
  const shouldShowCalendar =
    isSignedIn && !hiddenRoutes.some((route) => pathname.startsWith(route))

  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      {shouldShowCalendar && <WeekCalendar />}
      {children}
      <SettingsWidget />
      <BottomNavbar />
    </main>
  )
}
