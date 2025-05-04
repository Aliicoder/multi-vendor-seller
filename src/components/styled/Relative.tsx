import { PropsWithChildren } from 'react'
interface IBlock extends PropsWithChildren {
  className?: string
}
function Relative({className,children}:IBlock) {
  return (
    <div className={` ${className} relative `}>
      {children}
    </div>
  )
}

export default Relative