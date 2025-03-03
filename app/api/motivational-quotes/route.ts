import { client } from "@/sanity/lib/client"
import { getAllMotivationalQuotes } from "@/sanity/lib/motivational-quotes/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all motivational quotes
export async function GET(req: NextRequest) {
  try {
    const quotes = await getAllMotivationalQuotes()
    return NextResponse.json({ success: true, data: quotes }, { status: 200 })
  } catch (error) {
    console.error("Error fetching motivational quotes:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch motivational quotes" },
      { status: 500 }
    )
  }
}

// POST: Create a new motivational quote
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { quote_text, author_name } = body

    if (!quote_text || !author_name) {
      return NextResponse.json(
        { success: false, error: "Quote text and author name are required" },
        { status: 400 }
      )
    }

    const newQuote = {
      _type: "motivationalQuotes",
      quote_text,
      author_name,
    }

    const createdQuote = await client.create(newQuote)
    return NextResponse.json(
      { success: true, data: createdQuote },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating motivational quote:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create motivational quote" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing motivational quote
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, quote_text, author_name } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Quote ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(quote_text && { quote_text }),
      ...(author_name && { author_name }),
    }

    const updatedQuote = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedQuote },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating motivational quote:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update motivational quote" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a motivational quote
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Quote ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "Motivational quote deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting motivational quote:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete motivational quote" },
      { status: 500 }
    )
  }
}
