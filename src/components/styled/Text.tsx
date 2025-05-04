import { motion, MotionProps } from 'framer-motion'
import { HTMLProps } from 'react'
interface IText extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
}
function Text({className,children,...props}:IText) {
  return (
    <motion.div className={` ${className}`} {...props}>
      {children}
    </motion.div>
  )
}

export default Text