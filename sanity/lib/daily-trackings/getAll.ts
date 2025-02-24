import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllDailyTrackings = async () => {
  const ALL_DAILY_TRACKINGS = defineQuery(`
    *[_type == "dailyTracking"] | order(date desc) {
      _id,
      date,
      user_id->{
        _id,
        name,
        email
      },
      diet_check,
      exercise_check,
      no_sugar,
      mental_strength_check,
      wake_time,
      sleep_time,
      sleep_notes,
      created_at,
      updated_at
    }
  `)

  try {
    const trackings = await sanityFetch({
      query: ALL_DAILY_TRACKINGS,
    })

    return trackings.data || []
  } catch (error) {
    console.error("Error fetching all daily trackings:", error)
    return []
  }
}
