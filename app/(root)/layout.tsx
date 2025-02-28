import Navbar from "@/components/navbar"
import BottomNavbar from "../../components/navbar/bottom-navbar"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg h-screen w-full flex flex-col">
      {/* <Navbar /> */}
      {children}
      <BottomNavbar />
    </main>
  )
}
