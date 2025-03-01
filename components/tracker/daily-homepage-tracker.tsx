import { useUser } from "@clerk/nextjs"
import React from "react"
import { motion } from "framer-motion"
import DataWidget from "../ui/data-widget"
import { FaCandyCane, FaCookie } from "react-icons/fa6"
import { MdFitnessCenter } from "react-icons/md"

const DailyHomePageTracker = () => {
  const { user } = useUser()

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
        <DataWidget
          icon={<FaCookie size={22} />}
          title="Diet"
          percentage="100"
          data="Complete"
        />
        <DataWidget
          icon={<MdFitnessCenter size={22} />}
          title="Exercise"
          percentage="100"
          data="Complete"
        />
        <DataWidget
          icon={<FaCandyCane size={22} />}
          title="Sugar Intake"
          percentage="100"
          data="Complete"
        />
      </motion.div>
    </div>
  )
}

export default DailyHomePageTracker
