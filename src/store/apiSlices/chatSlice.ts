import { apiSlice } from "@/store/api/apiSlice"
export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: (credentials) => {
        return {
          url: `/chats?userType=${credentials.userType}`,
          method: "GET",
        }
      },
      providesTags: ["Chats"],
    }),
    establishChat: builder.mutation({
      query: (credentials) => {
        return {
          url: `/chats`,
          method: "POST",
          body: credentials,
        }
      },
    }),
    getChatMessages: builder.query({
      query: (credentials) => {
        return {
          url: `/chats/${credentials.chatId}`,
          method: "GET",
        }
      },
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation({
      query: (credentials) => {
        return {
          url: `/chats/${credentials.chatId}`,
          method: "POST",
          body: {
            message: credentials.message,
            receiverId: credentials.receiverId,
          },
        }
      },
      invalidatesTags: ["Chats"],
    }),
  }),
})
export const {
  useGetChatsQuery,
  useGetChatMessagesQuery,
  useEstablishChatMutation,
  useAddMessageMutation,
} = chatApiSlice
