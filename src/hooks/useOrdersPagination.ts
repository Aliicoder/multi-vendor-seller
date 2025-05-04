import { useCallback, useEffect, useState } from "react"
import { ICounter, ORDER_STATUS } from "@/types/types"
import { useGetSellerPaginatedOrdersQuery } from "@/store/apiSlices/orderSlice"
interface IOrdersPagination {
  orderId: string
  perPage?: number
  status?: ORDER_STATUS
  sort?: []
}
const useOrdersPagination = ({
  orderId,
  status,
  sort,
  perPage,
}: IOrdersPagination) => {
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  })
  const { data: response, isLoading } = useGetSellerPaginatedOrdersQuery({
    _id: orderId,
    status,
    curPage: counter.curPage,
    perPage,
    sort,
  }) //console.log("response >>",response)
  const handleLeft = useCallback(() => {
    if (counter.prev > 0)
      setCounter({
        ...counter,
        prev: counter.prev - 1,
        curPage: counter.curPage - 1,
        next: counter.next - 1,
      })
  }, [counter])
  const handleRight = useCallback(() => {
    if (counter.next <= counter.pagesLen)
      setCounter({
        ...counter,
        prev: counter.prev + 1,
        curPage: counter.curPage + 1,
        next: counter.next + 1,
      })
  }, [counter])
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen })
  }, [isLoading])
  return {
    orders: response?.orders,
    counter,
    handleLeft,
    handleRight,
    isLoading,
  }
}
export default useOrdersPagination
