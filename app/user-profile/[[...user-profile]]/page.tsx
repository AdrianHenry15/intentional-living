"use client"

import { useUser, useClerk, UserProfile } from "@clerk/nextjs"
import Image from "next/image"
import React from "react"
import UserDefaultImg from "@/public/assets/user-default-image.png"
import { FaGear } from "react-icons/fa6"
import Link from "next/link"
import { Button } from "@/components/button"
import { PhoneCall } from "lucide-react"
import PhoneNumberProfileLink from "@/components/user-profile/phone-number-profile-link"

export default function UserProfilePage() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-6 py-6 md:py-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <Image
            width={64}
            height={64}
            src={user?.imageUrl || UserDefaultImg}
            alt="user-img"
            className="rounded-full w-16 h-16 border-2 border-gray-400"
          />
          <div>
            <h5 className="font-semibold text-lg">
              {user?.fullName || "Guest"}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.emailAddresses[0]?.emailAddress || "No email"}
            </p>
          </div>
        </div>

        {/* Settings Icon */}
        <Link
          href={"/auth/settings"}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <FaGear className="text-xl" />
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="flex justify-center">
        <UserProfile />
      </div>

      {/* Phone Number Section */}
      <div className="mt-6">
        <PhoneNumberProfileLink />
      </div>

      {/* Logout Button */}
      <div className="mt-6 w-full flex justify-center">
        <Button
          onClick={() => signOut()}
          className="w-full md:max-w-[300px] bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition">
          Logout
        </Button>
      </div>
    </div>
  )
}
