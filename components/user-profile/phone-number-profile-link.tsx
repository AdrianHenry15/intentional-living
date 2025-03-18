"use client"

import { useState } from "react"
import { Button } from "../button"
import { usePhoneStore } from "@/store/userPhoneStore"
import BottomNavbar from "../navbar/bottom-navbar"

export default function PhoneNumberProfileLink() {
  const { phoneNumber, setPhoneNumber, clearPhoneNumber } = usePhoneStore()
  const [newPhone, setNewPhone] = useState("")

  const handleSave = () => {
    if (newPhone.trim()) {
      setPhoneNumber(newPhone)
      setNewPhone("")
    }
  }

  return (
    <div className="p-6 mx-auto w-full max-w-lg bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Phone Number
      </h2>

      {phoneNumber ? (
        <div className="mt-4 flex flex-col gap-3">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Current:</span> {phoneNumber}
          </p>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={clearPhoneNumber}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          <input
            type="tel"
            placeholder="Enter phone number"
            value={newPhone}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <Button className="w-full sm:w-auto py-2" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  )
}
