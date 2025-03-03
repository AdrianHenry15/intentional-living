import { create } from "zustand"

interface DailyTracking {
  id: string
  userId: string
  date: string
  dietCheck: boolean
  exerciseCheck: boolean
  noSugar: boolean
  mentalStrengthCheck: boolean
  wakeTime: string
  sleepTime: string
  sleepNotes?: string
  createdAt: string
  updatedAt: string
}

interface DailyTrackingStore {
  dailyTracking: DailyTracking | null
  loading: boolean
  error: string | null
  fetchDailyTracking: (userId: string) => Promise<void>
  updateDailyTracking: (updates: Partial<DailyTracking>) => void
}

export const useDailyTrackingStore = create<DailyTrackingStore>((set) => ({
  dailyTracking: null,
  loading: false,
  error: null,

  fetchDailyTracking: async (userId) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/daily-tracking?userId=${userId}`)
      const data = await response.json()

      set({ dailyTracking: data, loading: false })
    } catch (error) {
      console.error("Error fetching daily tracking:", error)
      set({ error: "Failed to load tracking data.", loading: false })
    }
  },

  updateDailyTracking: (updates) => {
    set((state) => ({
      dailyTracking: state.dailyTracking
        ? { ...state.dailyTracking, ...updates }
        : null,
    }))
  },
}))
