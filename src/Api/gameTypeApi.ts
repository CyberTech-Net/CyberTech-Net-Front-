import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const gameTypeApi = createApi({
    reducerPath: "gameTypeApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:7050/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["GameTypes"],
    endpoints: (builder) => ({
      getGameItems: builder.query({
        query: () => ({
          url: "api/GameType",
        }),
        providesTags: ["GameTypes"],
      }),
      getGameItemById: builder.query({
        query: (id) => ({
          url: `api/GameType/${id}`,
        }),
        providesTags: ["GameTypes"],
      }),
      createGameItem: builder.mutation({
        query: (data) => ({
          url: "api/GameType",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["GameTypes"],
      }),
      updateGameItem: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/GameType/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["GameTypes"],
      }),
      deleteGameItem: builder.mutation({
        query: (id) => ({
          url: "api/GameType/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["GameTypes"],
      }),
    }),
  });
  
  export const {
    useGetGameItemsQuery,
    useGetGameItemByIdQuery,
    useCreateGameItemMutation,
    useUpdateGameItemMutation,
    useDeleteGameItemMutation,
  } = gameTypeApi;
  export default gameTypeApi;