import { getBaseUrl } from "@/lib/utils/get-base-url"
import { auth } from "@clerk/nextjs/server"

export const checkDailyRating = async () => {
  try {
    const baseUrl = getBaseUrl()
    const { getToken } = await auth();
    const token = await getToken();
    const response = await fetch(`${baseUrl}/api/daily-ratings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const {hasSubmitted} = await response.json()

    return hasSubmitted;

  } catch (error) {
    console.error("Error checking daily rating:", error)
  }
}
