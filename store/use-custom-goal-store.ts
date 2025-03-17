import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import axios from "axios"

type CustomGoal = {
  id: number
  name: string
  isComplete: boolean
  inputComplete: boolean
  synced?: boolean // New flag for tracking sync state
}

type CustomGoalState = {
  goals: CustomGoal[]
  addGoal: (name: string) => void
  toggleComplete: (id: number) => void
  toggleInputComplete: (id: number) => void
  deleteGoal: (id: number) => void
  syncGoals: () => Promise<void>
  fetchGoals: () => Promise<void>
}

export const useCustomGoalStore = create<CustomGoalState>()(
  persist(
    (set, get) => ({
      goals: [],

      addGoal: (name) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              id: Date.now(), // Use timestamp for unique ID
              name,
              isComplete: false,
              inputComplete: false,
              synced: false,
            },
          ],
        })),

      toggleComplete: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, isComplete: !goal.isComplete, synced: false }
              : goal
          ),
        })),

      toggleInputComplete: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, inputComplete: !goal.inputComplete, synced: false }
              : goal
          ),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),

      // Fetch goals from API
      fetchGoals: async () => {
        try {
          const res = await axios.get("/api/goal-tracking")
          if (res.data.success) {
            set({
              goals: res.data.data.map((goal: any) => ({
                ...goal,
                synced: true,
              })),
            })
          }
        } catch (error) {
          console.error("Error fetching goals:", error)
        }
      },

      // Sync local goals with API
      syncGoals: async () => {
        const { goals } = get()

        // Filter goals for syncing
        const unsyncedGoals = goals.filter((goal) => !goal.synced)

        try {
          for (const goal of unsyncedGoals) {
            if (!goal.id) continue

            // Create new goal if it doesn't exist in API
            const res = await axios.post("/api/goal-tracking", {
              goal_id: goal.id,
              completed: goal.isComplete,
              days: [],
              user_id: "user-id-placeholder", // Replace with actual user ID
            })

            if (res.data.success) {
              set((state) => ({
                goals: state.goals.map((g) =>
                  g.id === goal.id ? { ...g, synced: true } : g
                ),
              }))
            }
          }
        } catch (error) {
          console.error("Error syncing goals:", error)
        }
      },
    }),
    {
      name: "custom-goal-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
