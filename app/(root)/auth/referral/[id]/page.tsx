"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Referrals } from "@/sanity.types"

export default function ReferralPage() {
  const { id } = useParams() // Get user ID from the URL
  const [referrals, setReferrals] = useState<Referrals[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    const fetchReferrals = async () => {
      try {
        const response = await axios.get(`/api/referrals/${id}`)
        console.log("Fetched referrals:", response.data) // Debugging
        setReferrals(response.data.data || [])
      } catch (error) {
        console.error("Error fetching referrals:", error)
        setError("Failed to load referrals.")
      } finally {
        setLoading(false)
      }
    }

    fetchReferrals()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold">Your Referrals</h1>
      {referrals.length === 0 ? (
        <p className="text-gray-400 mt-4">No referrals yet.</p>
      ) : (
        <ul className="mt-4">
          {referrals.map((ref) => (
            <li key={ref._id} className="bg-gray-800 p-3 rounded-md mb-2">
              {/* {ref.referred_id?.name || "Unknown"} -{" "} */}
              {ref.reward_claimed ? "✅ Reward Claimed" : "⏳ Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
