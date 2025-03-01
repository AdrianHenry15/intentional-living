import axios from "axios"

export async function checkQuizCompletion(userId: string): Promise<boolean> {
  try {
    const { data } = await axios.get(`/api/quiz/completed?userId=${userId}`)
    return data.completed
  } catch (error) {
    console.error("Error checking quiz completion", error)
    return false
  }
}
