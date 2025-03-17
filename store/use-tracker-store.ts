import { create } from "zustand"
import axios from "axios"

type TrackerState = {
  dietCheck: boolean
  exerciseCheck: boolean
  sugarCheck: boolean
  mentalCheck: boolean
  trackingId: string | null
  fetchTracking: () => Promise<void>
  toggleDiet: () => Promise<void>
  toggleExercise: () => Promise<void>
  toggleSugar: () => Promise<void>
  toggleMental: () => Promise<void>
}

export const useTrackerStore = create<TrackerState>((set, get) => ({
  dietCheck: false,
  exerciseCheck: false,
  sugarCheck: false,
  mentalCheck: false,
  trackingId: null,

  fetchTracking: async () => {
    try {
      const response = await axios.get("/api/daily-trackings")
      if (response.status === 200) {
        const data = response.data
        if (data && data.length > 0) {
          set({
            dietCheck: data[0].diet_check,
            exerciseCheck: data[0].exercise_check,
            sugarCheck: data[0].no_sugar,
            mentalCheck: data[0].mental_strength_check,
            trackingId: data[0]._id,
          })
        }
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error)
    }
  },

  toggleDiet: async () => {
    const { dietCheck, trackingId } = get()
    try {
      if (trackingId) {
        await axios.put("/api/daily-trackings", {
          id: trackingId,
          diet_check: !dietCheck,
        })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: !dietCheck,
          exercise_check: get().exerciseCheck,
          no_sugar: get().sugarCheck,
          mental_strength_check: get().mentalCheck,
        })
        set({ trackingId: response.data._id })
      }
      set((state) => ({ dietCheck: !state.dietCheck }))
    } catch (error) {
      console.error("Error updating diet tracking:", error)
    }
  },

  toggleExercise: async () => {
    const { exerciseCheck, trackingId } = get()
    try {
      if (trackingId) {
        await axios.put("/api/daily-trackings", {
          id: trackingId,
          exercise_check: !exerciseCheck,
        })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: get().dietCheck,
          exercise_check: !exerciseCheck,
          no_sugar: get().sugarCheck,
          mental_strength_check: get().mentalCheck,
        })
        set({ trackingId: response.data._id })
      }
      set((state) => ({ exerciseCheck: !state.exerciseCheck }))
    } catch (error) {
      console.error("Error updating exercise tracking:", error)
    }
  },

  toggleSugar: async () => {
    const { sugarCheck, trackingId } = get()
    try {
      if (trackingId) {
        await axios.put("/api/daily-trackings", {
          id: trackingId,
          no_sugar: !sugarCheck,
        })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: get().dietCheck,
          exercise_check: get().exerciseCheck,
          no_sugar: !sugarCheck,
          mental_strength_check: get().mentalCheck,
        })
        set({ trackingId: response.data._id })
      }
      set((state) => ({ sugarCheck: !state.sugarCheck }))
    } catch (error) {
      console.error("Error updating sugar tracking:", error)
    }
  },

  toggleMental: async () => {
    const { mentalCheck, trackingId } = get()
    try {
      if (trackingId) {
        await axios.put("/api/daily-trackings", {
          id: trackingId,
          mental_strength_check: !mentalCheck,
        })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: get().dietCheck,
          exercise_check: get().exerciseCheck,
          no_sugar: get().sugarCheck,
          mental_strength_check: !mentalCheck,
        })
        set({ trackingId: response.data._id })
      }
      set((state) => ({ mentalCheck: !state.mentalCheck }))
    } catch (error) {
      console.error("Error updating mental tracking:", error)
    }
  },
}))
