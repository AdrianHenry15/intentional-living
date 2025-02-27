export const getNavItems = (userId?: string) => [
  {
    title: "Tracker",
    link: `/tracker/${userId}`,
  },
  {
    title: "Notes",
    link: `/notes/${userId}`,
  },
  {
    title: "Quiz",
    link: `/quiz/${userId}`, // No userId needed
  },
  {
    title: "Blog",
    link: "/blog", // No userId needed
  },
  {
    title: "About",
    link: "/about", // No userId needed
  },
]
