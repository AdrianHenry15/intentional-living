import { NextRequest, NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"
import { getAllDailyTrackings } from "@/sanity/lib/daily-trackings/getAll"

// **GET - Fetch User's Daily Tracking Entries**
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    // Fetch all tracking data from Sanity
    const trackings = await getAllDailyTrackings()

    // Filter tracking data for this specific user
    const userTracking = trackings.filter(
      (track) => track.user_id?._id === userId
    )

    return NextResponse.json(userTracking, { status: 200 })
  } catch (error) {
    console.error("Error fetching tracking data:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// **POST - Create a New Tracking Entry for a User**
export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const today = new Date().toISOString().split("T")[0]

    // Check if an entry for today exists
    const query = `*[_type == "dailyTracking" && user_id._ref == $userId && date == $today][0]`
    const existingEntry = await client.fetch(query, { userId, today })

    if (existingEntry) {
      return NextResponse.json(
        { error: "Entry for today already exists", tracking: existingEntry },
        { status: 409 }
      )
    }

    // Create new tracking entry
    const newTracking = {
      _type: "dailyTracking",
      user_id: { _type: "reference", _ref: userId },
      date: today,
      diet_check: false,
      exercise_check: false,
      no_sugar: false,
      mental_strength_check: false,
      wake_time: null,
      sleep_time: null,
      sleep_notes: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const response = await client.create(newTracking)

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error creating daily tracking:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// **PUT - Update an Existing Tracking Entry**
export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { trackingId, updates } = await req.json()
    if (!trackingId || !updates) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const response = await client.patch(trackingId).set(updates).commit()

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Error updating daily tracking:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
