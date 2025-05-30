import { useCallback, useEffect, useState } from "react";
import { ICounter } from "@/types/types";
import { useGetSellerPaginatedOrdersQuery } from "@/store/apiSlices/orderSlice";
import { useDispatch } from "react-redux";
import {
  setAmountGlobalRange,
  setAmountLocalRange,
  setQuantityGlobalRange,
  setQuantityLocalRange,
} from "@/store/Reducers/Filters/ordersFilter";
import { IGetPaginatedOrdersPaginationParams } from "@/types/params";

const useOrdersPagination = ({
  orderId,
  deliveryStatus,
  userId,
  sort,
  perPage,
  curPage,
  amount,
  quantity,
}: IGetPaginatedOrdersPaginationParams) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: curPage || 1,
    next: 2,
    pagesLen: 2,
  });
  const { data: response, isLoading } = useGetSellerPaginatedOrdersQuery({
    orderId,
    userId,
    deliveryStatus,
    curPage: counter.curPage,
    perPage,
    sort,
    amount,
    quantity,
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
      dispatch(setAmountLocalRange({ gte: 0, lte: response?.maxAmount }));
      dispatch(setAmountGlobalRange({ gte: 0, lte: response?.maxAmount }));
    }
  }, [counter]);
  useEffect(() => {
    if (response?.maxQuantity) {
      console.log("response?.maxQuantity >>", response?.maxQuantity);
      dispatch(setQuantityLocalRange({ gte: 0, lte: response?.maxQuantity }));
      dispatch(setQuantityGlobalRange({ gte: 0, lte: response?.maxQuantity }));
    }
  }, [counter]);
  return {
    orders: response?.orders,
    counter,
    handleLeft,
    handleRight,
    isLoading,
  };
};
export default useOrdersPagination;
