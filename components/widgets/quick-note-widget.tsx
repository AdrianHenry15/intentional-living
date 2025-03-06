"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useNoteStore } from "@/store/use-note-store"

export default function QuickNoteWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")
  const { addNote } = useNoteStore()

  const handleAddNote = () => {
    if (noteText.trim() !== "") {
      addNote(noteText)
      setNoteText("") // Clear the note input
      setIsOpen(false) // Close the form
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Quick Note Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition">
          <Plus size={24} />
        </motion.button>
      )}

      {/* Quick Note Form */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-gray-800 p-4 rounded-lg shadow-md max-w-sm w-full mt-4">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note..."
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            rows={4}
            autoFocus
          />
          <div className="mt-4 flex justify-between space-x-3">
            <button
              onClick={handleAddNote}
              className="bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition">
              Add Note
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 transition">
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
