import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { getAllReferrals } from "@/sanity/lib/referrals/getAll"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id
  try {
    const referrals = await getAllReferrals()

    // Filter referrals where `referrer_id` matches the requested ID
    const userReferrals = referrals.filter((ref) => ref.referrer_id?._id === id)

    return NextResponse.json(
      { success: true, data: userReferrals },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching referrals:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch referrals" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = (await params).id
    const { reward_claimed } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "Referral ID is required" },
        { status: 400 }
      )
    }

    const updatedReferral = await client
      .patch(id)
      .set({ reward_claimed })
      .commit()
    return NextResponse.json({ success: true, referral: updatedReferral })
  } catch (error) {
    console.error("Error updating referral:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = (await params).id

    if (!id) {
      return NextResponse.json(
        { error: "Referral ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json({ success: true, message: "Referral deleted" })
  } catch (error) {
    console.error("Error deleting referral:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
