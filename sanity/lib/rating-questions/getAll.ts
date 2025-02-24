import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllRatingQuestions = async () => {
  const ALL_RATING_QUESTIONS = defineQuery(`
    *[_type == "ratingQuestions"] | order(display_order asc) {
      _id,
      question_text,
      display_order,
      active,
      created_at
    }
  `)

  try {
    const questions = await sanityFetch({
      query: ALL_RATING_QUESTIONS,
    })

    return questions.data || []
  } catch (error) {
    console.error("Error fetching rating questions:", error)
    return []
  }
}
