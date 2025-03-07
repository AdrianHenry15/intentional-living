import { create } from "zustand"

type TrackerState = {
  dietCheck: boolean
  exerciseCheck: boolean
  sugarCheck: boolean
  mentalCheck: boolean
  toggleDiet: () => void
  toggleExercise: () => void
  toggleSugar: () => void
  toggleMental: () => void
}

export const useTrackerStore = create<TrackerState>((set) => ({
  dietCheck: false,
  exerciseCheck: false,
  sugarCheck: false,
  mentalCheck: false,
  toggleDiet: () => set((state) => ({ dietCheck: !state.dietCheck })),
  toggleExercise: () =>
    set((state) => ({ exerciseCheck: !state.exerciseCheck })),
  toggleSugar: () => set((state) => ({ sugarCheck: !state.sugarCheck })),
  toggleMental: () => set((state) => ({ mentalCheck: !state.mentalCheck })),
}))
