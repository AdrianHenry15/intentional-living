import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllDailyRatings = async () => {
  const ALL_DAILY_RATINGS = defineQuery(`
    *[_type == "dailyRatings"] | order(date desc) {
      _id,
      date,
      user_id->{
        _id,
        name,
        email
      },
      question_1_rating,
      question_2_rating,
      question_3_rating,
      question_4_rating,
      question_5_rating,
      question_6_rating,
      created_at
    }
  `)

  try {
    const ratings = await sanityFetch({
      query: ALL_DAILY_RATINGS,
    })

    return ratings.data || []
  } catch (error) {
    console.error("Error fetching all daily ratings:", error)
    return []
  }
}
