"use client"

import { getNavItems } from "@/lib/constants"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = getNavItems()
export default function BottomNavbar() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 sm:bottom-4 left-0 right-0 mx-auto w-full sm:max-w-lg bg-white shadow-lg p-4 sm:rounded-full flex justify-around items-center pb-10 sm:p-4">
      {navItems.map(({ title, link, icon: Icon }) => (
        <Link
          key={title}
          href={link!}
          className="flex flex-col items-center text-gray-600 hover:text-black">
          <Icon
            size={24}
            className={pathname === link ? "text-black" : "text-gray-400"}
          />
          {/* <span className="text-xs">{title}</span> */}
        </Link>
      ))}
    </motion.nav>
  )
}
