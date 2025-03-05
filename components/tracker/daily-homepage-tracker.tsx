import { motion } from "framer-motion"
import DataWidget from "../daily-trackings/data-widget"

const DailyHomePageTracker = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-white to-yellow-400 min-h-screen w-full text-black pb-64">
      <div className="flex flex-col lg:w-[950px]">
        <motion.h5 className="text-3xl p-6 text-start">Home</motion.h5>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto place-items-center"></motion.div>
      </div>
    </div>
  )
}

export default DailyHomePageTracker
