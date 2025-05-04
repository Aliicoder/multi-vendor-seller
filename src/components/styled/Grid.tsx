import { motion, MotionProps } from 'framer-motion';
import{ CSSProperties, HTMLProps } from 'react'
interface IGrid extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  style?:CSSProperties
}
function Grid({className,style,children}:IGrid) {
  return (
    <motion.div style={style} className={` grid ${className} `}>
      {children}
    </motion.div>
  )
}

export default Grid