"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import Image from "next/image"
import React from "react"
import UserDefaultImg from "@/public/assets/user-default-image.png"
import { FaGear } from "react-icons/fa6"
import { Button } from "../button"

const Profile = () => {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div className="flex flex-col flex-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <Image
            width={50}
            height={50}
            src={user?.imageUrl || UserDefaultImg}
            alt="user-img"
            className="rounded-full w-14 h-14 border-2 border-gray-500"
          />
          <h5 className="font-semibold text-lg">{user?.fullName || "Guest"}</h5>
        </div>

        {/* Settings Icon */}
        <button className="p-2 rounded-full hover:bg-gray-700 transition">
          <FaGear className="text-xl" />
        </button>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <Button
          onClick={() => signOut()}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition">
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Profile
