import { client } from "@/sanity/lib/client"
import { getAllDailyTrackings } from "@/sanity/lib/daily-trackings/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all daily trackings
export async function GET(req: NextRequest) {
  try {
    const trackings = await getAllDailyTrackings()
    return NextResponse.json(
      { success: true, data: trackings },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching daily trackings:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch daily trackings" },
      { status: 500 }
    )
  }
}

// POST: Create a new daily tracking record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      user_id,
      date,
      diet_check,
      exercise_check,
      no_sugar,
      mental_strength_check,
      wake_time,
      sleep_time,
      sleep_notes,
    } = body

    if (!user_id || !date) {
      return NextResponse.json(
        { success: false, error: "User ID and date are required" },
        { status: 400 }
      )
    }

    const newTracking = {
      _type: "dailyTracking",
      user_id: { _type: "reference", _ref: user_id },
      date,
      diet_check: diet_check || false,
      exercise_check: exercise_check || false,
      no_sugar: no_sugar || false,
      mental_strength_check: mental_strength_check || false,
      wake_time: wake_time || null,
      sleep_time: sleep_time || null,
      sleep_notes: sleep_notes || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const createdTracking = await client.create(newTracking)
    return NextResponse.json(
      { success: true, data: createdTracking },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating daily tracking:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create daily tracking" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing daily tracking record
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      diet_check,
      exercise_check,
      no_sugar,
      mental_strength_check,
      wake_time,
      sleep_time,
      sleep_notes,
    } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Tracking ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(diet_check !== undefined && { diet_check }),
      ...(exercise_check !== undefined && { exercise_check }),
      ...(no_sugar !== undefined && { no_sugar }),
      ...(mental_strength_check !== undefined && { mental_strength_check }),
      ...(wake_time !== undefined && { wake_time }),
      ...(sleep_time !== undefined && { sleep_time }),
      ...(sleep_notes !== undefined && { sleep_notes }),
      updated_at: new Date().toISOString(),
    }

    const updatedTracking = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedTracking },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating daily tracking:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update daily tracking" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a daily tracking record
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Tracking ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "Daily tracking deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting daily tracking:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete daily tracking" },
      { status: 500 }
    )
  }
}
