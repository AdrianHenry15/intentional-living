import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import axios from "axios"

type CustomGoal = {
  id: number
  name: string
  isComplete: boolean
  inputComplete: boolean
  synced?: boolean // Sync tracking flag
}

type CustomGoalState = {
  goals: CustomGoal[]
  addGoal: (name: string) => void
  toggleComplete: (id: number, userId: string) => void
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
        set((state) => {
          if (state.goals.length >= 2) {
            console.warn("Max custom goals reached.")
            return state // Prevent adding more than 2 goals
          }
          return {
            goals: [
              ...state.goals,
              {
                id: Date.now(), // Unique ID using timestamp
                name,
                isComplete: false,
                inputComplete: false,
                synced: false,
              },
            ],
          }
        }),

      toggleComplete: async (id, userId) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, isComplete: !goal.isComplete } : goal
          ),
        }))

        try {
          const goal = get().goals.find((g) => g.id === id)
          if (!goal) return

          const res = await axios.put("/api/goal-tracking", {
            goal_id: id,
            completed: goal.isComplete,
            days: [],
            user_id: userId, // Replace with actual user ID
          })

          if (res.data.success) {
            set((state) => ({
              goals: state.goals.map((g) =>
                g.id === id ? { ...g, synced: true } : g
              ),
            }))
          }
        } catch (error) {
          console.error("Error updating goal completion status:", error)
        }
      },

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

      fetchGoals: async () => {
        try {
          const res = await axios.get("/api/goal-tracking")
          if (res.data.success) {
            set({
              goals: res.data.data
                .slice(0, 2) // Ensure only two goals are loaded
                .map((goal: any) => ({
                  ...goal,
                  synced: true,
                })),
            })
          }
        } catch (error) {
          console.error("Error fetching goals:", error)
        }
      },

      syncGoals: async () => {
        const { goals } = get()

        const unsyncedGoals = goals.filter((goal) => !goal.synced)

        try {
          for (const goal of unsyncedGoals) {
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
