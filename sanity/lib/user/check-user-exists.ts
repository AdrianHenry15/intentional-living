import { client } from "@/sanity/lib/client"

export async function checkUserExists(userId: string) {
  const user = await client.fetch(`*[_type == "user" && _id == $userId][0]`, {
    userId,
  })
  console.log("Sanity User:", user)
}
