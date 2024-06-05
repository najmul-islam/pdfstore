import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get user
    getUser: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),

    // put user
    putUser: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
    }),

    // get drive
    getDrives: builder.query({
      query: () => ({
        url: "/user/drives",
        method: "GET",
      }),
    }),

    // put drive
    putDrive: builder.mutation({
      query: (bookId) => ({
        url: `/user/drives/${bookId}`,
        method: "PUT",
      }),
    }),

    // get likes
    getLikes: builder.query({
      query: () => ({
        url: `/user/likes`,
        method: "GET",
      }),
    }),

    // put like
    putLike: builder.mutation({
      query: (bookId) => ({
        url: `/user/likes/${bookId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  usePutUserMutation,
  useGetDrivesQuery,
  usePutDriveMutation,
  useGetLikesQuery,
  usePutLikeMutation,
} = userApi;
