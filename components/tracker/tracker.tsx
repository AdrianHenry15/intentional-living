"use client"

import React from "react"
import { motion } from "framer-motion"
import { TbCandy } from "react-icons/tb"
import { FaBrain, FaCookieBite, FaRunning } from "react-icons/fa"
import { SiCustomink } from "react-icons/si"
import DataWidget from "../daily-trackings/data-widget"
import CustomGoalItem from "./custom-goal-item"
import { Button } from "../button"
import { useCustomGoalStore } from "@/store/use-custom-goal-store"
import { useDailyTrackingStore } from "@/store/use-daily-tracking-store"
import { useUser } from "@clerk/nextjs"

const Tracker = () => {
  const { user } = useUser()
  const {
    dietCheck,
    exerciseCheck,
    sugarCheck,
    mentalCheck,
    toggleDiet,
    toggleExercise,
    toggleSugar,
    toggleMental,
  } = useDailyTrackingStore()

  const { goals, addGoal, toggleComplete, toggleInputComplete, deleteGoal } =
    useCustomGoalStore()

  return (
    <div className="flex flex-col px-4 bg-gradient-to-b from-white to-yellow-400 min-h-screen w-full text-black">
      {/* Welcome Message */}
      <motion.h5
        className="text-3xl p-6 text-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {`Tracker`}
      </motion.h5>

      {/* Data Widgets - Centered Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        <DataWidget
          icon={<FaCookieBite />}
          title="Diet"
          isComplete={dietCheck}
          setDailyTrackingComplete={toggleDiet()}
          totalCompletions={5}
        />
        <DataWidget
          icon={<FaRunning />}
          title="Exercise"
          isComplete={exerciseCheck}
          setDailyTrackingComplete={toggleExercise()}
          totalCompletions={5}
        />
        <DataWidget
          icon={<TbCandy />}
          title="Sugar Intake"
          isComplete={sugarCheck}
          setDailyTrackingComplete={toggleSugar()}
          totalCompletions={5}
        />
        <DataWidget
          icon={<FaBrain />}
          title="Mental Strengthening"
          isComplete={mentalCheck}
          setDailyTrackingComplete={toggleMental()}
          totalCompletions={5}
        />

        {/* Render Custom Goals */}
        {goals.map((goal) => (
          <DataWidget
            key={goal.id}
            deleteGoal={() => deleteGoal(goal.id)}
            icon={<SiCustomink />}
            title={goal.name}
            isComplete={goal.isComplete}
            setCustomComplete={() =>
              toggleComplete(goal.id, user?.id as string)
            }
            totalCompletions={5}
            isCustom
            inputChange={(e) => {}}
            inputComplete={goal.inputComplete}
            setInputComplete={() => toggleInputComplete(goal.id)}
          />
        ))}

        {/* Custom Goal Add Button */}
        {goals.length < 2 && (
          <CustomGoalItem
            title="Create a custom goal..."
            setCustomGoal={() => addGoal(`Custom Goal ${goals.length + 1}`)}
          />
        )}
      </motion.div>

      <Button className="my-10 mb-32 bg-green-500 w-[300px] self-center flex items-center justify-center">
        Save Progress
      </Button>
    </div>
  )
}

export default Tracker
