import { getBaseUrl } from "@/lib/utils/get-base-url"
import { DailyRatings } from "@/sanity.types"

export const checkDailyRating = async (userId: string) => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/daily-ratings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to fetch daily ratings: ${errorText}`)
    }

    const allRatings = await response.json()

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Check if the user has already submitted a rating for today
    return allRatings.some(
      (rating: DailyRatings) =>
        rating.user_id?._ref === userId && rating.date!.split("T")[0] === today
    )
  } catch (error) {
    console.error("Error checking daily rating:", error)
    return false
  }
}
