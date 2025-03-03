import { getAllRatingQuestions } from "@/sanity/lib/rating-questions/getAll"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const questions = await getAllRatingQuestions()
    return NextResponse.json(
      { success: true, data: questions },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching rating questions:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch rating questions" },
      { status: 500 }
    )
  }
}
