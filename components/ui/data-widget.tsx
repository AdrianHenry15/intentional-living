import React from "react"
import { FaChevronRight } from "react-icons/fa"
import { motion } from "framer-motion"

interface IDataWidgetProps {
  icon: React.ReactNode
  title: string
  data: string
  percentage: string
  time?: string
}

const DataWidget = (props: IDataWidgetProps) => {
  const { icon, title, data, percentage, time } = props

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-600 w-full max-w-xs text-white">
      {/* Top Section: Icon, Title, Date/Time, Chevron */}
      <div className="flex items-center justify-between">
        {/* Icon and Title */}
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
            className="text-3xl text-yellow-400">
            {icon}
          </motion.div>
          <h5 className="text-sm font-medium text-gray-200">{title}</h5>
        </div>

        {/* Date/Time and Chevron */}
        <div className="flex items-center space-x-2 text-gray-300 text-xs">
          <p className="text-green-500">{percentage ? percentage : time}%</p>
        </div>
      </div>

      {/* Data Section */}
      <motion.h5
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mt-4 text-green-400 text-left">
        {data}
      </motion.h5>
    </motion.div>
  )
}

export default DataWidget
