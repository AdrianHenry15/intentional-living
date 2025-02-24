import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const formData = await req.formData()
    const theme = formData.get("theme")
    const email_notifications = formData.get("email_notifications") === "true"
    const push_notifications = formData.get("push_notifications") === "true"
    const weekly_summary_enabled =
      formData.get("weekly_summary_enabled") === "true"

    if (!theme) {
      return NextResponse.json({ error: "Theme is required" }, { status: 400 })
    }

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
