import { client } from "@/sanity/lib/client"
import { getAllUserGoals } from "@/sanity/lib/user-goals/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all user goals
export async function GET(req: NextRequest) {
  try {
    const userGoals = await getAllUserGoals()
    return NextResponse.json(
      { success: true, data: userGoals },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching user goals:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch user goals" },
      { status: 500 }
    )
  }
}

// POST: Create a new user goal
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, goal_name, active, count } = body

    if (!user_id || !goal_name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const newGoal = {
      _type: "userGoals",
      user_id: { _type: "reference", _ref: user_id },
      goal_name,
      active: active ?? true,
      count: count ?? 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const createdGoal = await client.create(newGoal)
    return NextResponse.json(
      { success: true, data: createdGoal },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user goal:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create user goal" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing user goal
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, goal_name, active, count } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Goal ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(goal_name && { goal_name }),
      ...(active !== undefined && { active }),
      ...(count !== undefined && { count }),
      updated_at: new Date().toISOString(),
    }

    const updatedGoal = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedGoal },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating user goal:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update user goal" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a user goal
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Goal ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "User goal deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting user goal:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete user goal" },
      { status: 500 }
    )
  }
}
