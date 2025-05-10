import { useCallback, useEffect, useState } from "react";

import { useGetPaginatedProductsQuery } from "@/store/apiSlices/productSlice";
import { ICounter } from "@/types/types";
import {
  setPriceGlobalRange,
  setPriceLocalRange,
  setRatingGlobalRange,
  setRatingLocalRange,
  setSalesGlobalRange,
  setSalesLocalRange,
  setStockGlobalRange,
  setStockLocalRange,
} from "@/store/Reducers/Filters/productsFilter";
import { useDispatch } from "react-redux";
interface IRange {
  gte: number;
  lte: number;
}
interface IProductsPagination {
  name?: string;
  sellerId: string;
  perPage?: number;
  category?: string;
  outOfStock?: boolean;
  sort?: [];
  price?: IRange;
  stock?: IRange;
  sales?: IRange;
  rating?: IRange;
}
const useProductsPagination = ({
  name,
  sellerId,
  perPage,
  sort,
  price,
  stock,
  sales,
  rating,
}: IProductsPagination) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  });
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetPaginatedProductsQuery(
    {
      name,
      sellerId,
      curPage: counter.curPage,
      perPage,
      sort,
      price,
      stock,
      sales,
      rating,
    },
    {
      skip: !Boolean(sellerId),
    }
  );
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
    if (response?.maxPrice) {
      dispatch(setPriceLocalRange({ gte: 0, lte: response?.maxPrice }));
      dispatch(setPriceGlobalRange({ gte: 0, lte: response?.maxPrice }));
    }
  }, [counter]);
  useEffect(() => {
    if (response?.maxStock) {
      dispatch(setStockLocalRange({ gte: 0, lte: response?.maxStock }));
      dispatch(setStockGlobalRange({ gte: 0, lte: response?.maxStock }));
    }
  }, [counter]);
  useEffect(() => {
    if (response?.maxSales) {
      dispatch(setSalesLocalRange({ gte: 0, lte: response?.maxSales }));
      dispatch(setSalesGlobalRange({ gte: 0, lte: response?.maxSales }));
    }
  }, [counter]);
  useEffect(() => {
    dispatch(setRatingLocalRange({ gte: 0, lte: 5 }));
    dispatch(setRatingGlobalRange({ gte: 0, lte: 5 }));
  }, []);
  return {
    products: response?.products,
    counter,
    handleLeft,
    handleRight,
    isLoading,
    refetch,
  };
};
export default useProductsPagination;
