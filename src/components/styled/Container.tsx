import { motion , MotionProps } from 'framer-motion'
import { forwardRef } from 'react'
interface IContainer extends MotionProps {
  className?: string
}
const Container = forwardRef<HTMLDivElement,IContainer>( 
  ({className,children,...props},ref) => 
    <motion.div ref={ref}
      className={`container mx-auto ${className}`}
      {...props}
      >
      {children}
    </motion.div>
)

export default Container