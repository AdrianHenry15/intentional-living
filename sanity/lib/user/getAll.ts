import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllUsers = async () => {
  const ALL_USERS = defineQuery(`
    *[_type == "user"] | order(created_at desc) {
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
    const users = await sanityFetch({
      query: ALL_USERS,
    })

    return users.data || []
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}
