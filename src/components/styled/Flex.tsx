import { MotionProps } from 'framer-motion';
import{ HTMLProps , ReactNode, Ref } from 'react'
interface IFlex extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  ref?:Ref<HTMLDivElement>
  className?: string;
  children?: ReactNode
}
function Flex({className,children,onClick}:IFlex) {
  return (
    <div className={` ${className} flex `} onClick={onClick}>
      {children}
    </div>
  )
}

export default Flex