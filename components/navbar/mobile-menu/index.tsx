"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { CgWebsite } from "react-icons/cg"
import ReusableModal from "@/components/modals/resuable-modal"
import LinkItem from "./link-item"
import UserIcon from "../user/user-icon"
import FooterItem from "./footer-item"
import { FaBlog, FaInfoCircle } from "react-icons/fa"
import { SiPivotaltracker } from "react-icons/si"
import { FaNotesMedical } from "react-icons/fa6"
import { MdQuiz } from "react-icons/md"
import { getNavItems } from "@/lib/constants"
import { useUser } from "@clerk/nextjs"

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { ease: "easeInOut", duration: 0.3 } },
  exit: { x: "-100%", transition: { ease: "easeInOut", duration: 0.3 } },
}

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useUser()

  // Function to return an icon based on the title
  const getIcon = (title: string): React.ReactNode => {
    switch (title) {
      case "Tracker":
        return <SiPivotaltracker size={25} />
      case "Notes":
        return <FaNotesMedical size={25} />
      case "Quiz":
        return <MdQuiz size={25} />
      case "Blog":
        return <FaBlog size={25} />
      case "About":
        return <FaInfoCircle size={25} />
      default:
        return <CgWebsite size={25} /> // Default icon
    }
  }

  return (
    <>
      {/* Menu Button */}
      <button onClick={() => setIsOpen(true)} className="text-white p-2">
        <Bars3Icon className="h-6 w-12" />
      </button>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg flex flex-col p-6 z-50">
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              {/* User Icon */}
              <div className="flex justify-start">
                <UserIcon />
              </div>

              {/* Menu Items */}
              <nav className="mt-6 space-y-6">
                {getNavItems(user?.id).map((item, index) => (
                  <LinkItem
                    key={index}
                    link={item.link}
                    title={item.title}
                    setIsOpen={() => setIsOpen(false)}
                    icon={getIcon(item.title)}
                  />
                ))}
              </nav>

              {/* Footer Buttons */}
              <div className="mt-auto pt-6 space-y-3">
                <FooterItem
                  link="/contact"
                  setIsOpen={() => setIsOpen(false)}
                  title="Contact Us"
                />
                {/* <FooterItem
                  className="bg-slate-400"
                  link="/consultation"
                  setIsOpen={() => setIsOpen(false)}
                  title="Consultation"
                /> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal for Merch */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="The Merch Store"
        description="The Merch Store will send you to a different tab"
        onConfirm={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default MobileMenu
