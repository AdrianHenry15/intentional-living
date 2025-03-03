import { client } from "@/sanity/lib/client"
import { getAllCoinTransactions } from "@/sanity/lib/coin-transactions/getAll"
import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all coin transactions
export async function GET(req: NextRequest) {
  try {
    const transactions = await getAllCoinTransactions()
    return NextResponse.json(
      { success: true, data: transactions },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching coin transactions:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch coin transactions" },
      { status: 500 }
    )
  }
}

// POST: Create a new coin transaction
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, amount, transaction_type } = body

    if (!user_id || !amount || !transaction_type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const newTransaction = {
      _type: "coinTransactions",
      user_id: { _type: "reference", _ref: user_id },
      amount,
      transaction_type,
      created_at: new Date().toISOString(),
    }

    const createdTransaction = await client.create(newTransaction)
    return NextResponse.json(
      { success: true, data: createdTransaction },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating coin transaction:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create coin transaction" },
      { status: 500 }
    )
  }
}

// PUT: Update an existing coin transaction
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, amount, transaction_type } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Transaction ID is required" },
        { status: 400 }
      )
    }

    const updates = {
      ...(amount !== undefined && { amount }),
      ...(transaction_type && { transaction_type }),
    }

    const updatedTransaction = await client.patch(id).set(updates).commit()
    return NextResponse.json(
      { success: true, data: updatedTransaction },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating coin transaction:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update coin transaction" },
      { status: 500 }
    )
  }
}

// DELETE: Remove a coin transaction
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Transaction ID is required" },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json(
      { success: true, message: "Coin transaction deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting coin transaction:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete coin transaction" },
      { status: 500 }
    )
  }
}
