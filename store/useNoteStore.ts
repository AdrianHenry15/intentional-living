import { create } from "zustand"

interface Note {
  id: string
  text: string
  date: string
}

interface NoteStore {
  notes: Note[]
  addNote: (text: string) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
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
}))
