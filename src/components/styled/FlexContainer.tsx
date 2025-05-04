import { CSSProperties, PropsWithChildren, Ref } from 'react'
interface IFlexContainer extends PropsWithChildren {
  ref?: Ref<HTMLDivElement>
  className: string
  style: CSSProperties
}
function FlexContainer({ref,className,style,children}:IFlexContainer) {
  return (
    <div ref={ref} style={style} className={` ${className} mx-auto container flex  `}>
      {children}
    </div>
  )
}

export default FlexContainer