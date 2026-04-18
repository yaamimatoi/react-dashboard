import { ButtonHTMLAttributes, forwardRef } from "react"

type Variant = "primary" | "secondary" | "danger"
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

const styles: Record<Variant, string> = {
  primary:   "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "border border-gray-300 text-gray-800 hover:bg-gray-50",
  danger:    "bg-red-600 text-white hover:bg-red-700",
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", loading, disabled, children, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${styles[variant]} ${(disabled || loading) ? "opacity-50 cursor-not-allowed" : ""}`}
      {...rest}
    >
      {loading ? "…" : children}
    </button>
  )
)
Button.displayName = "Button"
