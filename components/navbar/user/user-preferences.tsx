"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Switch } from "@/components/ui/switch"

export default function UserPreferencesPage() {
  const { user } = useUser()
  const [updating, setUpdating] = useState(false)

  async function handleToggle(field: string) {
    if (!user) return

    try {
      setUpdating(true)

      console.log("Sending PATCH request:", { userId: user.id, field })

      const response = await fetch("/api/user-preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, field }),
      })

      // ✅ Check if the response has content before parsing JSON
      const text = await response.text()
      console.log("Raw Response:", text)

      if (!response.ok) {
        throw new Error(`Failed to update preferences: ${response.status}`)
      }

      if (text) {
        const responseData = JSON.parse(text)
        console.log("Response Data:", responseData)
      }
    } catch (err) {
      console.error("Failed to update preference:", err)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="p-4 w-full max-w-lg space-y-4">
      <div className="flex justify-between items-center">
        <span>Email Notifications</span>
        <Switch
          onCheckedChange={() => handleToggle("email_notifications")}
          disabled={updating}
        />
      </div>
      <div className="flex justify-between items-center">
        <span>Push Notifications</span>
        <Switch
          onCheckedChange={() => handleToggle("push_notifications")}
          disabled={updating}
        />
      </div>
      <div className="flex justify-between items-center">
        <span>Weekly Summary</span>
        <Switch
          onCheckedChange={() => handleToggle("weekly_summary_enabled")}
          disabled={updating}
        />
      </div>
    </div>
  )
}
