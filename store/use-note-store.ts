import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Note {
  id: string
  text: string
  date: string
}

interface NoteStore {
  notes: Note[]
  noteText: string
  setNoteText: (text: string) => void
  addNote: (text: string) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      noteText: "", // State for the note input text
      setNoteText: (text) => set({ noteText: text }), // Set the input text
      addNote: (text) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: crypto.randomUUID(),
              text,
              date: new Date().toLocaleString(), // ⬅️ Save the date
            },
          ],
        })),
      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, text } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: "note-store", // Key for localStorage or sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Persist data in localStorage
    }
  )
)
