import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 rounded-xl shadow-md p-4",
        className
      )}>
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("border-b pb-2 mb-4 text-lg font-semibold", className)}>
      {children}
    </div>
  )
}

export function CardContent({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn("space-y-4", className)}>{children}</div>
}
