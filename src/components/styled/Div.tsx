import { motion, MotionProps } from 'framer-motion'
import { HTMLProps } from 'react'
interface IDiv extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
}
function Div({className,children,...props}:IDiv) {
  return (
    <motion.div className={` ${className}`} {...props}>
      {children}
    </motion.div>
  )
}

export default Div