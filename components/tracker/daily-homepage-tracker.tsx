import { useUser } from "@clerk/nextjs"
import React from "react"
import { motion } from "framer-motion"
import DataWidget from "../daily-trackings/data-widget"
import { useDailyTrackingStore } from "@/store/use-daily-tracking-store"
import { FaBrain, FaCandyCane, FaCookie } from "react-icons/fa"
import { MdFitnessCenter } from "react-icons/md"

const DailyHomePageTracker = () => {
  const { user } = useUser()

  // Pull data from Zustand
  const { primaryGoals } = useDailyTrackingStore()

  const getIcon = (title: string): React.ReactNode => {
    switch (title.toLowerCase()) {
      case "diet":
        return <FaCookie />
      case "exercise":
        return <MdFitnessCenter />
      case "sugar intake":
        return <FaCandyCane />
      default:
        return <FaBrain /> // Default icon
    }
  }

  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-yellow-400 to-white min-h-screen w-full text-black">
      {/* Welcome Message */}
      <motion.h5
        className="text-6xl p-6 text-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {`Welcome, ${user?.firstName}`}
      </motion.h5>

      {/* Data Widgets - Centered Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        {primaryGoals.map((goal) => (
          <DataWidget
            icon={getIcon(goal.title)}
            id={goal.id}
            key={goal.id}
            title={goal.title}
            completed_days={goal.completed_days}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default DailyHomePageTracker
