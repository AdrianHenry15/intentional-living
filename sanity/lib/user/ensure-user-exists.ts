import { client } from "../client"

export async function ensureUserExists(userId: string) {
  const userExists = await client.fetch(
    `*[_type == "user" && _id == $userId][0]`,
    { userId }
  )

  if (!userExists) {
    await client.createIfNotExists({
      _id: userId, // Ensure this matches the reference in userNotes
      _type: "user",
    })
  }
}
