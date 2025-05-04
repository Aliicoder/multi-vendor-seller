import useSegment from '@/hooks/useSegment'
import { Link } from 'react-router-dom'

function OrdersNavBar() {
  const secondSegment = useSegment(2)

  return (
    <div className="flex">
      <Link to={"/orders/pending"} className={`${secondSegment === "pending" ? "bg-yellow-200" : ""} p-[6%]`}>
        Pending 
      </Link>
      <Link to={"/orders/active"} className={`${secondSegment === "active" ? "bg-blue-200" : ""} p-[6%]`}>
        Active
      </Link>
      <Link to={"/orders/settled"} className={`${secondSegment === "settled" ? "bg-green-200" : ""} p-[6%]`}>
        Settled
      </Link>
    </div>
  )
}

export default OrdersNavBar