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
import { ALL_COIN_TRANSACTIONSResult, User } from "@/sanity.types"
import { useCustomGoalStore } from "@/store/use-custom-goal-store"
import { useDailyRatingsStore } from "@/store/use-daily-ratings"
import { useDailyTrackingStore } from "@/store/use-daily-tracking-store"

// const stats = [
//   { name: "Jan", value: 30 },
//   { name: "Feb", value: 50 },
//   { name: "Mar", value: 70 },
//   { name: "Apr", value: 90 },
//   { name: "May", value: 120 },
// ]

// Sample user tracking data (replace `{ Data }` with actual values)
// const userData = {
//   goals: ["Read 10 pages daily", "Exercise 3x a week"],
//   tracking: {
//     diet: "Healthy",
//     exercise: "Consistent",
//     sugarIntake: "Low",
//     mentalStrength: "Consistent",
//   },
// }

interface IHomePageProps {
  coin_transactions: ALL_COIN_TRANSACTIONSResult
  user_data: User
}

const HomePage = (props: IHomePageProps) => {
  const { user } = useUser()
  const { goals } = useCustomGoalStore()
  const { ratings } = useDailyRatingsStore()
  const {
    wakeTime,
    sleepTime,
    sleepNotes,
    dietCheck,
    exerciseCheck,
    sugarCheck,
    mentalCheck,
  } = useDailyTrackingStore()
  const { coin_transactions, user_data } = props

  const streak = user_data ? user_data.streak_count : "0"

  // Calculate the total sum of coin transactions
  const totalCoinTransactionAmount = coin_transactions.reduce(
    (sum, transaction) => {
      // Assuming each transaction has an "amount" field
      return sum + transaction.amount!
    },
    0
  )

  const getTrackingData = (
    value: "Healthy" | "Consistent" | "Low" | string
  ) => {
    if (value === "Healthy") {
      return <span className="text-green-500">{value}</span>
    } else if (value === "Consistent") {
      return <span className="text-yellow-500">{value}</span>
    } else if (value === "Low") {
      return <span className="text-red-500">{value}</span>
    } else {
      return <span className="text-white">{value}</span>
    }
  }

  const renderTrackingData = (
    title: "Diet" | "Exercise" | "Sugar Intake" | "Mental Strength" | string,
    value: "Healthy" | "Consistent" | "Low" | string
  ) => {
    return (
      <div className="flex justify-between">
        <span className="font-semibold capitalize">{title}</span>
        <span>{getTrackingData(value)}</span>
      </div>
    )
  }

  const renderRatings = (title: string, value: string) => {
    return (
      <div className="flex flex-col border bg-gray-700 p-4 rounded-lg">
        <span className="font-semibold capitalize">{title}</span>
        <span className="text-white">{value || "No Data"}</span>
      </div>
    )
  }

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
      {/* <motion.div
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
      </motion.div> */}

      {/* Ratings */}
      <motion.div
        className="col-span-1 md:col-span-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}>
        <Card>
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderRatings(
              `How does ${user?.fullName} feel today?`,
              ratings?.question_1_rating?.toString() as string
            )}
            {renderRatings(
              `How was ${user?.fullName}'s mindset today?`,
              ratings?.question_2_rating?.toString() as string
            )}
            {renderRatings(
              "Rate your sense of community today.",
              ratings?.question_3_rating?.toString() as string
            )}
            {renderRatings(
              "Do I improve .01% today?",
              ratings?.question_4_rating?.toString() as string
            )}
            {renderRatings(
              "How many hours of learning did I do today?",
              ratings?.question_5_rating?.toString() as string
            )}
            {renderRatings(
              "How was your energy level today?",
              ratings?.question_6_rating?.toString() as string
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Life Rating", value: "100%" },
          { title: "Streak", value: streak },
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
              {goals.length > 0 ? (
                goals.map((goal, idx) => (
                  <p key={idx} className="text-lg font-medium">
                    ✅ {goal.name}
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
              {renderTrackingData(
                "Diet",
                dietCheck ? "Complete" : "Incomplete"
              )}
              {renderTrackingData(
                "Exercise",
                exerciseCheck ? "Complete" : "Incomplete"
              )}
              {renderTrackingData(
                "Sugar Intake",
                sugarCheck ? "Complete" : "Incomplete"
              )}
              {renderTrackingData(
                "Mental Strength",
                mentalCheck ? "Complete" : "Incomplete"
              )}
              {renderTrackingData(
                "Wake Time",
                wakeTime ? (wakeTime?.toString() as string) : "Incomplete"
              )}
              {renderTrackingData(
                "Sleep Time",
                sleepTime ? (sleepTime?.toString() as string) : "Incomplete"
              )}
              {renderTrackingData(
                "Sleep Notes",
                sleepNotes ? (sleepNotes?.toString() as string) : "Incomplete"
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
