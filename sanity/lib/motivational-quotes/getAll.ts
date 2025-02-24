import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllMotivationalQuotes = async () => {
  const ALL_MOTIVATIONAL_QUOTES = defineQuery(`
    *[_type == "motivationalQuotes"] {
      _id,
      quote_text,
      author_name
    }
  `)

  try {
    const quotes = await sanityFetch({
      query: ALL_MOTIVATIONAL_QUOTES,
    })

    return quotes.data || []
  } catch (error) {
    console.error("Error fetching motivational quotes:", error)
    return []
  }
}
