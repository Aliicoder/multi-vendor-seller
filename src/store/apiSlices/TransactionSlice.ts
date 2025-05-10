import { apiSlice } from "@/store/api/apiSlice";
export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerPaginatedTransactions: builder.query({
      query: ({
        _id,
        sellerId,
        perPage,
        curPage,
        sort,
        amount,
        currency,
        method,
      }) => {
        const queryString = [
          _id ? `_id=${_id}` : ``,
          sellerId ? `sellerId=${sellerId}` : ``,
          curPage ? `curPage=${curPage}` : ``,
          perPage ? `perPage=${perPage}` : ``,
          sort ? `sort=${sort}` : ``,
          amount && amount?.gte ? `amount[gte]=${amount.gte}` : ``,
          amount && (amount?.lte || amount?.lte === 0)
            ? `amount[lte]=${amount.lte}`
            : ``,
          currency ? `currency=${currency}` : ``,
          method ? `method=${method}` : ``,
        ]
          .filter(Boolean)
          .join("&&");
        console.log(queryString);
        return `/transactions/paginated?${queryString}`;
      },
    }),
  }),
});
export const { useGetSellerPaginatedTransactionsQuery } = transactionApiSlice;
