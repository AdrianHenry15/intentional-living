import Link from "next/link"
import React from "react"

interface IFooterItemProps {
  link: string
  setIsOpen: () => void
  title: string
  className?: string
}

const FooterItem = (props: IFooterItemProps) => {
  const { link, setIsOpen, title, className } = props
  return (
    <Link
      href={link}
      onClick={setIsOpen}
      className={`${className} block bg-gray-500 text-center py-2 rounded-lg ease-in-out duration-300 transition-colors hover:bg-gray-800`}>
      {title}
    </Link>
  )
}

export default FooterItem
