import { useCallback, useEffect, useState } from "react";
import { ICounter } from "@/types/types";
import { useGetSellerPaginatedTransactionsQuery } from "@/store/apiSlices/TransactionSlice";
import {
  setAmountGlobalRange,
  setAmountLocalRange,
} from "@/store/Reducers/Filters/transactionsFilter";
import { useDispatch } from "react-redux";
interface IOrdersPagination {
  _id: string;
  sellerId?: string;
  perPage?: number;
  sort?: [];
  curPage?: number;
  amount?: { gte: number; lte: number };
  currency?: string;
  method?: string;
}
const useTransactionsPagination = ({
  _id,
  sellerId,
  sort,
  perPage,
  curPage,
  amount,
  currency,
  method,
}: IOrdersPagination) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: curPage || 1,
    next: 2,
    pagesLen: 2,
  });
  const { data: response, isLoading } = useGetSellerPaginatedTransactionsQuery({
    _id,
    sellerId,
    curPage: counter.curPage,
    perPage,
    sort,
    amount,
    currency,
    method,
  });
  const handleLeft = useCallback(() => {
    if (counter.prev > 0)
      setCounter({
        ...counter,
        prev: counter.prev - 1,
        curPage: counter.curPage - 1,
        next: counter.next - 1,
      });
  }, [counter]);
  const handleRight = useCallback(() => {
    if (counter.next <= counter.pagesLen)
      setCounter({
        ...counter,
        prev: counter.prev + 1,
        curPage: counter.curPage + 1,
        next: counter.next + 1,
      });
  }, [counter]);
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen });
  }, [isLoading]);
  useEffect(() => {
    if (response?.maxAmount) {
      dispatch(setAmountGlobalRange({ gte: 0, lte: response?.maxAmount }));
      dispatch(setAmountLocalRange({ gte: 0, lte: response?.maxAmount }));
    }
  }, [response?.maxAmount]);
  return {
    transactions: response?.transactions,
    counter,
    handleLeft,
    handleRight,
    isLoading,
  };
};
export default useTransactionsPagination;
