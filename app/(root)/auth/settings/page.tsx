"use client"

import { useEffect, useState } from "react"
import { sendNotification, subscribeUser, unsubscribeUser } from "@/app/actions"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )
  const [message, setMessage] = useState("")
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const router = useRouter()

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
    setNotificationsEnabled(!!sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
      ),
    })
    setSubscription(sub)
    setNotificationsEnabled(true)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    setNotificationsEnabled(false)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-screen flex-col bg-gray-900 text-white p-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.back()}
        className="flex items-center mb-6">
        <ChevronLeft size={30} />
        <h1 className="text-2xl font-semibold ml-4">Notification Settings</h1>
      </motion.button>

      {!isSupported ? (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-red-500 text-center">
          Push notifications are not supported on this device.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-[500px] self-center">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Enable Notifications</span>
            <motion.input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={
                notificationsEnabled ? unsubscribeFromPush : subscribeToPush
              }
              whileTap={{ scale: 0.9 }}
              className="w-6 h-6 accent-blue-500 cursor-pointer"
            />
          </div>

          {notificationsEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4">
              <label className="block text-sm mb-2">Test Notification</label>
              <motion.input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                onClick={sendTestNotification}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Send Test Notification
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
