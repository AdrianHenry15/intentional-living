export type NavMenuType = {
  title: string
  link: string
}

export type GoalType = {
  id: number
  title: string
  completed_days: number
  isCustom?: boolean
}

export interface DailyTracking {
  date: string // ISO string (e.g., "2025-03-01T12:00:00Z")
  diet_check: boolean
  exercise_check: boolean
  no_sugar: boolean
  mental_strength_check: boolean
}

export interface CheckCounts {
  diet_check: number
  exercise_check: number
  no_sugar: number
  mental_strength_check: number
}

export interface ClerkUser {
  id: string
  created_at: string // ISO date string from Clerk (e.g., "2024-02-15T12:00:00Z")
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}
