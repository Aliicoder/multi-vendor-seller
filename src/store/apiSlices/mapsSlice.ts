import { apiSlice } from "@/store/api/apiSlice"
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCoordinates:builder.mutation({
      query:(credentials)=>{
          return {
            url:"/maps/get-coordinates",
            method:"POST",
            body:credentials
          }
        },
    }),

  })
})
export const {
  useGetCoordinatesMutation
} = categoryApiSlice