import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllReferrals = async () => {
  const ALL_REFERRALS = defineQuery(`
    *[_type == "referrals"] | order(signup_date desc) {
      _id,
      referrer_id->{
        _id,
        name,
        email
      },
      referred_id->{
        _id,
        name,
        email
      },
      signup_date,
      reward_claimed,
      created_at
    }
  `)

  try {
    const referrals = await sanityFetch({
      query: ALL_REFERRALS,
    })

    return referrals.data || []
  } catch (error) {
    console.error("Error fetching referrals:", error)
    return []
  }
}
