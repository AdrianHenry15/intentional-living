"use client"

import { motion } from "framer-motion"
import { Trash, Edit, Plus } from "lucide-react"
import { useNoteStore } from "@/store/use-note-store"
import { useRouter } from "next/navigation"

export default function NotesPage() {
  const { notes, deleteNote } = useNoteStore()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-8 md:p-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-6 text-center">
        Notes
      </motion.h1>

      {/* New Note Button */}
      <motion.button
        onClick={() => router.push("/auth/notes/new")} // Navigate to new note page
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 p-3 rounded-md text-white hover:bg-blue-700 transition-all mb-6 flex items-center justify-center">
        <Plus size={20} />
        <span className="ml-2 hidden sm:block">New Note</span>
      </motion.button>

      {/* Notes List */}
      <div className="w-full max-w-lg space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-center">
            No notes yet. Start writing!
          </p>
        ) : (
          notes.map((note) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-between items-center">
                <span className="flex-1 text-lg">{note.content}</span>

                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => router.push(`/auth/notes/${note._id}`)} // Redirect to the note edit page
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-yellow-500 hover:text-yellow-400 transition">
                    <Edit size={20} />
                  </motion.button>

                  <motion.button
                    onClick={() => deleteNote(note._id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-red-500 hover:text-red-400 transition">
                    <Trash size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Date Below Note */}
              <div className="flex flex-col text-start">
                <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                <span className="flex items-center text-[11px] text-gray-400/50">
                  <h5 className="mr-1">Updated: </h5>
                  <p>
                    {new Date(note.updated_at).toLocaleString("en-US", {
                      weekday: "short", // e.g., "Thu"
                      month: "short", // e.g., "Mar"
                      day: "2-digit", // e.g., "20"
                      year: "numeric", // e.g., "2025"
                      hour: "2-digit", // e.g., "03 PM"
                      minute: "2-digit", // e.g., "36"
                      hour12: true, // 12-hour format
                    })}
                  </p>
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
