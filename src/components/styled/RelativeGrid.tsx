import { motion, MotionProps } from 'framer-motion';
import{ CSSProperties, HTMLProps } from 'react'
interface IRelativeGrid extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  style?:CSSProperties
}
function RelativeGrid({className,style,children}:IRelativeGrid) {
  return (
    <motion.div style={style} className={` relative grid ${className} `}>
      {children}
    </motion.div>
  )
}

export default RelativeGrid