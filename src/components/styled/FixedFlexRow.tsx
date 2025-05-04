import { motion, MotionProps } from 'framer-motion';
import{ forwardRef, HTMLProps, ReactNode } from 'react'
interface IFixedFlexRow extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  children?: ReactNode;
}
const FixedFlexRow = forwardRef<HTMLDivElement,IFixedFlexRow>(
  ({children,onClick,className},ref)=>
    <motion.div ref={ref} onClick={onClick} className={` fixed flex flex-row ${className} `}>
      {children}
    </motion.div>
) 

export default FixedFlexRow