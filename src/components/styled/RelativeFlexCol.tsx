import { motion, MotionProps } from 'framer-motion';
import { HTMLProps, Ref } from 'react'
interface IRelativeFlex extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  ref?:Ref<HTMLDivElement>
  className?: string;
}
function RelativeFlexCol({ref,className,children,...props}:IRelativeFlex) {
  return (
    <motion.div ref={ref} className={`relative flex flex-col ${className} `} {...props}>
      {children}
    </motion.div>
  )
}

export default RelativeFlexCol