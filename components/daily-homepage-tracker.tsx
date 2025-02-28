import { useUser } from "@clerk/nextjs"
import React from "react"
import { motion } from "framer-motion"

const DailyHomePageTracker = () => {
  const { user } = useUser()
  return (
    <div className="flex p-6 flex-col bg-gradient-to-b from-yellow-400 to-white h-screen w-full text-black">
      <motion.h5 className="text-6xl">{`Welcome, ${user?.firstName}`}</motion.h5>
    </div>
  )
}

export default DailyHomePageTracker
