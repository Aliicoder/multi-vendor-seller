import { useCallback, useEffect, useState } from "react"
import { useGetPaginatedCategoriesQuery } from "@/store/apiSlices/categorySlice"
import { ICounter } from "@/types/types"
interface ICategoriesPagination {
  name: string
  perPage: number
  sort?: Object
  level: number
}

const useCategoriesPagination = ({
  name,
  perPage,
  level,
}: ICategoriesPagination) => {
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  })
  const { data: response, isLoading } = useGetPaginatedCategoriesQuery(
    { name, level, curPage: counter.curPage, perPage },
    {
      skip: name.length <= 1,
    }
  )
  const handleLeft = useCallback(() => {
    if (counter.prev > 0) {
      setCounter({
        ...counter,
        prev: counter.prev - 1,
        curPage: counter.curPage - 1,
        next: counter.next - 1,
      })
    }
  }, [counter])
  const handleRight = useCallback(() => {
    if (counter.next <= counter.pagesLen) {
      setCounter({
        ...counter,
        prev: counter.prev + 1,
        curPage: counter.curPage + 1,
        next: counter.next + 1,
      })
    }
  }, [counter])
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen })
  }, [isLoading])
  return {
    categories: response?.categories,
    counter,
    handleLeft,
    handleRight,
    isLoading,
  }
}
export default useCategoriesPagination
