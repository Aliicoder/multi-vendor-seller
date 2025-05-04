import { motion, MotionProps } from 'framer-motion';
import{ forwardRef, HTMLProps, ReactNode } from 'react'
interface IRelativeFlexRow extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  children?: ReactNode;
}
const RelativeFlexRow = forwardRef<HTMLDivElement,IRelativeFlexRow>(
  ({className,onClick,children},ref)=>
    <motion.div ref={ref} className={` relative flex flex-row ${className} `} onClick={onClick} >
      {children}
    </motion.div>
)

export default RelativeFlexRow