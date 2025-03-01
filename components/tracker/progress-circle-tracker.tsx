"use client"

import { motion } from "framer-motion"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ProgressCircleTracker = () => {
  const overallScore = 85 // Overall score percentage
  const progressData = [
    { title: "Strength", value: 75, color: "#4CAF50" },
    { title: "Speed", value: 60, color: "#2196F3" },
    { title: "Endurance", value: 90, color: "#FF9800" },
    { title: "Agility", value: 70, color: "#9C27B0" },
    { title: "Technique", value: 80, color: "#F44336" },
    { title: "Mental", value: 65, color: "#3F51B5" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-10 w-40 h-40">
        <CircularProgressbar
          value={overallScore}
          text={`${overallScore}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: "#4CAF50",
            trailColor: "rgba(255, 255, 255, 0.2)",
          })}
        />
      </motion.div>

      {/* Mini Progress Circles */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-lg">
        {progressData.map((progress, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col items-center">
            <div className="w-20 h-20">
              <CircularProgressbar
                value={progress.value}
                text={`${progress.value}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: progress.color,
                  trailColor: "rgba(255, 255, 255, 0.2)",
                })}
              />
            </div>
            <p className="mt-2 text-sm font-semibold">{progress.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProgressCircleTracker
