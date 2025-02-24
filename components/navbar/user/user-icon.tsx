"use client"

import React, { useState } from "react"
import { CubeIcon } from "@sanity/icons"
import { useRouter } from "next/navigation"
import { ClerkLoaded, UserButton, useUser } from "@clerk/nextjs"
import SignInModal from "@/components/sign-in-modal"
import { isAdmin } from "@/lib/check-admin"
import { CgCommunity } from "react-icons/cg"
import { MdRoomPreferences } from "react-icons/md"
import UserPreferencesPage from "./user-preferences"

const UserIcon = () => {
  const { user } = useUser()
  const [showSignIn, setShowSignIn] = useState(false)
  const router = useRouter()

  const userEmail = user?.emailAddresses[0]?.emailAddress

  return (
    <ClerkLoaded>
      {user ? (
        <div className="flex items-center space-x-2">
          <UserButton>
            {/* Admin Menu Items */}
            {isAdmin(userEmail as string) && (
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Studio"
                  onClick={() => router.push("/studio")}
                  labelIcon={<CubeIcon color="blue" fontSize={18} />}
                />
              </UserButton.MenuItems>
            )}
            {/* Profile Sidebar Items */}
            <UserButton.UserProfilePage
              label="Streak"
              url="streak"
              labelIcon={<CgCommunity size={20} />}>
              {/* Render User Streak */}
              <span>Streak</span>
            </UserButton.UserProfilePage>
            <UserButton.UserProfilePage
              label="Preferences"
              url="preferences"
              labelIcon={<MdRoomPreferences size={20} />}>
              {/* Render User Preferences */}
              <UserPreferencesPage />
            </UserButton.UserProfilePage>
          </UserButton>
          <div className="hidden sm:block text-xs text-gray-600">
            <p className="text-gray-400">Welcome Back</p>
            <p className="font-bold">{user.fullName}!</p>
          </div>
        </div>
      ) : (
        <ClerkLoaded>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-yellow-400 text-xs hover:bg-yellow-400/50 transition-all ease-in-out hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded-full">
            Sign In
          </button>
          {showSignIn && <SignInModal setShowSignIn={setShowSignIn} />}
        </ClerkLoaded>
      )}
    </ClerkLoaded>
  )
}

export default UserIcon
