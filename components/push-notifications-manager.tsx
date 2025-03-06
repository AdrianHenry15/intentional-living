"use client"

import { useEffect, useState } from "react"
import { sendNotification, subscribeUser, unsubscribeUser } from "@/app/actions"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment } from "react"
import { MdPhoneIphone } from "react-icons/md"

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage("")
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition">
        <MdPhoneIphone size={25} />
      </button>

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
              <DialogPanel className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Push Notifications
                </DialogTitle>

                {!isSupported ? (
                  <p className="mt-2 text-red-600">
                    Push notifications are not supported in this browser.
                  </p>
                ) : subscription ? (
                  <>
                    <p className="mt-2 text-gray-700">
                      You are subscribed to push notifications.
                    </p>
                    <button
                      onClick={unsubscribeFromPush}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                      Unsubscribe
                    </button>
                    <input
                      type="text"
                      placeholder="Enter notification message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-4 w-full border p-2 rounded-md"
                    />
                    <button
                      onClick={sendTestNotification}
                      className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                      Send Test
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-gray-700">
                      You are not subscribed to push notifications.
                    </p>
                    <button
                      onClick={subscribeToPush}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                      Subscribe
                    </button>
                  </>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full text-gray-500 underline">
                  Close
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
