"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash, Edit, Plus, Check } from "lucide-react"
import { useNoteStore } from "@/store/useNoteStore"

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote } = useNoteStore()
  const [newNote, setNewNote] = useState("")
  const [editing, setEditing] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-6">
        Notes
      </motion.h1>

      {/* Add New Note Section */}
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a new note..."
            className="flex-1 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            onClick={() => {
              if (newNote.trim() !== "") {
                addNote(newNote)
                setNewNote("")
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition">
            <Plus size={20} />
          </motion.button>
        </div>
      </div>

      {/* Notes List */}
      <div className="mt-6 w-full max-w-md">
        {notes.length === 0 && (
          <p className="text-gray-400 text-center">
            No notes yet. Start writing!
          </p>
        )}
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-800 p-4 rounded-lg shadow-md mb-3">
            <div className="flex justify-between items-center">
              {editing === note.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 mr-2 rounded-md bg-gray-700 text-white border border-gray-600"
                  autoFocus
                />
              ) : (
                <span className="flex-1">{note.text}</span>
              )}

              <div className="flex items-center space-x-3">
                {editing === note.id ? (
                  <motion.button
                    onClick={() => {
                      updateNote(note.id, editText)
                      setEditing(null)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-green-500">
                    <Check size={20} />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => {
                      setEditing(note.id)
                      setEditText(note.text)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-yellow-500">
                    <Edit size={20} />
                  </motion.button>
                )}

                <motion.button
                  onClick={() => deleteNote(note.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-500">
                  <Trash size={20} />
                </motion.button>
              </div>
            </div>

            {/* Date Below Note */}
            <p className="text-xs text-gray-400 mt-2">{note.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
