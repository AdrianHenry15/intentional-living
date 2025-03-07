import React, { useMemo } from "react"
import { SiCheckmarx } from "react-icons/si"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { motion } from "framer-motion"
import { BsPencilSquare } from "react-icons/bs"

// Define the expected prop types for the DataWidget component
interface IDataWidgetProps {
  icon: React.ReactNode // Icon to be displayed in the widget
  title: string // Title or label for the widget
  isComplete: boolean // Flag indicating whether the task is complete
  totalCompletions: number // The number of completions for the task
  setIsComplete: () => void // Function to toggle the completion state
  deleteGoal?: () => void // Function to toggle the completion state
  setInputComplete?: () => void // Function to mark input as complete (optional)
  inputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Input change handler (optional)
  isCustom?: boolean // Flag indicating whether the widget is in custom mode (optional)
  inputComplete?: boolean // Flag indicating whether input is complete (optional)
}

const DataWidget: React.FC<IDataWidgetProps> = (props) => {
  const {
    icon,
    setIsComplete,
    inputChange,
    setInputComplete,
    deleteGoal,
    isCustom,
    title,
    isComplete,
    totalCompletions,
    inputComplete,
  } = props

  // Memoized calculation of completion percentage and date-related information
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
      onClick={isCustom && !inputComplete ? () => {} : setIsComplete}
      className={`${isComplete ? "bg-green-200" : "bg-white"} flex flex-col flex-auto w-[300px] p-4 rounded-lg shadow-lg`}
      whileHover={{ scale: 1.05 }} // Scale on hover for a more interactive UI
      transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation on hover
    >
      <div className="flex items-center justify-between flex-auto">
        {/* Display the icon and title, with optional input for custom mode */}
        <div className="flex items-center flex-1 text-yellow-400">
          {icon}
          {isCustom && !inputComplete ? (
            // If in custom mode and input is not complete, show an input field
            <input
              className="mx-1 pl-2 border-[1px] border-black rounded-md"
              type="text"
              onChange={inputChange}
              value={title}
            />
          ) : (
            // Otherwise, display the title as text
            <h5 className="ml-2">{title}</h5>
          )}
        </div>
        <div className="flex items-center">
          {/* Show edit icon for custom mode */}
          {isCustom && (
            <BsPencilSquare
              onClick={isCustom ? setInputComplete : () => {}}
              className={`${inputComplete ? "text-yellow-500" : "text-green-500"} mr-2 z-50 animate-pulse`}
            />
          )}
          {/* Display completion status icon */}
          {isComplete ? (
            // If complete, show checkmark icon
            <motion.div
              className="text-green-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <SiCheckmarx />
            </motion.div>
          ) : (
            // If incomplete, show close circle icon
            <motion.div
              className="text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <SiCheckmarx />
            </motion.div>
          )}
        </div>
        {/* Show edit icon for custom mode */}
        {isCustom && (
          <AiOutlineCloseCircle
            onClick={deleteGoal}
            className={`text-red-500 ml-2 z-50`}
          />
        )}
      </div>

      <div className="flex justify-between items-center pt-6">
        {/* Display the completion percentage */}
        <motion.h5
          className="text-green-500 flex text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          {percentage.toFixed(2)}%
        </motion.h5>
        {/* Display the current and total number of days in the month */}
        <p className="flex text-xs items-center">
          {totalCompletions} / {totalDaysInMonth}
        </p>
      </div>
    </motion.button>
  )
}

// Add displayName for better debugging and React DevTools integration
DataWidget.displayName = "DataWidget"

export default DataWidget
