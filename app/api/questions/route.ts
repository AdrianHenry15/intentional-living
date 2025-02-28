import { getAllRatingQuestions } from "@/sanity/lib/rating-questions/getAll"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const questions = await getAllRatingQuestions()

    return NextResponse.json(
      { success: true, data: questions },
      { status: 200 }
    )
  } catch (error) {
    console.error("API Error fetching rating questions:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch questions" },
      { status: 500 }
    )
  }
}
