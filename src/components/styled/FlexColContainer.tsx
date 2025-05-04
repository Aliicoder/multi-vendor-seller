import { motion, MotionProps } from 'framer-motion'
import { HTMLProps } from 'react'
interface IFlexColContainer extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
}
function FlexColContainer({className,children,...props}:IFlexColContainer) {
  return (
    <motion.div className={`mx-auto container flex flex-col ${className}`} {...props}>
      {children}
    </motion.div>
  )
}

export default FlexColContainer