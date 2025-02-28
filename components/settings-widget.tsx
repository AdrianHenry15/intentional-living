"use client"

import { useState, Fragment, useEffect } from "react"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import PushNotificationManager from "@/components/push-notifications-manager"
import { BellIcon, ChevronUpIcon, DownloadIcon, Pencil } from "lucide-react"
import Link from "next/link"

export default function SettingsWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    const beforeInstallPromptHandler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler)

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      )
    }
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        console.log("User installed the app")
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    } else {
      alert("PWA installation is not available on this device.")
    }
  }

  return (
    <>
      {/* Floating Button to Open Modal */}
      <button
        className="fixed bottom-14 right-2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-500/75 transition flex items-center justify-center"
        onClick={() => setIsOpen(true)}>
        <ChevronUpIcon className="h-6 w-6" />
      </button>

      {/* Modal */}
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
              <DialogPanel className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  App Settings
                </DialogTitle>

                {/* Options */}
                <div className="mt-4 space-y-4">
                  {/* <Link
                    onClick={() => setIsOpen(false)}
                    href={"/auth/settings"}
                    className="w-full flex items-center gap-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    <BellIcon className="h-5 w-5" />
                    Manage Push Notifications
                  </Link> */}
                  {!isInstalled && (
                    <button
                      onClick={installApp}
                      className="w-full flex items-center gap-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                      <DownloadIcon className="h-5 w-5" />
                      Install This App
                    </button>
                  )}

                  <button
                    onClick={() => setFeedbackModal(true)}
                    className="w-full flex items-center gap-3 bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition">
                    <Pencil className="h-5 w-5" />
                    Feedback
                  </button>
                </div>

                <button
                  className="mt-4 w-full text-gray-500 underline"
                  onClick={() => setIsOpen(false)}>
                  Dismiss
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
