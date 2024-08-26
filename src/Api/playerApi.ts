import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const playerApi = createApi({
    reducerPath: "playerApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["Players"],
    endpoints: (builder) => ({
      getPlayers: builder.query({
        query: () => ({
          url: "api/Player",
        }),
        providesTags: ["Players"],
      }),
      getPlayerById: builder.query({
        query: (id) => ({
          url: `api/Player/${id}`,
        }),
        providesTags: ["Players"],
      }),
      createPlayer: builder.mutation({
        query: (data) => ({
          url: "api/Player",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Players"],
      }),
      updatePlayer: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/Player/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Players"],
      }),
      deletePlayer: builder.mutation({
        query: (id) => ({
          url: "api/Player/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Players"],
      }),
    }),
  });
  
  export const {
    useGetPlayersQuery,
    useGetPlayerByIdQuery,
    useCreatePlayerMutation,
    useUpdatePlayerMutation,
    useDeletePlayerMutation,
  } = playerApi;
  export default playerApi;