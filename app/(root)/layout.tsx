import WeekCalendar from "@/components/week-calendar"
import BottomNavbar from "../../components/navbar/bottom-navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      <WeekCalendar />
      {children}
      <BottomNavbar />
    </main>
  )
}
