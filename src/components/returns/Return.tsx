import { cn } from "@/lib/utils"
import { MdArrowBack } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"

const Return = ({
  className,
  withUrl,
}: {
  className?: string
  withUrl?: boolean
}) => {
  const navigate = useNavigate()
  const pathname = useLocation()
    .pathname.split("/")
    .filter(Boolean)
    .slice(0)
    .join("/")
  return (
    <div
      onClick={() => navigate(-1)}
      className={cn(
        "text-fs-13 flex items-center gap-3 hover:underline cursor-pointer",
        className
      )}
    >
      <MdArrowBack />

      {withUrl ? pathname && <span>{pathname}</span> : "Return"}
    </div>
  )
}

export default Return
