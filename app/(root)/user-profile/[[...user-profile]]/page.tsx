import { UserProfile } from "@clerk/nextjs"

const UserProfilePage = () => (
  <div className="flex items-center justify-center h-full w-full">
    <UserProfile />
  </div>
)

export default UserProfilePage
