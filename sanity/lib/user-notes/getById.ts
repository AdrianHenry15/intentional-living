import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getUserNotesById = async (userId: string) => {
  if (!userId) return []

  const USER_NOTES_BY_ID = defineQuery(`
    *[_type == "userNotes" && user_id._ref == $userId] | order(created_at desc) {
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
      query: USER_NOTES_BY_ID,
      params: { userId },
    })

    return userNotes.data || []
  } catch (error) {
    console.error("Error fetching user notes:", error)
    return []
  }
}
