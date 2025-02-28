/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"
import axios from "axios"
import { DailyRatings } from "@/sanity.types"

interface DailyRatingsStore {
  ratings: DailyRatings | null
  loading: boolean
  error: string | null
  fetchRatings: (userId: string, date: string) => Promise<void>
  submitRatings: (ratings: DailyRatings) => Promise<void>
}

export const useDailyRatingsStore = create<DailyRatingsStore>((set) => ({
  ratings: null,
  loading: false,
  error: null,

  fetchRatings: async (userId, date) => {
    try {
      set({ loading: true, error: null })
      const response = await axios.get(
        `/api/daily-ratings?userId=${userId}&date=${date}`
      )
      set({ ratings: response.data, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  submitRatings: async (ratings) => {
    try {
      set({ loading: true, error: null })
      await axios.post("/api/daily-ratings", ratings)
      set({ ratings, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },
}))
