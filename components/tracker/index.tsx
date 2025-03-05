"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { TbCandy } from "react-icons/tb"
import { FaBrain, FaCookieBite, FaRunning } from "react-icons/fa"
import DataWidget from "../daily-trackings/data-widget"
import { SiBraintree } from "react-icons/si"

const Tracker = () => {
  const [dietCheck, setDietCheck] = useState(false)
  const [exerciseCheck, setExerciseCheck] = useState(false)
  const [sugarCheck, setSugarCheck] = useState(false)
  const [mentalCheck, setMentalCheck] = useState(false)
  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-white to-yellow-400 min-h-screen w-full text-black">
      {/* Welcome Message */}
      <motion.h5
        className="text-3xl p-6 text-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {`Home`}
      </motion.h5>

      {/* Data Widgets - Centered Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        <DataWidget
          icon={<FaCookieBite />}
          title="Diet"
          isComplete={dietCheck}
          setIsComplete={() => setDietCheck(!dietCheck)}
          totalCompletions={5}
        />
        <DataWidget
          icon={<FaRunning />}
          title="Exercise"
          isComplete={exerciseCheck}
          setIsComplete={() => setExerciseCheck(!exerciseCheck)}
          totalCompletions={5}
        />
        <DataWidget
          icon={<TbCandy />}
          title="Sugar Intake"
          isComplete={sugarCheck}
          setIsComplete={() => setSugarCheck(!sugarCheck)}
          totalCompletions={5}
        />
        <DataWidget
          icon={<FaBrain />}
          title="Mental Strengthening"
          isComplete={mentalCheck}
          setIsComplete={() => setMentalCheck(!mentalCheck)}
          totalCompletions={5}
        />
      </motion.div>
    </div>
  )
}

export default Tracker
