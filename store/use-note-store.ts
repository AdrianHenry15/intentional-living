import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import axios from "axios"
// import { auth } from "@clerk/nextjs/server"

interface Note {
  id: string
  text: string
  date: string
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
          // const { userId } = await auth()

          // if (!userId) {
          //   throw new Error("User not authenticated")
          // }

          const response = await axios.post("/api/user-notes", {
            content: text,
            // user_id: userId,
          })
          set((state) => ({ notes: [...state.notes, response.data.note] }))
        } catch (error) {
          console.error("Failed to add note:", error)
        }
      },

      updateNote: async (id, text) => {
        try {
          const response = await axios.patch(`/api/user-notes/${id}`, {
            content: text,
          })
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === id ? response.data.note : note
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
            notes: state.notes.filter((note) => note.id !== id),
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
