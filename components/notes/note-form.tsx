"use client"

import { useState, useEffect } from "react"
import { useNoteStore } from "@/store/use-note-store"
import { useRouter } from "next/navigation"

interface INoteFormProps {
  id: string
}

export default function NoteForm(props: INoteFormProps) {
  const { id } = props
  const { notes, addNote, updateNote, noteText, setNoteText } = useNoteStore()
  const router = useRouter()

  useEffect(() => {
    if (id) {
      // If there's an id, we are editing an existing note
      const note = notes.find((note) => note._id === id)
      if (note) {
        setNoteText(note.content)
      }
    }
  }, [id, notes, setNoteText])

  const handleSubmit = () => {
    if (noteText.trim() !== "") {
      if (id) {
        updateNote(id, noteText) // Update the existing note
      } else {
        addNote(noteText) // Add a new note
      }
      router.push("/auth/notes") // After adding or updating, redirect to the list
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">
        {id ? "Edit Note" : "Create Note"}
      </h1>

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
          placeholder="Write your note here..."
          autoFocus
        />
        <div className="mt-4 flex justify-between space-x-3">
          <button
            onClick={handleSubmit}
            className="bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition">
            {id ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  )
}
