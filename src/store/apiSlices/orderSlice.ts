import { apiSlice } from "@/store/api/apiSlice"
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerPaginatedOrders: builder.query({
      query: ({ _id, status, perPage, curPage, sort }) => {
        const queryString = [
          _id ? `_id=${_id}` : ``,
          status ? `status=${status}` : ``,
          curPage ? `curPage=${curPage}` : ``,
          perPage ? `perPage=${perPage}` : ``,
          sort ? `sort=${sort}` : ``,
        ]
          .filter(Boolean)
          .join("&&")
        console.log(queryString)
        return `/orders/paginated/seller?${queryString}`
      },
    }),
    confirmOrder: builder.mutation({
      query: ({ orderId }) => {
        return {
          url: `/order/confirm/${orderId}`,
          method: "PATCH",
        }
      },
    }),
    // FetchOrder:builder.mutation({
    //   query:credentials=>{console.log("FetchProduct credentials>>",credentials)
    //     return{
    //       url:`/product?productId=${credentials.productId}`,
    //       method:'GET',
    //     }
    //   }
    // }),
    // updateOrder:builder.mutation({
    //   query:credentials=>{console.log("FetchProduct credentials>>",credentials)
    //     const formData = formidable(credentials)
    //     return{
    //       url:`/product?productId=${credentials.productId}`,
    //       method:'PATCH',
    //       body:formData
    //     }
    //   }
    // }),
    // deleteOrder:builder.mutation({
    //   query:credentials=>{console.log("FetchProduct credentials>>",credentials)
    //     return{
    //       url:`/product?productId=${credentials._id}`,
    //       method:'DELETE',
    //     }
    //   }
    // })
  }),
})
export const { useGetSellerPaginatedOrdersQuery, useConfirmOrderMutation } =
  productApiSlice
