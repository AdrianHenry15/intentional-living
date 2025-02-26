"use client"

import { useState } from "react"
import { questions } from "@/lib/questions"
import { motion } from "framer-motion"
import Progress from "./progress"
import Question from "./question"

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
    setSelectedAnswer(null)
    setCurrentQuestion((prev) => prev + 1)
  }

  return (
    <motion.div
      className="w-full mx-auto p-6 rounded-2xl shadow-2xl text-white 
                 bg-gradient-to-b from-black via-yellow-600 to-yellow-500 border border-yellow-400"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <Progress current={currentQuestion + 1} total={questions.length} />

      {currentQuestion < questions.length ? (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}>
          <Question
            data={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            handleNext={handleNext}
          />
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-center">Quiz Completed!</h2>
          <p className="text-center mt-4 text-lg font-medium">
            Your score:{" "}
            <span className="font-extrabold text-yellow-300">
              {score} / {questions.length}
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Quiz
