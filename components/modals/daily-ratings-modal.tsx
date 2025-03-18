"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment } from "react"
import { useDailyRatingsStore } from "@/store/use-daily-ratings"
import { CloseIcon } from "@sanity/icons"

export default function DailyRatingsModal() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { userId } = useAuth()
  const { ratings, fetchRatings, loading } = useDailyRatingsStore()

  const today = new Date().toISOString().split("T")[0] // Format YYYY-MM-DD

  useEffect(() => {
    console.log(ratings?.date)
  }, [ratings])

  useEffect(() => {
    if (loading && ratings?.date === today) {
      console.log(ratings.date)
      setIsOpen(false)
    }
  }, [loading, ratings, today])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <DialogPanel className="w-full relative max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <CloseIcon
                fontSize={25}
                className="text-black absolute right-4 top-4"
                onClick={() => setIsOpen(false)}
              />
              <DialogTitle className="text-lg font-bold text-gray-900">
                Daily Ratings Required
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600">
                {`You need to complete today's quiz before proceeding.`}
              </p>
              <div className="flex text-sm items-center justify-between w-full">
                <button
                  className="mt-4 mx-1 w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => router.push("/auth/daily-ratings")}>
                  Go to Daily Ratings
                </button>
                <button
                  className="mt-4 mx-1 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => setIsOpen(false)}>
                  Ratings Completed
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
