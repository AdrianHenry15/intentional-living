import React, { useMemo } from "react"
import { SiCheckmarx } from "react-icons/si"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { motion } from "framer-motion"

interface IDataWidgetProps {
  icon: React.ReactNode
  title: string
  isComplete: boolean
  totalCompletions: number
  setIsComplete: () => void
}

const DataWidget = (props: IDataWidgetProps) => {
  const { icon, setIsComplete, title, isComplete, totalCompletions } = props

  // Use useMemo to calculate currentDate, startOfTheMonth, and totalDaysInMonth
  const { percentage, totalDaysInMonth } = useMemo(() => {
    const currentDate = new Date()

    // Calculate the start of the current month
    const startOfTheMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )

    // Get the current day of the month
    const currentDayOfTheMonth = currentDate.getDate()

    // Get the total number of days in the current month
    const totalDaysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate()

    // Calculate the completion percentage for the month based on current day of the month
    const percentage =
      currentDayOfTheMonth === 0
        ? 0
        : (totalCompletions / currentDayOfTheMonth) * 100

    return {
      startOfTheMonth,
      currentDayOfTheMonth,
      totalDaysInMonth,
      percentage,
    }
  }, [totalCompletions]) // Recalculate only if `totalCompletions` changes

  return (
    <motion.button
      onClick={setIsComplete}
      className={`${isComplete ? "bg-green-200" : "bg-white"} flex flex-col flex-auto w-[300px] p-4 rounded-lg shadow-lg`}
      whileHover={{ scale: 1.05 }} // Scale on hover
      transition={{ type: "spring", stiffness: 300 }}>
      <div className="flex items-center justify-between flex-auto">
        {/* Title  */}
        <div className="flex items-center flex-1 text-yellow-400">
          {icon}
          <h5 className="ml-2">{title}</h5>
        </div>
        {isComplete ? (
          <motion.div
            className="text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <SiCheckmarx />
          </motion.div>
        ) : (
          <motion.div
            className="text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <AiOutlineCloseCircle />
          </motion.div>
        )}
      </div>

      <div className="flex justify-between items-center pt-6">
        <motion.h5
          className="text-green-500 flex text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          {percentage.toFixed(2)}%
        </motion.h5>
        <p className="flex text-xs items-center">
          {totalCompletions} / {totalDaysInMonth}
        </p>
      </div>
    </motion.button>
  )
}

export default DataWidget
