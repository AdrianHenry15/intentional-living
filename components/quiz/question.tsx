import { motion } from "framer-motion"

interface QuestionProps {
  data: {
    question: string
    options: string[]
    answer: string
  }
  selectedAnswer: string | null
  setSelectedAnswer: (answer: string) => void
  handleNext: () => void
}

const Question = ({
  data,
  selectedAnswer,
  setSelectedAnswer,
  handleNext,
}: QuestionProps) => {
  return (
    <div className="text-center">
      {/* Question */}
      <motion.h2
        className="text-2xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        {data.question}
      </motion.h2>

      {/* Options */}
      <div className="grid gap-3">
        {data.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedAnswer(option)} // ✅ Fixes answer selection
            className={`w-full p-3 rounded-lg font-medium transition-all text-white 
              ${
                selectedAnswer === option
                  ? "bg-blue-500 scale-105 shadow-md"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            whileTap={{ scale: 0.95 }}>
            {option}
          </motion.button>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={handleNext}
        disabled={!selectedAnswer} // Prevents clicking next without an answer
        className={`mt-6 w-full py-3 rounded-lg font-bold text-lg text-white transition-all ${
          selectedAnswer
            ? "bg-black hover:bg-black/50"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        whileTap={selectedAnswer ? { scale: 0.95 } : {}}>
        Next
      </motion.button>
    </div>
  )
}

export default Question
