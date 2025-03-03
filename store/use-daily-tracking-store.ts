import { primaryGoals } from "@/lib/constants"
import { GoalType } from "@/lib/types"
import { create } from "zustand"

interface GoalStore {
  primaryGoals: GoalType[]
  customGoals: GoalType[]
  addCustomGoal: () => void
  markGoalComplete: (id: number) => void
  editCustomGoal: (id: number, newTitle: string) => void
}

export const useDailyTrackingStore = create<GoalStore>((set) => ({
  primaryGoals: primaryGoals,
  customGoals: [],

  addCustomGoal: () =>
    set((state) => {
      if (state.customGoals.length < 2) {
        const newGoal: GoalType = {
          id: Date.now(),
          title: "New Goal",
          completed_days: 0,
          isCustom: true,
        }

        return {
          customGoals: [...state.customGoals, newGoal],
        }
      }
      return {} // Ensure the return type is always Partial<GoalStore>
    }),

  markGoalComplete: (id) =>
    set((state) => {
      const updateGoal = (goal: GoalType) => {
        if (goal.id === id) {
          const updatedDays = Math.min(goal.completed_days + 1, 30) // Max 30 days in a month
          return { ...goal, completedDays: updatedDays }
        }
        return goal
      }

      return {
        primaryGoals: state.primaryGoals.map(updateGoal),
        customGoals: state.customGoals.map(updateGoal),
      }
    }),

  editCustomGoal: (id, newTitle) =>
    set((state) => ({
      customGoals: state.customGoals.map((goal) =>
        goal.id === id ? { ...goal, title: newTitle } : goal
      ),
    })),
}))
