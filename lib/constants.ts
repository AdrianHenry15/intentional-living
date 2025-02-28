import { Home, List, User, Bookmark, Activity } from "lucide-react"

export const getNavItems = (userId?: string) => [
  {
    title: "Tracker",
    link: `/tracker/${userId}`,
    icon: Activity,
  },
  {
    title: "Notes",
    link: `/notes/`,
    icon: Bookmark,
  },
  {
    title: "Home",
    link: `/`,
    icon: Home,
  },
  {
    title: "Referral",
    link: `/referral`,
    icon: List,
  },
  {
    title: "Profile",
    link: `/user-profile/${userId}`,
    icon: User,
  },
]
