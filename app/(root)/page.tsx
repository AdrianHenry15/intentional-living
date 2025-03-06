"use client"

import { useUser } from "@clerk/nextjs"
import Hero from "../../components/hero"
import HomePage from "@/components/home-page"

export default function Home() {
  const { isSignedIn } = useUser()
  return (
    <main className="bg-inherit">{!isSignedIn ? <Hero /> : <HomePage />}</main>
  )
}
