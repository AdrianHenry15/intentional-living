"use client"

import { useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream)

    // Check if the app is already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    setIsStandalone(standalone)

    // Show prompt only if not installed
    if (!standalone) {
      setTimeout(() => setIsOpen(true), 2000) // Show after delay
    }
  }, [])

  if (isStandalone) return null // Don't show if app is installed

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Install This App
              </Dialog.Title>

              {isIOS ? (
                <p className="mt-2 text-gray-700">
                  To install this app on your iOS device, tap the share button
                  <span role="img" aria-label="share icon">
                    {" "}
                    ⎋{" "}
                  </span>
                  then select <strong>Add to Home Screen</strong>
                  <span role="img" aria-label="plus icon">
                    {" "}
                    ➕{" "}
                  </span>
                  .
                </p>
              ) : (
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={() => setIsOpen(false)}>
                  Add to Home Screen
                </button>
              )}

              <button
                className="mt-4 w-full text-gray-500 underline"
                onClick={() => setIsOpen(false)}>
                Dismiss
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
