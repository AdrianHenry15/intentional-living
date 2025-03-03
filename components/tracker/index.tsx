"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaCandyCane, FaCookie } from "react-icons/fa6"
import { MdFitnessCenter } from "react-icons/md"
import { FaBrain } from "react-icons/fa"
import DataWidget from "../daily-trackings/data-widget"

const Tracker = () => {
  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-yellow-400 to-black min-h-screen w-full text-black">
      {/* Welcome Message */}
      {/* <motion.h5
        className="text-6xl p-6 text-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {`Your Tracker`}
      </motion.h5> */}

      {/* Data Widgets - Centered Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        <DataWidget
          id={0}
          icon={<FaCookie size={22} />}
          title="Diet"
          completed_days={0}
        />
        <DataWidget
          id={1}
          icon={<MdFitnessCenter size={22} />}
          title="Exercise"
          completed_days={0}
        />
        <DataWidget
          id={2}
          icon={<FaCandyCane size={22} />}
          title="Sugar Intake"
          completed_days={0}
        />
        <DataWidget
          id={3}
          icon={<FaBrain size={22} />}
          title="Mental Strength"
          completed_days={0}
        />
      </motion.div>
    </div>
  )
}

export default Tracker
