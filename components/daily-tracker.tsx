"use client"

import { useState, ChangeEvent } from "react"
import { motion } from "framer-motion"

export default function DailyTracker() {
  const [tracking, setTracking] = useState({
    diet: false,
    exercise: false,
    noSugar: false,
    mentalStrength: false,
    wakeTime: "",
    sleepTime: "",
    notes: "",
  })

  const handleCheckboxChange =
    (field: keyof typeof tracking) => (e: ChangeEvent<HTMLInputElement>) => {
      setTracking((prev) => ({ ...prev, [field]: e.target.checked }))
    }

  const handleInputChange =
    (field: keyof typeof tracking) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTracking((prev) => ({ ...prev, [field]: e.target.value }))
    }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {/* Yellow-Black Dynamic Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-full h-full bg-gradient-radial from-yellow-500 to-black opacity-20 blur-2xl"></div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-6 sm:mb-10 tracking-wide z-10 text-center">
        Daily Tracker
      </h1>

      {/* Main Container - Full Width on Mobile */}
      <div className="relative z-10 bg-gray-900 p-6 sm:p-10 rounded-2xl shadow-xl w-full sm:max-w-3xl space-y-8 sm:space-y-10 border border-yellow-500">
        {/* Date Section */}
        <div className="text-center">
          <h2 className="text-base sm:text-lg font-semibold text-gray-400">
            Tracking for
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-yellow-400">
            [Insert Date]
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Tracking Checkboxes */}
          <TrackerInput
            label="Diet Check"
            checked={tracking.diet}
            onChange={handleCheckboxChange("diet")}
          />
          <TrackerInput
            label="Exercise Check"
            checked={tracking.exercise}
            onChange={handleCheckboxChange("exercise")}
          />
          <TrackerInput
            label="No Sugar"
            checked={tracking.noSugar}
            onChange={handleCheckboxChange("noSugar")}
          />
          <TrackerInput
            label="Mental Strength"
            checked={tracking.mentalStrength}
            onChange={handleCheckboxChange("mentalStrength")}
          />
        </div>

        {/* Sleep Section */}
        <div className="p-6 sm:p-8 bg-gray-800 rounded-xl shadow-md border border-yellow-500">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-4">
            Sleep Tracking
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="time"
              className="w-full p-3 bg-gray-900 text-gray-300 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={tracking.wakeTime}
              onChange={handleInputChange("wakeTime")}
              placeholder="Wake Time"
            />
            <input
              type="time"
              className="w-full p-3 bg-gray-900 text-gray-300 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={tracking.sleepTime}
              onChange={handleInputChange("sleepTime")}
              placeholder="Sleep Time"
            />
          </div>
          <textarea
            className="w-full mt-6 p-3 bg-gray-900 text-gray-300 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Sleep Notes"
            value={tracking.notes}
            onChange={handleInputChange("notes")}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Reusable Tracker Checkbox Component
function TrackerInput({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="flex items-center bg-gray-800 p-4 sm:p-5 rounded-xl border border-yellow-400 shadow-md cursor-pointer">
      <input
        type="checkbox"
        className="mr-3 h-5 w-5 accent-yellow-500"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-gray-300 text-lg sm:text-xl font-medium">
        {label}
      </span>
    </label>
  )
}
