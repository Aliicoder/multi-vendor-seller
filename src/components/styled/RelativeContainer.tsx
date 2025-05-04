import { motion, MotionProps } from 'framer-motion';
import { HTMLProps, Ref } from 'react'
interface IRelativeContainer extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  ref?:Ref<HTMLDivElement>
  className?: string;
}
function Relative({className,children}:IRelativeContainer) {
  return (
    <motion.div className={` relative container ${className} `}>
      {children}
    </motion.div>
  )
}

export default Relative