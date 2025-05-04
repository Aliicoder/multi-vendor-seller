import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"
interface ButtonProps extends PropsWithChildren {
  type?: "submit" | "reset" | "button"
  disabled?: boolean
  className?: string
  theme?: "black" | "white" | "blue" | "red" | "yellow" | "none"
  onClick?: (event: any) => void
  form?: string
}
const styles = {
  white: "text-gray-600 border bg-white border-neutral-100 shadow-sm",
  black: "text-white border bg-black border-natural-100 shadow-sm",
  blue: "text-blue-500 border bg-blue-100 border-natural-100 shadow-sm",
  red: "text-red-500 border bg-red-100 border-natural-100 shadow-sm",
  yellow: "text-yellow-500 border bg-yellow-100 border-natural-100shadow-sm",
  none: "",
}
function CustomButton({
  children,
  className,
  theme = "none",
  disabled = false,
  type,
  onClick,
  form,
}: ButtonProps) {
  return (
    <button
      className={cn("px-3 py-2 rounded-md", styles[theme], className)}
      onClick={onClick}
      form={form}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default CustomButton
