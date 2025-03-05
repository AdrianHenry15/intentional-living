import { create } from "zustand"

interface DailyTracking {
  id: string
  date: string
  diet_check: number
  exercise_check: number
  no_sugar: number
  mental_strength_check: number
}

interface DailyTrackingStore {
  dailyTracking: DailyTracking[]
  setDailyTracking: (data: DailyTracking[]) => void
}

export const useDailyTrackingStore = create<DailyTrackingStore>((set) => ({
  dailyTracking: [],
  setDailyTracking: (data) => set({ dailyTracking: data }),
}))
