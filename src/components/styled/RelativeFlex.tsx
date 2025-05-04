import { PropsWithChildren, Ref } from 'react'
interface IRelativeFlex extends PropsWithChildren {
  ref?:Ref<HTMLDivElement>
  className: string
  onClick?: () => void
}
function RelativeFlex({ref,className,children,onClick}:IRelativeFlex) {
  return (
    <div ref={ref} onClick={onClick} className={` ${className} relative flex`}>
      {children}
    </div>
  )
}

export default RelativeFlex