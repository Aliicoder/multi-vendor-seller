import { motion, MotionProps } from 'framer-motion'
import { HTMLProps } from 'react'
interface ISlide extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
}
function Slide({className,children,...props}:ISlide) {
  return (
    <motion.div className={` ${className}`} {...props}>
      {children}
    </motion.div>
  )
}

export default Slide