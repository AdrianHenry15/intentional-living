import SleepData from "@/components/sleep-data"
import Tracker from "@/components/tracker/tracker"

export default async function TrackerPage() {
  return (
    <div className="flex flex-1 w-full items-center justify-center flex-col bg-white text-white">
      <SleepData />
      <Tracker />
    </div>
  )
}
