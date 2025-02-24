import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllGoalTracking = async () => {
  const ALL_GOAL_TRACKING = defineQuery(`
    *[_type == "goalTracking"] | order(created_at desc) {
      _id,
      goal_id,
      completed,
      days,
      user_id->{
        _id,
        name,
        email
      },
      created_at
    }
  `)

  try {
    const goalTracking = await sanityFetch({
      query: ALL_GOAL_TRACKING,
    })

    return goalTracking.data || []
  } catch (error) {
    console.error("Error fetching all goal tracking records:", error)
    return []
  }
}
