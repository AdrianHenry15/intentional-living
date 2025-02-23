import Navbar from "@/components/navbar"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <Navbar />
      {children}
    </main>
  )
}
