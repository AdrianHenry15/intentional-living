import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getCoinTransactionsByUserId = async (userId: string) => {
  const COIN_TRANSACTIONS_BY_USER_ID = defineQuery(`
    *[_type == "coinTransactions" && user_id._ref == $userId] | order(created_at desc) {
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
      query: COIN_TRANSACTIONS_BY_USER_ID,
      params: { userId }, // Pass userId as a parameter to the query
    })

    return transactions.data || []
  } catch (error) {
    console.error("Error fetching coin transactions by user ID:", error)
    return []
  }
}
