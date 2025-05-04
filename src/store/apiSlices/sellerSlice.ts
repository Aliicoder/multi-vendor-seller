import { apiSlice } from "@/store/api/apiSlice"
export const sellerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchDashBoardData:builder.query({
      query:_=>{
        return{
          url:`/seller/dashboard`,
          method:'GET',
        }
      }
    }),
    fetchSellersChunk:builder.mutation({
      query:credentials=>{
        return{
          url:`/seller/chunk?perPage=${credentials.perPage}&&curPage=${credentials.curPage}&&searchValue=${credentials.searchValue}`,
          method:'GET',
        }
      }
    }),
  })
})
export const {
  useFetchSellersChunkMutation,
  useFetchDashBoardDataQuery
} = sellerApiSlice