// DataWidget.tsx
import React from "react"
import { FaChevronRight, FaCheck, FaEdit } from "react-icons/fa"
import { motion } from "framer-motion"
import { useDailyTrackingStore } from "@/store/use-daily-tracking-store"

interface IDataWidgetProps {
  id: number
  title: string
  icon: React.ReactNode
  completed_days: number
  isCustom?: boolean
  onEdit?: (newTitle: string) => void
}

const DataWidget: React.FC<IDataWidgetProps> = ({
  id,
  title,
  completed_days,
  icon,
  isCustom,
  onEdit,
}) => {
  const [editing, setEditing] = React.useState(false)
  const [customTitle, setCustomTitle] = React.useState(title)

  const handleEdit = () => {
    if (editing && onEdit) {
      onEdit(customTitle)
    }
    setEditing(!editing)
  }

  const percentage = Math.round((completed_days / 30) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-600 w-full max-w-xs text-white">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
            className="text-3xl text-yellow-400">
            {icon}
          </motion.div>

          {editing ? (
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="bg-transparent border-b border-gray-400 text-sm text-gray-200 outline-none"
              autoFocus
            />
          ) : (
            <h5 className="text-sm font-medium text-gray-200">{customTitle}</h5>
          )}
        </div>

        {isCustom && (
          <button
            onClick={handleEdit}
            className="text-gray-400 hover:text-white transition">
            {editing ? <FaCheck /> : <FaEdit />}
          </button>
        )}
      </div>

      {/* Progress Section */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-2xl font-bold text-green-400">{percentage}%</span>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            // checked={completed_days >= 30}
            // onChange={() => markGoalComplete(id)}
            className="w-5 h-5 text-green-400 bg-gray-700 rounded focus:ring-green-500 focus:ring-2"
          />
          <span className="text-sm text-gray-300">Complete</span>
        </label>
      </div>
    </motion.div>
  )
}

export default DataWidget
