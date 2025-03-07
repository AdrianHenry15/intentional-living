import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns"

interface WeekState {
  currentWeekStart: Date
  days: { day: string; date: string; dateObj: Date }[]
  currentDay: string
  setCurrentDay: (day: string) => void
  nextWeek: () => void
  prevWeek: () => void
  resetWeek: () => void
}

const getWeekDays = (startDate: Date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return daysOfWeek.map((day, index) => {
    const dateObj = addDays(startDate, index)
    return { day, date: format(dateObj, "d"), dateObj }
  })
}

export const useCalendarStore = create<WeekState>()(
  persist(
    (set) => {
      const today = new Date()
      const weekStart = startOfWeek(today, { weekStartsOn: 0 })

      return {
        currentWeekStart: weekStart,
        days: getWeekDays(weekStart),
        currentDay: format(today, "EEEE"), // e.g., "Monday"
        setCurrentDay: (day) => set({ currentDay: day }),
        nextWeek: () =>
          set((state) => {
            const newStart = addWeeks(state.currentWeekStart, 1)
            return { currentWeekStart: newStart, days: getWeekDays(newStart) }
          }),
        prevWeek: () =>
          set((state) => {
            const newStart = subWeeks(state.currentWeekStart, 1)
            return { currentWeekStart: newStart, days: getWeekDays(newStart) }
          }),
        resetWeek: () =>
          set(() => {
            const todayStart = startOfWeek(new Date(), { weekStartsOn: 0 })
            return {
              currentWeekStart: todayStart,
              days: getWeekDays(todayStart),
              currentDay: format(new Date(), "EEEE"),
            }
          }),
      }
    },
    {
      name: "calendar-store", // Key for localStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
