import { create } from "zustand"
import axios from "axios"

type DailyTrackingStore = {
  dietCheck: boolean
  exerciseCheck: boolean
  sugarCheck: boolean
  mentalCheck: boolean
  wakeTime: string | null
  sleepTime: string | null
  sleepNotes: string
  trackingId: string | null
  fetchTracking: () => Promise<void>
  toggleDiet: () => Promise<void>
  toggleExercise: () => Promise<void>
  toggleSugar: () => Promise<void>
  toggleMental: () => Promise<void>
  updateSleepData: (
    wakeTime: string,
    sleepTime: string,
    sleepNotes: string
  ) => Promise<void>
}

export const useDailyTrackingStore = create<DailyTrackingStore>((set, get) => ({
  dietCheck: false,
  exerciseCheck: false,
  sugarCheck: false,
  mentalCheck: false,
  wakeTime: null,
  sleepTime: null,
  sleepNotes: "",
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
            wakeTime: data[0].wake_time || null,
            sleepTime: data[0].sleep_time || null,
            sleepNotes: data[0].sleep_notes || "",
            trackingId: data[0]._id,
          })
        }
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error)
    }
  },

  toggleDiet: async () => {
    const {
      dietCheck,
      trackingId,
      exerciseCheck,
      sugarCheck,
      mentalCheck,
      wakeTime,
      sleepTime,
      sleepNotes,
    } = get()
    try {
      let updatedId = trackingId
      const payload = { diet_check: !dietCheck }

      if (trackingId) {
        await axios.put("/api/daily-trackings", { id: trackingId, ...payload })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          ...payload,
          exercise_check: exerciseCheck,
          no_sugar: sugarCheck,
          mental_strength_check: mentalCheck,
          wake_time: wakeTime,
          sleep_time: sleepTime,
          sleep_notes: sleepNotes,
        })
        updatedId = response.data._id
      }

      set({ dietCheck: !dietCheck, trackingId: updatedId })
    } catch (error) {
      console.error("Error updating diet tracking:", error)
    }
  },

  toggleExercise: async () => {
    const {
      exerciseCheck,
      trackingId,
      dietCheck,
      sugarCheck,
      mentalCheck,
      wakeTime,
      sleepTime,
      sleepNotes,
    } = get()
    try {
      let updatedId = trackingId
      const payload = { exercise_check: !exerciseCheck }

      if (trackingId) {
        await axios.put("/api/daily-trackings", { id: trackingId, ...payload })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: dietCheck,
          ...payload,
          no_sugar: sugarCheck,
          mental_strength_check: mentalCheck,
          wake_time: wakeTime,
          sleep_time: sleepTime,
          sleep_notes: sleepNotes,
        })
        updatedId = response.data._id
      }

      set({ exerciseCheck: !exerciseCheck, trackingId: updatedId })
    } catch (error) {
      console.error("Error updating exercise tracking:", error)
    }
  },

  toggleSugar: async () => {
    const {
      sugarCheck,
      trackingId,
      dietCheck,
      exerciseCheck,
      mentalCheck,
      wakeTime,
      sleepTime,
      sleepNotes,
    } = get()
    try {
      let updatedId = trackingId
      const payload = { no_sugar: !sugarCheck }

      if (trackingId) {
        await axios.put("/api/daily-trackings", { id: trackingId, ...payload })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: dietCheck,
          exercise_check: exerciseCheck,
          ...payload,
          mental_strength_check: mentalCheck,
          wake_time: wakeTime,
          sleep_time: sleepTime,
          sleep_notes: sleepNotes,
        })
        updatedId = response.data._id
      }

      set({ sugarCheck: !sugarCheck, trackingId: updatedId })
    } catch (error) {
      console.error("Error updating sugar tracking:", error)
    }
  },

  toggleMental: async () => {
    const {
      mentalCheck,
      trackingId,
      dietCheck,
      exerciseCheck,
      sugarCheck,
      wakeTime,
      sleepTime,
      sleepNotes,
    } = get()
    try {
      let updatedId = trackingId
      const payload = { mental_strength_check: !mentalCheck }

      if (trackingId) {
        await axios.put("/api/daily-trackings", { id: trackingId, ...payload })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: dietCheck,
          exercise_check: exerciseCheck,
          no_sugar: sugarCheck,
          ...payload,
          wake_time: wakeTime,
          sleep_time: sleepTime,
          sleep_notes: sleepNotes,
        })
        updatedId = response.data._id
      }

      set({ mentalCheck: !mentalCheck, trackingId: updatedId })
    } catch (error) {
      console.error("Error updating mental tracking:", error)
    }
  },

  updateSleepData: async (wakeTime, sleepTime, sleepNotes) => {
    const { trackingId, dietCheck, exerciseCheck, sugarCheck, mentalCheck } =
      get()
    try {
      let updatedId = trackingId
      const payload = {
        wake_time: wakeTime,
        sleep_time: sleepTime,
        sleep_notes: sleepNotes,
      }

      if (trackingId) {
        await axios.put("/api/daily-trackings", { id: trackingId, ...payload })
      } else {
        const response = await axios.post("/api/daily-trackings", {
          diet_check: dietCheck,
          exercise_check: exerciseCheck,
          no_sugar: sugarCheck,
          mental_strength_check: mentalCheck,
          ...payload,
        })
        updatedId = response.data._id
      }

      set({ wakeTime, sleepTime, sleepNotes, trackingId: updatedId })
    } catch (error) {
      console.error("Error updating sleep data:", error)
    }
  },
}))
