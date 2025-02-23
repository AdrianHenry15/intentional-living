import "./globals.css"

import { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"

import { ClerkLoading, ClerkProvider } from "@clerk/nextjs"
import { VisualEditing } from "next-sanity"
import { draftMode } from "next/headers"
import { SanityLive } from "@/sanity/lib/live"
import DisableDraftMode from "@/components/disable-draft-mode"
import { Loader } from "@/components/loader"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Intentional Living",
  description:
    "Track your habits, goals, and progress to become 0.01% better every day. Join a community committed to growth and mindfulness.",
  openGraph: {
    title: "Intentional Living - Life Tracker",
    description:
      "Getting 0.01% Better Every Day, Together. Track habits, set goals, and stay accountable with Intentional Living.",
    url: "", // Update with actual domain
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intentional Living - Life Tracker",
    description:
      "Achieve your goals and improve daily with Intentional Living. A life tracker built to help you stay on track and grow consistently.",
  },
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={nunito.variable}>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <Toaster />
          <div className="flex flex-col">
            <Suspense fallback={<Loader />}>
              <ClerkLoading>
                <Loader />
              </ClerkLoading>
              {children}
            </Suspense>
          </div>
          {/* Higher order component for live settings when product is published */}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  )
}
