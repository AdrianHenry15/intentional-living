import { create } from "zustand"

type QuizState = {
  hasCompletedQuiz: boolean
  markQuizCompleted: () => void
  resetQuizCompletion: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  hasCompletedQuiz: false, // Default to false
  markQuizCompleted: () => set({ hasCompletedQuiz: true }),
  resetQuizCompletion: () => set({ hasCompletedQuiz: false }),
}))
