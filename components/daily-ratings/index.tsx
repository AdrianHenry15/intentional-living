"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Progress from "./progress"
import Question from "./question"
import { getQuestions } from "@/lib/questions"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import Link from "next/link"
import { useDailyRatingsStore } from "@/store/use-daily-ratings"

const DailyRatings = () => {
  const { user } = useUser()
  const { markDailyRatingsCompleted } = useDailyRatingsStore()
  const userId = user?.id
  const userName = user?.fullName || "(Guest)"

  const [questions, setQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [ratings, setRatings] = useState<number[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (userId && userName) {
      const newQuestions = getQuestions(userName)
      console.log("Loaded questions:", newQuestions) // Debugging log
      setQuestions(newQuestions)
    }
  }, [userId, userName])

  const handleNext = (rating: number) => {
    setIsTransitioning(true)
    const updatedRatings = [...ratings]
    updatedRatings[currentQuestion] = rating
    setRatings(updatedRatings)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        submitRatings(updatedRatings) // Send data after the last question
        markDailyRatingsCompleted()
      }
      setIsTransitioning(false)
    }, 100)
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1)
        setIsTransitioning(false)
      }, 100)
    }
  }

  const submitRatings = async (ratings: number[]) => {
    if (!userId) return alert("You must be logged in to submit.")

    setIsSubmitting(true)
    try {
      await axios.post("/api/daily-ratings", {
        user_id: userId,
        date: new Date().toISOString(),
        ratings: ratings,
      })
      console.log("error here")
      alert("Your ratings have been submitted!")
    } catch (error) {
      console.error("Failed to submit ratings:", error)
      alert("There was an error submitting your ratings.")
    }
    setIsSubmitting(false)
  }

  if (questions.length === 0) {
    return <p className="text-center text-white">Loading questions...</p>
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-2xl text-white
                 bg-gradient-to-b from-black via-yellow-600 to-yellow-500 border border-yellow-400"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}>
      <Progress current={currentQuestion + 1} total={questions.length} />

      {currentQuestion < questions.length - 1 ? (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            x: 50,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className={isTransitioning ? "pointer-events-none opacity-75" : ""}>
          <Question
            question={questions[currentQuestion]}
            selectedRating={ratings[currentQuestion] || 0}
            handleNext={handleNext}
          />

          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <motion.button
                onClick={handleBack}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md transition-all
                           hover:bg-gray-700 active:scale-95">
                ⬅ Back
              </motion.button>
            )}

            <motion.button
              onClick={() => handleNext(ratings[currentQuestion] || 0)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              disabled={isSubmitting}
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition-all
                         hover:bg-yellow-400 active:scale-95">
              {isSubmitting ? "Submitting..." : "Next ➡"}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}>
          <h2 className="text-2xl font-bold text-center">
            Daily Ratings Completed!
          </h2>
          <p className="text-center mt-4 text-lg font-medium">
            Thank you for completing the life tracker. Your responses have been
            recorded.
          </p>
          <Link className="flex items-center justify-center w-full" href={"/"}>
            <button className="px-4 py-2 text-center rounded-lg bg-yellow-500 shadow-lg mt-4">
              Go Home
            </button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DailyRatings
