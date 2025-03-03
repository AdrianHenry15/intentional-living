import { client } from "@/sanity/lib/client"
import { getAllGoalTracking } from "@/sanity/lib/goal-tracking/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all goal tracking records
export async function GET(req: NextRequest) {
  try {
    const goalTracking = await getAllGoalTracking()
    return NextResponse.json(
      { success: true, data: goalTracking },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching goal tracking records:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch goal tracking records" },
      { status: 500 }
    )
  }
}

// POST: Create a new goal tracking record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { goal_id, completed, days, user_id } = body

    if (!goal_id || completed === undefined || !days || !user_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Goal ID, completed status, days, and user ID are required",
        },
        { status: 400 }
      )
    }

    const newGoalTracking = {
      _type: "goalTracking",
      goal_id,
      completed,
      days,
      user_id: { _type: "reference", _ref: user_id },
      created_at: new Date().toISOString(),
    }

    const createdGoalTracking = await client.create(newGoalTracking)
    return NextResponse.json(
      { success: true, data: createdGoalTracking },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating goal tracking record:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create goal tracking record" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing goal tracking record
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, completed, days } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Goal tracking ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(completed !== undefined && { completed }),
      ...(days !== undefined && { days }),
    }

    const updatedGoalTracking = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedGoalTracking },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating goal tracking record:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update goal tracking record" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a goal tracking record
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Goal tracking ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "Goal tracking record deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting goal tracking record:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete goal tracking record" },
      { status: 500 }
    )
  }
}
