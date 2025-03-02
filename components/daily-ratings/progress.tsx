import { motion } from "framer-motion"

interface ProgressProps {
  current: number
  total: number
}

const Progress = ({ current, total }: ProgressProps) => {
  const progressPercentage = (current / total) * 100

  return (
    <div className="relative w-full mb-6">
      {/* Progress Bar Container */}
      <div className="w-full bg-white/20 backdrop-blur-lg h-4 rounded-full overflow-hidden">
        {/* Animated Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 to-black-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Progress Text */}
      <p className="mt-2 text-sm font-semibold text-white text-center">
        Question <span className="text-blue-400">{current}</span> of {total}
      </p>
    </div>
  )
}

export default Progress
