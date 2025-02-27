"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

import Logo from "@/public/assets/il-logo.png"
import MobileMenu from "./mobile-menu"
import UserIcon from "./user/user-icon"
import { Button } from "../button"
import { NavMenuType } from "@/lib/types"
import { getNavItems } from "@/lib/constants"
import { useUser } from "@clerk/nextjs"

interface INavbarProps {
  className?: string
}

export default function Navbar(props: INavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <>
      {/* Navbar */}
      <nav
        className={`${props.className} text-sm whitespace-nowrap font-semibold flex w-full self-center bg-black sticky top-0 z-[100]`}>
        {/* MOBILE CONTAINER */}
        <div className="absolute self-center flex flex-1 left-0 xl:hidden">
          <MobileMenu />
        </div>

        {/* TITLE & LINKS */}
        <div className="flex w-full my-2 justify-evenly">
          <div className="flex items-center">
            <Link href="/" className="flex-1 flex lg:mr-10">
              <Image src={Logo} alt="logo" width={100} className="w-20" />
            </Link>
            {/* LINKS */}
            <ul className="hidden text-white items-center xl:flex">
              {getNavItems(user?.id).map((item: NavMenuType) => (
                <li
                  className={`mx-2 transition-all duration-300 ease-in-out hover:text-zinc-500 hover:underline ${
                    pathname === item.link ? "underline" : ""
                  }`}
                  key={item.title}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAV BUTTONS */}
          <ul className="hidden items-center xl:flex">
            <Button
              onClick={() => router.push("/contact-us")}
              className="bg-white text-black text-xs px-4 py-2 rounded-full">
              Contact Us
            </Button>

            <div className="flex self-center items-center ml-4">
              <UserIcon />
            </div>
          </ul>
          <div className="flex absolute self-center justify-center right-5 top-8 items-center ml-4 xl:hidden">
            <UserIcon />
          </div>
        </div>
      </nav>
    </>
  )
}
