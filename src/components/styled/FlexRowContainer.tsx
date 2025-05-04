import { motion, MotionProps } from 'framer-motion';
import { CSSProperties, forwardRef, HTMLProps , ReactNode } from 'react'
interface IFlexRowContainer extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  children?: ReactNode;
  style?:CSSProperties
}
const FlexRowContainer = forwardRef<HTMLDivElement,IFlexRowContainer>(
  ({className,children,style},ref)=>
    <motion.div ref={ref} style={style} className={` ${className} mx-auto container flex flex-row `}>
      {children}
    </motion.div>
) 

export default FlexRowContainer