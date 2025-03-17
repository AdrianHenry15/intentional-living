import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { getAllDailyTrackings } from "@/sanity/lib/daily-trackings/getAll"

// GET: Fetch all daily trackings
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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
      return NextResponse.json({ hasSubmitted: true }, { status: 409 })
    }

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
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("User ID: ", userId)

    const body = await req.json()
    const {
      diet_check,
      exercise_check,
      no_sugar,
      mental_strength_check,
      wake_time,
      sleep_time,
      sleep_notes,
    } = body

    console.log("Body: ", JSON.stringify(body))

    // Ensure all required fields are present
    if (
      diet_check === undefined ||
      exercise_check === undefined ||
      no_sugar === undefined ||
      mental_strength_check === undefined ||
      wake_time === undefined ||
      sleep_time === undefined
    ) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Check if today's entry already exists
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

    const newEntry = {
      _type: "dailyTracking",
      user_id: { _type: "reference", _ref: userId },
      date: new Date().toISOString(),

      diet_check: diet_check || false,
      exercise_check: exercise_check || false,
      no_sugar: no_sugar || false,
      mental_strength_check: mental_strength_check || false,
      wake_time: wake_time || null,
      sleep_time: sleep_time || null,
      sleep_notes: sleep_notes || "",
      created_at: new Date().toISOString(),
    }

    const createdDoc = await client.create(newEntry)

    return NextResponse.json(createdDoc, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to submit daily rating" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing daily tracking record
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      diet_check,
      exercise_check,
      no_sugar,
      mental_strength_check,
      wake_time,
      sleep_time,
      sleep_notes,
    } = body

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Check if today's entry already exists
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
      // If no tracking entry exists, create one
      const newEntry = {
        _type: "dailyTracking",
        user_id: { _type: "reference", _ref: userId },
        date: new Date().toISOString(),
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

      existingEntry = await client.create(newEntry)
    } else {
      // If an entry exists, update it
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

      existingEntry = await client
        .patch(existingEntry._id)
        .set(updates)
        .commit()
    }

    return NextResponse.json(
      { success: true, data: existingEntry },
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
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { id } = body

    let trackingId = id // New variable to hold the ID

    if (!trackingId) {
      // Find today's tracking entry if no id is provided
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

      trackingId = existingEntry._id // Assign the found entry's ID
    }

    await client.delete(trackingId)
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
