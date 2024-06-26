import { apiSlice } from "../api/apiSlice";
import { login } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register func
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data.token) {
            dispatch(login(result.data));
          }
        } catch (error) {}
      },
    }),
    // login func
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data.token) {
            dispatch(login(result.data));
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
