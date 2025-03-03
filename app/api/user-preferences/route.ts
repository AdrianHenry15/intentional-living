import { client } from "@/sanity/lib/client"
import { getAllUserPreferences } from "@/sanity/lib/user-preferences/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all user preferences
export async function GET(req: NextRequest) {
  try {
    const preferences = await getAllUserPreferences()
    return NextResponse.json(
      { success: true, data: preferences },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch user preferences" },
      { status: 500 }
    )
  }
}

// POST: Create new user preferences
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      user_id,
      theme,
      email_notifications,
      push_notifications,
      weekly_summary_enabled,
    } = body

    if (!user_id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      )
    }

    const newPreferences = {
      _type: "userPreferences",
      user_id: { _ref: user_id, _type: "reference" },
      theme: theme || "light",
      email_notifications: email_notifications ?? true,
      push_notifications: push_notifications ?? true,
      weekly_summary_enabled: weekly_summary_enabled ?? false,
    }

    const createdPreferences = await client.create(newPreferences)
    return NextResponse.json(
      { success: true, data: createdPreferences },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user preferences:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create user preferences" },
      { status: 500 }
    )
  }
}

// PUT: Update existing user preferences
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      theme,
      email_notifications,
      push_notifications,
      weekly_summary_enabled,
    } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User preferences ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(theme && { theme }),
      ...(email_notifications !== undefined && { email_notifications }),
      ...(push_notifications !== undefined && { push_notifications }),
      ...(weekly_summary_enabled !== undefined && { weekly_summary_enabled }),
    }

    const updatedPreferences = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedPreferences },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update user preferences" },
      { status: 500 }
    )
  }
}

// DELETE: Remove user preferences
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User preferences ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "User preferences deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting user preferences:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete user preferences" },
      { status: 500 }
    )
  }
}
