import { apiSlice } from "../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get books
    getBooks: builder.query({
      query: () => ({
        url: `/books`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),

    // get single book
    getBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Book", id: arg }],
    }),

    // create book
    postBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, usePostBookMutation } =
  bookApi;
