import { create } from "zustand"

type CustomGoal = {
  id: number
  name: string
  isComplete: boolean
  inputComplete: boolean
}

type CustomGoalState = {
  goals: CustomGoal[]
  addGoal: (name: string) => void
  toggleComplete: (id: number) => void
  toggleInputComplete: (id: number) => void
  deleteGoal: (id: number) => void
}

export const useCustomGoalStore = create<CustomGoalState>((set) => ({
  goals: [],
  addGoal: (name) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          id: state.goals.length + 1,
          name,
          isComplete: false,
          inputComplete: false,
        },
      ],
    })),
  toggleComplete: (id) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, isComplete: !goal.isComplete } : goal
      ),
    })),
  toggleInputComplete: (id) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, inputComplete: !goal.inputComplete } : goal
      ),
    })),
  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    })),
}))
