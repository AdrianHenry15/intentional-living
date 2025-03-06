import { cn } from "@/lib/utils/utils"
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

export function CardTitle({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <h2
      className={cn(
        "text-lg font-bold text-gray-900 dark:text-gray-100",
        className
      )}>
      {children}
    </h2>
  )
}
