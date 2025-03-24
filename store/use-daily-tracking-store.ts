import { create } from "zustand"
import axios from "axios"
import { toast } from "react-hot-toast"

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
      if (response.status === 200 && response.data.length > 0) {
        const data = response.data[0]
        set({
          dietCheck: data.diet_check,
          exerciseCheck: data.exercise_check,
          sugarCheck: data.no_sugar,
          mentalCheck: data.mental_strength_check,
          wakeTime: data.wake_time || null,
          sleepTime: data.sleep_time || null,
          sleepNotes: data.sleep_notes || "",
          trackingId: data._id,
        })
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error)
    }
  },

  toggleDiet: async () => {
    await toggleTracking("dietCheck", "diet_check")
  },

  toggleExercise: async () => {
    await toggleTracking("exerciseCheck", "exercise_check")
  },

  toggleSugar: async () => {
    await toggleTracking("sugarCheck", "no_sugar")
  },

  toggleMental: async () => {
    await toggleTracking("mentalCheck", "mental_strength_check")
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
      checkCompletion()
    } catch (error) {
      console.error("Error updating sleep data:", error)
    }
  },
}))

// Helper function to toggle tracking fields
const toggleTracking = async (
  stateKey: keyof DailyTrackingStore,
  apiField: string
) => {
  const store = useDailyTrackingStore.getState()
  const currentValue = store[stateKey]
  const {
    trackingId,
    dietCheck,
    exerciseCheck,
    sugarCheck,
    mentalCheck,
    wakeTime,
    sleepTime,
    sleepNotes,
  } = store

  try {
    let updatedId = trackingId
    const payload = { [apiField]: !currentValue }

    if (trackingId) {
      await axios.put("/api/daily-trackings", { id: trackingId, ...payload })
    } else {
      const response = await axios.post("/api/daily-trackings", {
        diet_check: dietCheck,
        exercise_check: exerciseCheck,
        no_sugar: sugarCheck,
        mental_strength_check: mentalCheck,
        wake_time: wakeTime,
        sleep_time: sleepTime,
        sleep_notes: sleepNotes,
        ...payload,
      })
      updatedId = response.data._id
    }

    useDailyTrackingStore.setState({
      [stateKey]: !currentValue,
      trackingId: updatedId,
    })
    checkCompletion()
  } catch (error) {
    console.error(`Error updating ${stateKey}:`, error)
  }
}

// Function to check if all tracking values are completed
const checkCompletion = () => {
  const {
    dietCheck,
    exerciseCheck,
    sugarCheck,
    mentalCheck,
    wakeTime,
    sleepTime,
  } = useDailyTrackingStore.getState()
  if (
    dietCheck &&
    exerciseCheck &&
    sugarCheck &&
    mentalCheck &&
    wakeTime &&
    sleepTime
  ) {
    toast.success("Great job! You've completed your daily tracking.")
  }
}
