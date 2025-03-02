interface QuestionProps {
  question: string
  selectedRating: number
  handleNext: (rating: number) => void
}

const Question = ({ question, selectedRating, handleNext }: QuestionProps) => {
  return (
    <div className="text-center flex justify-around flex-col">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>

      <div className="flex justify-center space-x-2 mt-4">
        {[...Array(10)].map((_, i) => (
          <button
            key={i}
            className={`w-10 h-10 rounded-full text-lg font-bold transition-all 
                          ${selectedRating === i + 1 ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"}
                          hover:bg-yellow-500`}
            onClick={() => handleNext(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question
