import { PropsWithChildren } from 'react'
interface IText extends PropsWithChildren {
  className?: string
}
function SpanText({className,children}:IText) {
  return (
    <span className={` ${className}`}>
      {children}
    </span>
  )
}

export default SpanText