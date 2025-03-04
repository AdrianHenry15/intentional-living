import { CheckCounts, DailyTracking } from "../types"
import { getUserSignupDate } from "./get-user-signup-date"

export const calculateMonthlyCheckCounts = async (
  dailyTrackingData: DailyTracking[]
): Promise<CheckCounts | null> => {
  const userSignupDate = await getUserSignupDate()
  if (!userSignupDate) return null

  const currentDate = new Date()
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const userSignup = new Date(userSignupDate)

  // Use the later of start of month or user signup date
  const calculationStartDate =
    userSignup > startOfMonth ? userSignup : startOfMonth

  const counts: CheckCounts = {
    diet_check: 0,
    exercise_check: 0,
    no_sugar: 0,
    mental_strength_check: 0,
  }

  dailyTrackingData.forEach((entry) => {
    const entryDate = new Date(entry.date)
    if (entryDate >= calculationStartDate && entryDate <= currentDate) {
      if (entry.diet_check) counts.diet_check++
      if (entry.exercise_check) counts.exercise_check++
      if (entry.no_sugar) counts.no_sugar++
      if (entry.mental_strength_check) counts.mental_strength_check++
    }
  })

  return counts
}
