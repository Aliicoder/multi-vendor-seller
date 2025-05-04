import { motion, MotionProps } from 'framer-motion'
import { HTMLProps, ReactNode } from 'react'
interface IFrame extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string
  onClick?: () => void
  children?: ReactNode
}
function Frame({className,children,onClick,...props}:IFrame) {
  return (
    <motion.div className={` ${className}`} onClick={onClick} {...props}>
      {children}
    </motion.div>
  )
}

export default Frame