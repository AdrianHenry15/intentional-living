import { client } from "@/sanity/lib/client"
import { getAllReferrals } from "@/sanity/lib/referrals/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all referrals
export async function GET(req: NextRequest) {
  try {
    const referrals = await getAllReferrals()
    return NextResponse.json(
      { success: true, data: referrals },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching referrals:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch referrals" },
      { status: 500 }
    )
  }
}

// POST: Create a new referral
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { referrer_id, referred_id, signup_date, reward_claimed } = body

    if (!referrer_id || !referred_id || !signup_date) {
      return NextResponse.json(
        {
          success: false,
          error: "Referrer ID, referred ID, and signup date are required",
        },
        { status: 400 }
      )
    }

    const newReferral = {
      _type: "referrals",
      referrer_id: { _ref: referrer_id, _type: "reference" },
      referred_id: { _ref: referred_id, _type: "reference" },
      signup_date,
      reward_claimed: reward_claimed || false,
    }

    const createdReferral = await client.create(newReferral)
    return NextResponse.json(
      { success: true, data: createdReferral },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating referral:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create referral" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing referral
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, reward_claimed } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Referral ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(reward_claimed !== undefined && { reward_claimed }),
    }

    const updatedReferral = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedReferral },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating referral:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update referral" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a referral
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Referral ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "Referral deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting referral:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete referral" },
      { status: 500 }
    )
  }
}
