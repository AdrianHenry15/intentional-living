"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDailyTrackingStore } from "@/store/use-daily-tracking-store"
import { Button } from "../button"

const SleepData = () => {
  const { wakeTime, sleepTime, sleepNotes, updateSleepData, fetchTracking } =
    useDailyTrackingStore()

  const [localWakeTime, setLocalWakeTime] = useState(wakeTime || "")
  const [localSleepTime, setLocalSleepTime] = useState(sleepTime || "")
  const [localSleepNotes, setLocalSleepNotes] = useState(sleepNotes || "")

  // useEffect(() => {
  //   fetchTracking()
  // }, [fetchTracking])

  // useEffect(() => {
  //   setLocalWakeTime(wakeTime || "")
  //   setLocalSleepTime(sleepTime || "")
  //   setLocalSleepNotes(sleepNotes || "")
  // }, [wakeTime, sleepTime, sleepNotes])

  const handleUpdate = async () => {
    await updateSleepData(localWakeTime, localSleepTime, localSleepNotes)
  }

  return (
    <motion.div
      className="flex flex-col px-4 pb-48 pt-6 bg-gradient-to-b from-white via-yellow-400 to-white w-full text-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.h5
        className="text-3xl py-6 text-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {`Sleep Data`}
      </motion.h5>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        {/* Wake Time Input */}
        <div className="flex flex-col">
          <label htmlFor="wakeTime" className="text-lg font-medium">
            Wake Time
          </label>
          <input
            type="time"
            id="wakeTime"
            className="p-2 border rounded-md mt-1"
            value={localWakeTime}
            onChange={(e) => setLocalWakeTime(e.target.value)}
          />
        </div>

        {/* Sleep Time Input */}
        <div className="flex flex-col">
          <label htmlFor="sleepTime" className="text-lg font-medium">
            Sleep Time
          </label>
          <input
            type="time"
            id="sleepTime"
            className="p-2 border rounded-md mt-1"
            value={localSleepTime}
            onChange={(e) => setLocalSleepTime(e.target.value)}
          />
        </div>

        {/* Sleep Notes Textarea */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="sleepNotes" className="text-lg font-medium">
            Sleep Notes
          </label>
          <textarea
            id="sleepNotes"
            className="p-2 border rounded-md mt-1 resize-none h-24"
            value={localSleepNotes}
            onChange={(e) => setLocalSleepNotes(e.target.value)}
          />
        </div>
      </motion.div>

      <Button
        onClick={handleUpdate}
        className="my-10 bg-green-500 w-[300px] self-center flex items-center justify-center">
        Save Sleep Progress
      </Button>
    </motion.div>
  )
}

export default SleepData
