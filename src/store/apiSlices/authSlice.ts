import { apiSlice } from "@/store/api/apiSlice"
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/users/logout",
          method: "PATCH",
        }
      },
    }),
    fetchProfile: builder.query({
      query: () => ({
        url: "/seller/profile",
        method: "GET",
      }),
    }),
    editGeneralInfo: builder.mutation({
      query: (credentials) => {
        return {
          url: "/seller/generalInfo",
          method: "POST",
          body: true,
        }
      },
    }),
    editShopInfo: builder.mutation({
      query: (credentials) => {
        return {
          url: "/seller/businessInfo",
          method: "POST",
          body: credentials,
        }
      },
    }),
  }),
})
export const {
  useRefreshMutation,
  useSignupMutation,
  useLoginMutation,
  useFetchProfileQuery,
  useEditGeneralInfoMutation,
  useEditShopInfoMutation,
  useLogoutMutation,
} = authApiSlice
