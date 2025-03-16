import { client } from "@/sanity/lib/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const query = `*[_type == "userNotes" && _id == $id][0]`
    const note = await client.fetch(query, { id })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { content } = await req.json()

    if (!content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 })
    }

    const updatedNote = await client
      .patch(id)
      .set({ content, updated_at: new Date().toISOString() })
      .commit()

    return NextResponse.json(
      { message: "Note updated", note: updatedNote },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await client.delete(id)

    return NextResponse.json({ message: "Note deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    )
  }
}
