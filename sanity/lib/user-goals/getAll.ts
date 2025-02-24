import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllUserGoals = async () => {
  const ALL_USER_GOALS = defineQuery(`
    *[_type == "userGoals"] | order(created_at desc) {
      _id,
      user_id->{first_name, last_name},
      goal_name,
      active,
      count,
      created_at,
      updated_at
    }
  `)

  try {
    const userGoals = await sanityFetch({
      query: ALL_USER_GOALS,
    })

    return userGoals.data || []
  } catch (error) {
    console.error("Error fetching user goals:", error)
    return []
  }
}
