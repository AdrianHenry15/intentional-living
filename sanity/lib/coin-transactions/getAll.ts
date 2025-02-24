import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllCoinTransactions = async () => {
  const ALL_COIN_TRANSACTIONS = defineQuery(`
    *[_type == "coinTransactions"] | order(created_at desc) {
      _id,
      created_at,
      amount,
      transaction_type,
      user_id->{
        _id,
        name,
        email
      }
    }
  `)

  try {
    const transactions = await sanityFetch({
      query: ALL_COIN_TRANSACTIONS,
    })

    return transactions.data || []
  } catch (error) {
    console.error("Error fetching all coin transactions:", error)
    return []
  }
}
