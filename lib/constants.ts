import { Home, PencilIcon, User, ReceiptIcon, BicepsFlexed } from "lucide-react"

export const getNavItems = (userId?: string) => [
  {
    title: "Tracker",
    link: `/tracker/${userId}`,
    icon: BicepsFlexed,
  },
  {
    title: "Notes",
    link: `/notes/`,
    icon: PencilIcon,
  },
  {
    title: "Home",
    link: `/`,
    icon: Home,
  },
  {
    title: "Referral",
    link: `/referral`,
    icon: ReceiptIcon,
  },
  {
    title: "Profile",
    link: `/user-profile/${userId}`,
    icon: User,
  },
]
