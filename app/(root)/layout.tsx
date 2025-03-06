"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import WeekCalendar from "@/components/week-calendar"
import BottomNavbar from "@/components/navbar/bottom-navbar"
import SettingsWidget from "@/components/widgets/settings-widget"
import FooterSpace from "@/components/footer-spacer"
import QuickNoteWidget from "@/components/widgets/quick-note-widget"
import Image from "next/image"
import Logo from "@/public/assets/il-logo.png"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isSignedIn } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn || !user) {
      setLoading(false)
      return
    }
  }, [isSignedIn, user, router])

  // Define base routes where the calendar should be hidden
  const hiddenRoutes = ["/auth/notes", "/auth/referral", "/auth/profile"]
  const shouldShowCalendar =
    isSignedIn && !hiddenRoutes.some((route) => pathname.startsWith(route))

  if (loading) return <p>Loading...</p> // Prevent rendering until check completes

  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      {shouldShowCalendar && <WeekCalendar />}
      {children}
      <SettingsWidget />
      <QuickNoteWidget />
      <FooterSpace />
      <BottomNavbar />
    </main>
  )
}
