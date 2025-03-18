import { Home, PencilIcon, User, ReceiptIcon, BicepsFlexed } from "lucide-react"
import { GoalType } from "./types"

export const getNavItems = () => [
  {
    title: "Tracker",
    link: `/auth/tracker`,
    icon: BicepsFlexed,
  },
  {
    title: "Notes",
    link: `/auth/notes`,
    icon: PencilIcon,
  },
  {
    title: "Home",
    link: `/`,
    icon: Home,
  },
  // {
  //   title: "Referral",
  //   link: `/auth/referrals`,
  //   icon: ReceiptIcon,
  // },
  {
    title: "Profile",
    link: "/user-profile",
    icon: User,
  },
]

export const primaryGoals: GoalType[] = [
  { id: 1, title: "Diet", completed_days: 0 },
  { id: 2, title: "Exercise", completed_days: 0 },
  { id: 3, title: "Sugar Intake", completed_days: 0 },
  { id: 4, title: "Mental Strength", completed_days: 0 },
]
