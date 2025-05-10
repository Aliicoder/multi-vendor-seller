import { apiSlice } from "@/store/api/apiSlice";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerPaginatedOrders: builder.query({
      query: ({
        orderId,
        userId,
        deliveryStatus,
        perPage,
        curPage,
        sort,
        amount,
        quantity,
      }) => {
        const queryString = [
          orderId ? `_id=${orderId}` : ``,
          userId ? `sellerId=${userId}` : ``,
          deliveryStatus ? `deliveryStatus=${deliveryStatus}` : ``,
          curPage ? `curPage=${curPage}` : ``,
          perPage ? `perPage=${perPage}` : ``,
          sort ? `sort=${sort}` : ``,
          amount?.gte ? `amount[gte]=${amount.gte}` : ``,
          amount?.lte || amount?.lte === 0 ? `amount[lte]=${amount.lte}` : ``,
          quantity?.gte ? `quantity[gte]=${quantity.gte}` : ``,
          quantity?.lte || quantity?.lte === 0
            ? `quantity[lte]=${quantity.lte}`
            : ``,
        ]
          .filter(Boolean)
          .join("&&");
        return `/orders/paginated?${queryString}`;
      },
    }),
    confirmOrder: builder.mutation({
      query: ({ orderId }) => {
        return {
          url: `/order/confirm/${orderId}`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const { useGetSellerPaginatedOrdersQuery, useConfirmOrderMutation } =
  productApiSlice;
