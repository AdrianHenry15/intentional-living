import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles =
      "px-6 py-3 text-lg font-medium rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"

    const variants = {
      default: "bg-indigo-500 text-white hover:bg-indigo-600",
      outline:
        "border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
      ghost: "text-indigo-500 hover:bg-indigo-100",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
