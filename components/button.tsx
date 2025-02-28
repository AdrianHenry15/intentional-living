import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../lib/utils/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles =
      "px-6 py-3 text-lg font-medium rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"

    const variants = {
      default: "bg-yellow-400 text-white hover:bg-yellow-400/50",
      outline:
        "border border-yellow-500 text-yellow-500 hover:bg-yellow-400 hover:text-white",
      ghost: "text-yellow-500 hover:bg-yellow-100",
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
