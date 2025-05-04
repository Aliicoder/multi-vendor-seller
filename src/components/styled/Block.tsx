import { PropsWithChildren, Ref } from 'react'
interface IBlock extends PropsWithChildren {
  ref?: Ref<HTMLDivElement>;
  className?: string
  onClick?:() => void
}
function Block({ref,className,onClick,children}:IBlock) {
  return (
    <div ref={ref} onClick={onClick} className={` ${className} `}>
      {children}
    </div>
  )
}

export default Block