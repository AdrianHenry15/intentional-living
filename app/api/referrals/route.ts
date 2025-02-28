import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { referrer_id, referred_id } = await req.json()
    if (!referrer_id || !referred_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const newReferral = {
      _type: "referrals",
      referrer_id: { _type: "reference", _ref: referrer_id },
      referred_id: { _type: "reference", _ref: referred_id },
      signup_date: new Date().toISOString(),
      reward_claimed: false,
      created_at: new Date().toISOString(),
    }

    const result = await client.create(newReferral)
    return NextResponse.json({ success: true, referral: result })
  } catch (error) {
    console.error("Error creating referral:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
