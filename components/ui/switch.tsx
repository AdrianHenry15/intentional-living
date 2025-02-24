"use client"

import * as React from "react"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({ checked, onCheckedChange, ...props }: SwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="sr-only peer"
        {...props}
      />
      <div className="w-10 h-5 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1/2 after:left-1 after:-translate-y-1/2 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
  )
}
