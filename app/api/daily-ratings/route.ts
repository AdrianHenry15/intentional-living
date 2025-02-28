/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client"

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const query = groq`
      *[_type == "dailyRatings" && user_id._ref == $userId] | order(date desc) {
        _id, date, question_1_rating, question_2_rating, question_3_rating,
        question_4_rating, question_5_rating, question_6_rating
      }
    `

    const data = await client.fetch(query, { userId })
    return NextResponse.json(data, { status: 200 })
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
    const { date, ratings } = body

    if (!date || !ratings || ratings.length !== 6) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const existingEntryQuery = groq`
      *[_type == "dailyRatings" && user_id._ref == $userId && date == $date][0]
    `

    const existingEntry = await client.fetch(existingEntryQuery, {
      userId,
      date,
    })

    if (existingEntry) {
      return NextResponse.json(
        { error: "Daily rating already exists" },
        { status: 409 }
      )
    }

    const newEntry = {
      _type: "dailyRatings",
      user_id: { _type: "reference", _ref: userId },
      date,
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
    return NextResponse.json(
      { error: "Failed to submit daily rating" },
      { status: 500 }
    )
  }
}
