import React from "react"
import { FaPlus } from "react-icons/fa6"

interface ICustomGoalItemProps {
  setCustomGoal: () => void
  title: string
}

const CustomGoalItem = (props: ICustomGoalItemProps) => {
  const { setCustomGoal, title } = props
  return (
    <button
      onClick={setCustomGoal}
      className="flex z-50 flex-col text-black items-center justify-center w-[300px] border-[1px] border-black py-2 rounded-lg">
      <div className="bg-white rounded-full p-4">
        <FaPlus size={25} />
      </div>
      <p className="text-xs whitespace-nowrap pt-4 pb-2 text-yellow-800">
        {title}
      </p>
    </button>
  )
}

export default CustomGoalItem
