import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { getAllDailyRatings } from "@/sanity/lib/daily-ratings/getAll"

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const today = new Date().toISOString().split("T")[0];
    const existingEntryQuery = groq`
    *[_type == "dailyRatings" && user_id._ref == $userId && date >= $todayStart && date < $tomorrow][0]
  `
    const params = {
    userId,
    todayStart: `${today}T00:00:00Z`,
    tomorrow: `${today}T23:59:59Z`,
    }

    const existingEntry = await client.fetch(existingEntryQuery, params)

    if(existingEntry){
        return NextResponse.json(
          { hasSubmitted: true},
          { status: 409 }
        )
    }

    const ratings = await getAllDailyRatings();

    return NextResponse.json(ratings, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch daily ratings" },
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

    const body = await req.json()
    const { ratings } = body

    if (!ratings || ratings.length !== 6) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Check if today's entry already exists
    const existingEntryQuery = groq`
      *[_type == "dailyRatings" && user_id._ref == $userId && date >= $todayStart && date < $tomorrow][0]
    `

    const params = {
      userId,
      todayStart: `${today}T00:00:00Z`,
      tomorrow: `${today}T23:59:59Z`,
    }

    const existingEntry = await client.fetch(existingEntryQuery, params)

    if (existingEntry) {
      return NextResponse.json(
        { error: "Daily rating already exists for today" },
        { status: 409 }
      )
    }

    const newEntry = {
      _type: "dailyRatings",
      user_id: { _type: "reference", _ref: userId },
      date: new Date().toISOString(),
      question_1_rating: ratings[0],
      question_2_rating: ratings[1],
      question_3_rating: ratings[2],
      question_4_rating: ratings[3],
      question_5_rating: ratings[4],
      question_6_rating: ratings[5],
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
