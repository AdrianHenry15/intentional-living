"use client"

import React from "react"
import { motion } from "framer-motion"
import DataWidget from "../ui/data-widget"
import { FaCandyCane, FaCookie } from "react-icons/fa6"
import { MdFitnessCenter } from "react-icons/md"

const Tracker = () => {
  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-white to-yellow-500 min-h-screen w-full text-black">
      {/* Welcome Message */}
      <motion.h5
        className="text-6xl p-6 text-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {`Your Tracker`}
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
          date="Feb 15"
          data="Complete"
        />
        <DataWidget
          icon={<MdFitnessCenter size={22} />}
          title="Exercise"
          date="Feb 15"
          data="Complete"
        />
        <DataWidget
          icon={<FaCandyCane size={22} />}
          title="Sugar Intake"
          date="Feb 15"
          data="Complete"
        />
      </motion.div>
    </div>
  )
}

export default Tracker
