import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import axios from "axios"
import { getDayByNumber } from "@/lib/utils/get-day-by-number"
// import { auth } from "@clerk/nextjs/server"

interface Note {
  _id: string
  user_id: string
  content: string
  date: string
  created_at: string
  updated_at: string
}

interface NoteStore {
  notes: Note[]
  noteText: string
  setNoteText: (text: string) => void
  fetchNotes: () => Promise<void>
  addNote: (text: string) => Promise<void>
  updateNote: (id: string, text: string) => Promise<void>
  deleteNote: (id: string) => Promise<void>
}

export const useNoteStore = create(
  persist<NoteStore>(
    (set, get) => ({
      notes: [],
      noteText: "",

      setNoteText: (text) => set({ noteText: text }),

      fetchNotes: async () => {
        try {
          const response = await axios.get("/api/user-notes")
          set({ notes: response.data })
        } catch (error) {
          console.error("Failed to fetch notes:", error)
        }
      },

      addNote: async (text) => {
        try {
          if (text.length < 5) {
            console.error("Note content must be at least 5 characters long.")
            return
          }

          const now = new Date()

          const response = await axios.post("/api/user-notes", {
            content: text,
            date: `${getDayByNumber(now.getDay())} ${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
          })

          set((state) => ({ notes: [...state.notes, response.data] }))
        } catch (error: any) {
          console.error(
            "Failed to add note:",
            error.response?.data || error.message
          )
        }
      },

      updateNote: async (id, text) => {
        try {
          const response = await axios.patch(`/api/user-notes/${id}`, {
            content: text,
          })
          set((state) => ({
            notes: state.notes.map((note) =>
              note._id === id ? { ...note, content: text } : note
            ),
          }))
        } catch (error) {
          console.error("Failed to update note:", error)
        }
      },

      deleteNote: async (id) => {
        try {
          await axios.delete(`/api/user-notes/${id}`)
          set((state) => ({
            notes: state.notes.filter((note) => note._id !== id),
          }))
        } catch (error) {
          console.error("Failed to delete note:", error)
        }
      },
    }),
    {
      name: "note-storage", // Storage key for persistence
      storage: createJSONStorage(() => sessionStorage), // Use localStorage for persistence
    }
  )
)
