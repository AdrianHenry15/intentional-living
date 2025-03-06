import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getUserById = async (userId: string) => {
  const USER_BY_ID = defineQuery(`
    *[_type == "user" && _id == $userId] {
      _id,
      first_name,
      last_name,
      phone,
      phone_verified,
      notification_time,
      timezone,
      profile_image_url,
      streak_count,
      last_streak_date,
      created_at,
      updated_at
    }
  `)

  try {
    const response = await sanityFetch({
      query: USER_BY_ID,
      params: { userId }, // pass userId as a parameter to the query
    })

    // Return the first matching user (should only be one)
    return response.data?.[0] || null
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}
