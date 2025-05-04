import { PropsWithChildren, Ref } from 'react'
interface IAbsolute extends PropsWithChildren {
  ref?:Ref<HTMLDivElement>
  className: string
  onClick?: () => void
}
function Absolute({ref,className,children,onClick}:IAbsolute) {
  return (
    <div ref={ref} onClick={onClick} className={` ${className} absolute`}>
      {children}
    </div>
  )
}

export default Absolute