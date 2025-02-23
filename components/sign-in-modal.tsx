import { SignIn } from "@clerk/nextjs"
import React from "react"

interface ISignInModalProps {
  setShowSignIn: (item: boolean) => void
}

const SignInModal = (props: ISignInModalProps) => {
  const { setShowSignIn } = props
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              card: "bg-white p-6 rounded-lg shadow-lg",
              formFieldInput: "border border-gray-300 rounded-md p-2",
              formFieldLabel: "text-sm font-medium text-gray-700",
              headerTitle: "text-xl font-bold text-center mb-4",
              headerSubtitle: "text-sm text-gray-500 text-center",
            },
          }}
        />
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setShowSignIn(false)}>
          ✕
        </button>
      </div>
    </div>
  )
}

export default SignInModal
