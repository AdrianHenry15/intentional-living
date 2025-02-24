import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllUserPreferences = async () => {
  const ALL_USER_PREFERENCES = defineQuery(`
    *[_type == "userPreferences"] | order(created_at desc) {
      _id,
      user_id->{first_name, last_name},
      theme,
      email_notifications,
      push_notifications,
      weekly_summary_enabled,
      created_at,
      updated_at
    }
  `)

  try {
    const userPreferences = await sanityFetch({
      query: ALL_USER_PREFERENCES,
    })

    return userPreferences.data || []
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return []
  }
}
