import { motion, MotionProps } from 'framer-motion';
import { HTMLProps, Ref } from 'react'
interface IRelativeFlex extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  ref?:Ref<HTMLDivElement>
  className?: string;
}
function RelativeFlexRowContainer({ref,className,children,...props}:IRelativeFlex) {
  return (
    <motion.div ref={ref} className={`relative mx-auto flex flex-row container ${className} `} {...props}>
      {children}
    </motion.div>
  )
}

export default RelativeFlexRowContainer