"use client"

import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { ALL_COIN_TRANSACTIONSResult } from "@/sanity.types"

const stats = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 70 },
  { name: "Apr", value: 90 },
  { name: "May", value: 120 },
]

// Sample user tracking data (replace `{ Data }` with actual values)
const userData = {
  goals: ["Read 10 pages daily", "Exercise 3x a week"],
  tracking: {
    diet: "Healthy",
    exercise: "Consistent",
    sugarIntake: "Low",
    mentalStrengthening: "Meditation",
  },
}

interface IHomePageProps {
  coin_transactions: ALL_COIN_TRANSACTIONSResult
}

const HomePage = (props: IHomePageProps) => {
  const { user } = useUser()
  const { coin_transactions } = props

  // Calculate the total sum of coin transactions
  const totalCoinTransactionAmount = coin_transactions.reduce(
    (sum, transaction) => {
      // Assuming each transaction has an "amount" field
      return sum + transaction.amount!
    },
    0
  )

  return (
    <div className="p-6 space-y-8">
      {/* Animated Heading */}
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Welcome, {user?.fullName || "Guest"}!
      </motion.h1>

      {/* Stats Graph */}
      <motion.div
        className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}>
        <h2 className="text-lg font-semibold mb-4">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FDDA0D"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Life Rating", value: "100%" },
          { title: "Streak", value: "90 Days" },
          // Update the Coin Transactions stat with the calculated total amount
          {
            title: "Coin Transactions",
            value: `$${totalCoinTransactionAmount.toFixed(2)}`,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="col-span-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}>
            <Card>
              <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {stat.value}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Goals Card */}
        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>Goals</CardTitle>
            </CardHeader>
            <CardContent>
              {userData.goals.length > 0 ? (
                userData.goals.map((goal, idx) => (
                  <p key={idx} className="text-lg font-medium">
                    ✅ {goal}
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No goals set.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Life Tracking Data Card */}
        <motion.div
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle>Life Tracking Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(userData.tracking).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:{" "}
                  </span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
