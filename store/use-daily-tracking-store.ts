import { create } from "zustand"

// Defining the type for a custom goal
interface CustomGoal {
  isOpen: boolean
  name: string
  isComplete: boolean
  inputComplete: boolean
}

// Defining the state type for daily tracking
interface DailyTrackingState {
  goals: {
    diet: boolean
    exercise: boolean
    sugar: boolean
    mental: boolean
    custom1: CustomGoal
    custom2: CustomGoal
  }
  setGoalCompletion: (goal: string) => void
  toggleGoalOpen: (goal: "custom1" | "custom2") => void
  handleCustomInput: (goal: "custom1" | "custom2", value: string) => void
  setInputComplete: (goal: "custom1" | "custom2") => void
}

// Create the Zustand store
export const useDailyTrackingStore = create<DailyTrackingState>((set) => ({
  goals: {
    diet: false,
    exercise: false,
    sugar: false,
    mental: false,
    custom1: {
      isOpen: false,
      name: "",
      isComplete: false,
      inputComplete: false,
    },
    custom2: {
      isOpen: false,
      name: "",
      isComplete: false,
      inputComplete: false,
    },
  },
  setGoalCompletion: (goal: string) => {
    set((state) => ({
      goals: {
        ...state.goals,
        [goal]: !state.goals[goal as keyof typeof state.goals], // Type assertion
      },
    }))
  },
  toggleGoalOpen: (goal: "custom1" | "custom2") => {
    set((state) => ({
      goals: {
        ...state.goals,
        [goal]: { ...state.goals[goal], isOpen: !state.goals[goal].isOpen },
      },
    }))
  },
  handleCustomInput: (goal: "custom1" | "custom2", value: string) => {
    set((state) => ({
      goals: {
        ...state.goals,
        [goal]: { ...state.goals[goal], name: value },
      },
    }))
  },
  setInputComplete: (goal: "custom1" | "custom2") => {
    set((state) => ({
      goals: {
        ...state.goals,
        [goal]: {
          ...state.goals[goal],
          inputComplete: !state.goals[goal].inputComplete,
        },
      },
    }))
  },
}))
