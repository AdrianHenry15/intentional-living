import Tracker from "@/components/tracker"

export default async function TrackerPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId
  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-col bg-gray-900 text-white">
      <Tracker />
    </div>
  )
}
