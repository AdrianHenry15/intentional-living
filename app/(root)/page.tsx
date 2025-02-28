"use client"

import { useUser } from "@clerk/nextjs"
import Hero from "../../components/hero"
import DailyHomePageTracker from "@/components/tracker/daily-homepage-tracker"

export default function Home() {
  const { isSignedIn } = useUser()
  return <main>{!isSignedIn ? <Hero /> : <DailyHomePageTracker />}</main>
}
