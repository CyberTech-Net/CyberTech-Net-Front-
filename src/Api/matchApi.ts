import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const matchApi = createApi({
    reducerPath: "matchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["Match"],
    endpoints: (builder) => ({
        getMatches: builder.query({
            query: () => ({
              url: "api/Match",
            }),
            providesTags: ["Match"],
          }),
          getMatchById: builder.query({
            query: (id) => ({
              url: `api/Match/${id}`,
            }),
            providesTags: ["Match"],
          }),
          createMatch: builder.mutation({
            query: (data) => ({
              url: "api/Match",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Match"],
          }),
          updateMatch: builder.mutation({
            query: ({ data, id }) => ({
              url: "api/Match/" + id,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Match"],
          }),
          deleteMatch: builder.mutation({
            query: (id) => ({
              url: "api/Match/" + id,
              method: "DELETE",
            }),
            invalidatesTags: ["Match"],
          }),
        }),
});

export const {
    useGetMatchesQuery,
    useGetMatchByIdQuery,
    useCreateMatchMutation,
    useUpdateMatchMutation,
    useDeleteMatchMutation,
  } = matchApi;
  export default matchApi;