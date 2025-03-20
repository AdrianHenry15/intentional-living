import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/sanity/lib/client"
import { getUserNotesById } from "@/sanity/lib/user-notes/getById"
import { ensureUserExists } from "@/sanity/lib/user/ensure-user-exists"

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Use the existing Sanity function
    const userNotes = await getUserNotesById(userId)

    return NextResponse.json(userNotes, { status: 200 })
  } catch (error) {
    console.error("Error fetching user notes:", error)
    return NextResponse.json(
      { error: "Failed to fetch user notes" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Ensure user exists in Sanity
    await ensureUserExists(userId)

    const body = await req.json()
    const { content, date } = body

    if (!content || content.length < 5 || content.length > 2000) {
      return NextResponse.json(
        { error: "Invalid note content" },
        { status: 400 }
      )
    }

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 })
    }

    const newNote = {
      _type: "userNotes",
      user_id: { _type: "reference", _ref: userId },
      date,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const createdDoc = await client.create(newNote)
    return NextResponse.json(createdDoc, { status: 201 })
  } catch (error) {
    console.error("Error creating user note:", error)
    return NextResponse.json(
      { error: "Failed to create user note" },
      { status: 500 }
    )
  }
}
