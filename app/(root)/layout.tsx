"use client"

import WeekCalendar from "@/components/week-calendar"
import BottomNavbar from "@/components/navbar/bottom-navbar"
import { useUser } from "@clerk/nextjs"
import SettingsWidget from "@/components/settings-widget"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useUser()
  const pathname = usePathname() // Get the current path

  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      {isSignedIn && pathname !== "/auth/notes" && <WeekCalendar />}
      {children}
      <SettingsWidget />
      <BottomNavbar />
    </main>
  )
}
