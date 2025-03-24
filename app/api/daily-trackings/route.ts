import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { getAllDailyTrackings } from "@/sanity/lib/daily-trackings/getAll"

// GET: Fetch all daily trackings
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    const today = new Date().toISOString().split("T")[0]

    const tracking = await getAllDailyTrackings()

    return NextResponse.json(tracking, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch daily ratings" },
      { status: 500 }
    )
  }
}

// POST: Create a new daily tracking record
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    // if (!userId) {
    //   log("ERROR", "Unauthorized access attempt.")
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await req.json()

    // Validate required fields
    const requiredFields = [
      "diet_check",
      "exercise_check",
      "no_sugar",
      "mental_strength_check",
      "wake_time",
      "sleep_time",
    ]
    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return NextResponse.json(
          { error: `Invalid data, missing: ${field}` },
          { status: 400 }
        )
      }
    }

    // Prevent duplicate entries for today
    const today = new Date().toISOString().split("T")[0]
    const existingEntryQuery = groq`
      *[_type == "dailyTracking" && user_id._ref == $userId && date >= $todayStart && date < $tomorrow][0]
    `
    const params = {
      userId,
      todayStart: `${today}T00:00:00Z`,
      tomorrow: `${today}T23:59:59Z`,
    }
    const existingEntry = await client.fetch(existingEntryQuery, params)

    if (existingEntry) {
      return NextResponse.json(
        { error: "Daily tracking already exists for today" },
        { status: 409 }
      )
    }

    // Create new tracking entry
    const newEntry = {
      _type: "dailyTracking",
      user_id: { _type: "reference", _ref: userId },
      date: new Date().toISOString(),
      ...body,
      created_at: new Date().toISOString(),
    }

    const createdDoc = await client.create(newEntry)

    return NextResponse.json(createdDoc, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit daily tracking" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing daily tracking record
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth()
    // if (!userId) {
    //   log("ERROR", "Unauthorized access attempt.")
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await req.json()

    const today = new Date().toISOString().split("T")[0]
    const existingEntryQuery = groq`
      *[_type == "dailyTracking" && user_id._ref == $userId && date >= $todayStart && date < $tomorrow][0]
    `
    const params = {
      userId,
      todayStart: `${today}T00:00:00Z`,
      tomorrow: `${today}T23:59:59Z`,
    }
    let existingEntry = await client.fetch(existingEntryQuery, params)

    if (!existingEntry) {
      existingEntry = await client.create({
        _type: "dailyTracking",
        user_id: { _type: "reference", _ref: userId },
        date: new Date().toISOString(),
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    } else {
      existingEntry = await client
        .patch(existingEntry._id)
        .set({ ...body, updated_at: new Date().toISOString() })
        .commit()
    }

    return NextResponse.json(
      { success: true, data: existingEntry },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update daily tracking" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a daily tracking record
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    let trackingId = body.id

    if (!trackingId) {
      const today = new Date().toISOString().split("T")[0]
      const existingEntryQuery = groq`
        *[_type == "dailyTracking" && user_id._ref == $userId && date >= $todayStart && date < $tomorrow][0]
      `
      const params = {
        userId,
        todayStart: `${today}T00:00:00Z`,
        tomorrow: `${today}T23:59:59Z`,
      }
      const existingEntry = await client.fetch(existingEntryQuery, params)

      if (!existingEntry) {
        return NextResponse.json(
          { error: "No tracking entry found for today" },
          { status: 404 }
        )
      }

      trackingId = existingEntry._id
    }

    await client.delete(trackingId)

    return NextResponse.json(
      { success: true, message: "Daily tracking deleted" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete daily tracking" },
      { status: 500 }
    )
  }
}
