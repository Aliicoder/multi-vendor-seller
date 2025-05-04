import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { setCredentials, logout } from "@/store/Reducers/authReducer"
import { RootState } from "@/store"
import toast from "react-hot-toast"
import { AuthResponse, HttpStatus } from "@/types/types"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const { accessToken } = state.auth //console.log("(apiSlice) access token to be sent >>",accessToken);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`) //console.log('Authorization header set:', headers.get('authorization'));
    }
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let response: any = await baseQuery(args, api, extraOptions)
  console.log("response ", response)
  switch (response?.error?.originalStatus || response?.error?.status) {
    case HttpStatus.FORBIDDEN:
      const refreshResult = await baseQuery("/users/refresh", api, extraOptions)
      if (refreshResult.data) {
        const { user } = refreshResult.data as AuthResponse
        if (user) {
          api.dispatch(setCredentials(user))
        } else {
          api.dispatch(setCredentials({ user: "", token: "" }))
        }
        response = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logout())
      }
      break

    case HttpStatus.UNAUTHORIZED:
      toast.error("Unauthorized access. Please log in.")
      api.dispatch(logout())
      break
  }

  return response
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chats", "Messages", "Products"],
  endpoints: () => ({}),
})
