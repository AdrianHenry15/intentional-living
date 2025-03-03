import { client } from "@/sanity/lib/client"
import { getAllFeedback } from "@/sanity/lib/feedback/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all feedback
export async function GET(req: NextRequest) {
  try {
    const feedback = await getAllFeedback()
    return NextResponse.json({ success: true, data: feedback }, { status: 200 })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch feedback" },
      { status: 500 }
    )
  }
}

// POST: Create new feedback
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, content, date } = body

    if (!user_id || !content || !date) {
      return NextResponse.json(
        { success: false, error: "User ID, content, and date are required" },
        { status: 400 }
      )
    }

    const newFeedback = {
      _type: "feedback",
      user_id: { _type: "reference", _ref: user_id },
      content,
      date,
      created_at: new Date().toISOString(),
    }

    const createdFeedback = await client.create(newFeedback)
    return NextResponse.json(
      { success: true, data: createdFeedback },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating feedback:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create feedback" },
      { status: 500 }
    )
  }
}

// PUT: Update existing feedback
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, content, date } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(content !== undefined && { content }),
      ...(date !== undefined && { date }),
    }

    const updatedFeedback = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedFeedback },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating feedback:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update feedback" },
      { status: 500 }
    )
  }
}

// DELETE: Remove feedback
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "Feedback deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting feedback:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete feedback" },
      { status: 500 }
    )
  }
}
