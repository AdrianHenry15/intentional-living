"use client"

import WeekCalendar from "@/components/week-calendar"
import BottomNavbar from "../../components/navbar/bottom-navbar"
import { useUser } from "@clerk/nextjs"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useUser()
  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      {isSignedIn && <WeekCalendar />}
      {children}
      <BottomNavbar />
    </main>
  )
}
