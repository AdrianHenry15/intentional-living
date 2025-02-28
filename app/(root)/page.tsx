"use client"

import { useUser } from "@clerk/nextjs"
import Hero from "../../components/hero"
import DailyHomePageTracker from "@/components/tracker/daily-homepage-tracker"
import PushNotificationManager from "@/components/push-notifications-manager"
import InstallPrompt from "@/components/install-prompt"

export default function Home() {
  const { isSignedIn } = useUser()
  return (
    <main>
      <PushNotificationManager />
      <InstallPrompt />
      {!isSignedIn ? <Hero /> : <DailyHomePageTracker />}
    </main>
  )
}
