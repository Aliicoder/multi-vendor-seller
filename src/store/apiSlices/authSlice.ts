import { apiSlice } from "@/store/api/apiSlice";
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
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/users/google-login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendEmailOtp: builder.mutation({
      query: (credentials) => ({
        url: `/users/send-email-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: (credentials) => ({
        url: `/users/verify-email-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/users/logout",
          method: "PATCH",
        };
      },
    }),
    onboarding: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials.userId}/onboarding`,
        method: "POST",
        body: credentials,
      }),
    }),
    fetchProfile: builder.query({
      query: () => ({
        url: "/seller/profile",
        method: "GET",
      }),
    }),
    editGeneralInfo: builder.mutation({
      query: () => {
        return {
          url: "/seller/generalInfo",
          method: "POST",
          body: true,
        };
      },
    }),
    editShopInfo: builder.mutation({
      query: (credentials) => {
        return {
          url: "/seller/businessInfo",
          method: "POST",
          body: credentials,
        };
      },
    }),
  }),
});
export const {
  useRefreshMutation,
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useLoginMutation,
  useFetchProfileQuery,
  useEditGeneralInfoMutation,
  useOnboardingMutation,
  useEditShopInfoMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
} = authApiSlice;
