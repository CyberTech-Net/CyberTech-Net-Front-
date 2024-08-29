import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const gameTypeApi = createApi({
    reducerPath: "gameTypeApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["GameTypes"],
    endpoints: (builder) => ({
      getGameTypes: builder.query({
        query: () => ({
          url: "api/GameType",
        }),
        providesTags: ["GameTypes"],
      }),
      getGameTypeById: builder.query({
        query: (id) => ({
          url: `api/GameType/${id}`,
        }),
        providesTags: ["GameTypes"],
      }),
      createGameType: builder.mutation({
        query: (data) => ({
          url: "api/GameType",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["GameTypes"],
      }),
      updateGameType: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/GameType/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["GameTypes"],
      }),
      deleteGameType: builder.mutation({
        query: (id) => ({
          url: "api/GameType/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["GameTypes"],
      }),
    }),
  });
  
  export const {
    useGetGameTypesQuery,
    useGetGameTypeByIdQuery,
    useCreateGameTypeMutation,
    useUpdateGameTypeMutation,
    useDeleteGameTypeMutation,
  } = gameTypeApi;
  export default gameTypeApi;