import { motion, MotionProps } from 'framer-motion';
import{ HTMLProps, ReactNode } from 'react'
interface IFlexRow extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  children?: ReactNode;
}
function FlexRow({className,onClick,children}:IFlexRow) {
  return (
    <motion.div onClick={onClick} className={` flex flex-row ${className} `}>
      {children}
    </motion.div>
  )
}

export default FlexRow