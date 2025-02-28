"use client"

import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import React from "react"
import UserDefaultImg from "@/public/assets/user-default-image.png"
import { FaGear } from "react-icons/fa6"

const Profile = () => {
  const { user } = useUser()
  return (
    <div className="flex flex-col flex-auto bg-gray-500">
      {/* Profile */}
      <div className="flex items-center justify-between px-4">
        {/* Image Name  */}
        <div className="flex items-center">
          <span className="p-4">
            <Image
              width={100}
              height={100}
              src={user?.imageUrl || UserDefaultImg}
              alt="user-img"
              className="rounded-full w-12"
            />
          </span>
          <h5 className="font-semibold text-xl">{user?.fullName}</h5>
        </div>
        <FaGear />
      </div>
    </div>
  )
}

export default Profile
