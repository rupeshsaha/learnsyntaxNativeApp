import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://new.learnsyntax.com/api",
    prepareHeaders:async (headers) => {
      const token =await AsyncStorage.getItem("token");
      console.log(token)
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (build) => ({
    // Auth related api

    signup: build.mutation({
      query: ({ first_name, last_name, contact_no, email, password }) => ({
        url: `auth/signup/`,
        method: "POST",
        body: {
          first_name,
          last_name,
          contact_no,
          email,
          password,
        },
      }),
    }),

    login: build.mutation({
      query: ({ email, password }) => ({
        url: `auth/login/`,
        method: "POST",
        body: { email, password },
      }),
    }),

    verifySignupOtp: build.mutation({
      query: async ({ otp }) => ({
        url: `auth/verify_signup_otp/`,
        method: "POST",
        body: {
          session_id: await AsyncStorage.getItem("session_id"),
          otp,
        },
      }),
    }),

    forgetPassword: build.mutation({
      query: ({ email }) => ({
        url: `auth/forget_password`,
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: build.mutation({
      query: ({ otp, email, new_password }) => ({
        url: `auth/reset_password`,
        method: "POST",
        body: { email, otp, new_password },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifySignupOtpMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = api;
