"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { TbCandy } from "react-icons/tb"
import { FaBrain, FaCookieBite, FaPlus, FaRunning } from "react-icons/fa"
import DataWidget from "../daily-trackings/data-widget"
import { SiCustomink } from "react-icons/si"

const Tracker = () => {
  const [dietCheck, setDietCheck] = useState(false)
  const [exerciseCheck, setExerciseCheck] = useState(false)
  const [sugarCheck, setSugarCheck] = useState(false)
  const [mentalCheck, setMentalCheck] = useState(false)
  const [customCheck1, setCustomCheck1] = useState(false)
  const [customCheck2, setCustomCheck2] = useState(false)
  const [customGoalOpen1, setCustomGoalOpen1] = useState(false)
  const [customGoalOpen2, setCustomGoalOpen2] = useState(false)
  const [customGoalName1, setCustomGoalName1] = useState("")
  const [customGoalInputComplete1, setCustomGoalInputComplete1] =
    useState(false)
  const [customGoalInputComplete2, setCustomGoalInputComplete2] =
    useState(false)
  const [customGoalName2, setCustomGoalName2] = useState("")

  const handleCustomInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomGoalName1(e.target.value)
  }
  const handleCustomInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomGoalName2(e.target.value)
  }

  return (
    <div className="flex flex-col overflow-y-scroll p-4 bg-gradient-to-b from-white to-yellow-400 min-h-screen w-full text-black">
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

        {/* Render Custom Goal 1 Widget */}
        {customGoalOpen1 && (
          <DataWidget
            icon={<SiCustomink />}
            title={customGoalName1}
            isComplete={customCheck1}
            setIsComplete={() => setCustomCheck1(!customCheck1)}
            totalCompletions={5}
            isCustom
            inputChange={handleCustomInput1}
            inputComplete={customGoalInputComplete1}
            setInputComplete={() =>
              setCustomGoalInputComplete1(!customGoalInputComplete1)
            }
          />
        )}

        {/* Render Custom Goal 2 Widget */}
        {customGoalOpen2 && (
          <DataWidget
            icon={<SiCustomink />}
            title={customGoalName2}
            isComplete={customCheck2}
            setIsComplete={() => setCustomCheck2(!customCheck2)}
            totalCompletions={5}
            isCustom
            inputChange={handleCustomInput2}
            inputComplete={customGoalInputComplete2}
            setInputComplete={() =>
              setCustomGoalInputComplete2(!customGoalInputComplete2)
            }
          />
        )}
        {/* Custom Goal 1 */}
        {!customGoalOpen1 && (
          <button
            onClick={() => setCustomGoalOpen1(true)}
            className="flex z-50 flex-col text-black items-center justify-center w-[300px] border-[1px] border-black py-2 rounded-lg">
            <div className="bg-white rounded-full p-4">
              <FaPlus size={25} />
            </div>
            <p className="text-xs whitespace-nowrap pt-4 pb-2 text-yellow-800">
              Create a custom goal 1...
            </p>
          </button>
        )}

        {/* Custom Goal 2 */}
        {!customGoalOpen2 && customGoalOpen1 && (
          <button
            onClick={() => setCustomGoalOpen2(true)}
            className="flex z-50 flex-col text-black items-center justify-center w-[300px] border-[1px] border-black py-2 rounded-lg">
            <div className="bg-white rounded-full p-4">
              <FaPlus size={25} />
            </div>
            <p className="text-xs whitespace-nowrap pt-4 pb-2 text-yellow-800">
              Create a custom goal 2...
            </p>
          </button>
        )}
      </motion.div>
    </div>
  )
}

export default Tracker
