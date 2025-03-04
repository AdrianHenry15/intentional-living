import { auth } from "@clerk/nextjs/server"

export const getUserSignupDate = async (): Promise<string | null> => {
  const userId = (await auth()).userId

  if (!userId) return null // No authenticated user

  const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  })

  if (!response.ok) return null

  const user = await response.json()
  return user.created_at // This is an ISO string (e.g., "2024-02-15T12:00:00Z")
}
