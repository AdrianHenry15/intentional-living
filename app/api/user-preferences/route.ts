import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const {
      theme,
      email_notifications,
      push_notifications,
      weekly_summary_enabled,
    } = await req.json()

    if (!theme) {
      return NextResponse.json({ error: "Theme is required" }, { status: 400 })
    }

    // Find existing preference
    const existingPreferences = await client.fetch(
      `*[_type == "userPreferences" && user_id._ref == $userId][0]`,
      { userId }
    )

    if (!existingPreferences) {
      return NextResponse.json(
        { error: "Preferences not found" },
        { status: 404 }
      )
    }

    // Update user preferences in Sanity
    const updatedPreferences = await client
      .patch(existingPreferences._id)
      .set({
        theme,
        email_notifications,
        push_notifications,
        weekly_summary_enabled,
        updated_at: new Date().toISOString(),
      })
      .commit()

    return NextResponse.json({
      message: "Preferences updated successfully",
      data: updatedPreferences,
    })
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
