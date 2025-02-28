import { Home, PencilIcon, User, ReceiptIcon, BicepsFlexed } from "lucide-react"

export const getNavItems = (userId?: string) => [
  {
    title: "Tracker",
    link: `/auth/tracker/${userId}`,
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
  {
    title: "Referral",
    link: `/auth/referral/${userId}`,
    icon: ReceiptIcon,
  },
  {
    title: "Profile",
    link: "/auth/profile",
    icon: User,
  },
]
