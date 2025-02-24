import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllFeedback = async () => {
  const ALL_FEEDBACK = defineQuery(`
    *[_type == "feedback"] | order(date desc) {
      _id,
      content,
      date,
      user_id->{
        _id,
        name,
        email
      },
      created_at
    }
  `)

  try {
    const feedback = await sanityFetch({
      query: ALL_FEEDBACK,
    })

    return feedback.data || []
  } catch (error) {
    console.error("Error fetching all feedback:", error)
    return []
  }
}
