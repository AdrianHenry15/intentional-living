import { client } from "@/sanity/lib/client"
import { clerkClient } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { Webhook } from "svix"

// Define the types manually for Clerk events
interface ClerkWebhookEvent {
  type: string
  data: {
    id: string
    first_name: string
    last_name: string
    email_addresses: { email_address: string }[]
    username: string
  }
}

export async function POST(req: NextRequest) {
  const headers = req.headers
  const payload = await req.text() // Read raw body for signature verification
  const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET as string
  const ClerkClient = await clerkClient()

  // Convert headers to a plain object (Record<string, string>) for Svix verification
  const headersObject: Record<string, string> = {}
  headers.forEach((value, key) => {
    headersObject[key] = value
  })

  try {
    // Verify webhook signature
    const wh = new Webhook(clerkWebhookSecret)
    const event = wh.verify(payload, headersObject)

    // Typecast to our custom ClerkWebhookEvent
    const clerkEvent = event as ClerkWebhookEvent

    const { type, data } = clerkEvent
    const clerkUserId = data.id // Clerk user ID
    const emails =
      data.email_addresses?.map(
        (email: { email_address: string }) => email.email_address
      ) ?? []

    if (type === "user.created") {
      // Add user to Sanity
      const sanityUser = await client.createIfNotExists({
        _id: clerkUserId, // Explicitly add the _id field
        _type: "user",
        userId: clerkUserId,
        first_name: data.first_name ?? "",
        last_name: data.last_name ?? "",
        email: emails,
        username: data.username ?? "",
        books: [],
        prompts: [],
        daily_prompt_count: 0,
      })

      // Store the Sanity user ID inside Clerk's metadata
      await ClerkClient.users.updateUserMetadata(clerkUserId, {
        publicMetadata: { sanityUserId: sanityUser._id },
      })
    } else if (type === "user.updated") {
      // Update user in Sanity
      await client
        .patch(clerkUserId)
        .set({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email_addresses?.[0]?.email_address ?? "",
          username: data.username ?? "",
        })
        .commit()
    } else if (type === "user.deleted") {
      // Delete user from Sanity
      await client.delete(clerkUserId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Webhook error", { status: 400 })
  }
}
