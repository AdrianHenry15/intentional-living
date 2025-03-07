"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNoteStore } from "@/store/use-note-store"
import { useRouter } from "next/navigation"

export default function CreateNotePage() {
  const { addNote, noteText, setNoteText } = useNoteStore()
  const router = useRouter()

  const handleSave = () => {
    if (noteText.trim() === "") return

    addNote(noteText)
    router.push("/auth/notes") // Redirect back to the notes list
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-8 md:p-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-6 text-center">
        Create a New Note
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
          className="w-full p-4 text-lg rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          rows={6}
        />
        <div className="flex justify-end mt-4">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 p-3 rounded-md text-white hover:bg-blue-700 transition-all">
            Create Note
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
