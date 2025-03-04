"use client"

import { isSameWeek, isToday, addDays, format } from "date-fns"
import clsx from "clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useCalendarStore } from "@/store/use-calendar-store"

const WeekCalendar = () => {
  const {
    days,
    currentWeekStart,
    currentDay,
    setCurrentDay,
    nextWeek,
    prevWeek,
    resetWeek,
  } = useCalendarStore()

  const isCurrentWeek = isSameWeek(currentWeekStart, new Date(), {
    weekStartsOn: 0,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={clsx(
        "w-full text-white shadow-lg top-0 flex flex-col sticky py-2",
        isCurrentWeek
          ? "bg-gradient-to-b from-white to-yellow-400"
          : "bg-gradient-to-b from-white/50 to-yellow-400"
      )}>
      {/* Week Navigation */}
      <div className="flex justify-between py-1 px-2 text-sm mb-2 text-black">
        <button
          onClick={prevWeek}
          className="hover:text-gray-800 flex items-center">
          <ChevronLeft size={20} />
          <p>Prev</p>
        </button>
        <motion.button
          onClick={resetWeek}
          whileTap={{ scale: 0.95 }}
          className="font-bold">
          {format(
            days.find((day) => day.day === currentDay)?.dateObj || new Date(),
            "EEEE"
          ) === format(new Date(), "EEEE")
            ? "Today"
            : format(
                days.find((day) => day.day === currentDay)?.dateObj ||
                  new Date(),
                "MMM d"
              )}
        </motion.button>

        <button
          onClick={nextWeek}
          className="hover:text-gray-800 flex items-center">
          <p>Next</p>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week Days */}
      <motion.div
        className="flex justify-around"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}>
        {days.map((day, index) => {
          const dateObj = addDays(currentWeekStart, index)
          const isSelectedDay = day.day === currentDay
          const isCurrentDay = isToday(dateObj)

          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex flex-col items-center text-sm cursor-pointer p-2 ${
                isSelectedDay
                  ? "text-black bg-yellow-400 rounded"
                  : "text-gray-900"
              }`}
              onClick={() => setCurrentDay(day.day)}>
              <span className="font-bold transition">{day.day}</span>
              <motion.div
                className={clsx(
                  "w-8 h-8 flex items-center justify-center rounded-full text-white",
                  isCurrentDay
                    ? "bg-yellow-700 text-black font-bold"
                    : "bg-black"
                )}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                {day.date}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default WeekCalendar
