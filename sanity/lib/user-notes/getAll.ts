import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllUserNotes = async () => {
  const ALL_USER_NOTES = defineQuery(`
    *[_type == "userNotes"] | order(created_at desc) {
      _id,
      user_id->{first_name, last_name},
      date,
      content,
      created_at,
      updated_at
    }
  `)

  try {
    const userNotes = await sanityFetch({
      query: ALL_USER_NOTES,
    })

    return userNotes.data || []
  } catch (error) {
    console.error("Error fetching user notes:", error)
    return []
  }
}
