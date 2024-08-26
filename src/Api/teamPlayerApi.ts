import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const teamPlayerApi = createApi({
    reducerPath: "teamplayerApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:7050/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["TeamPlayer"],
    endpoints: (builder) => ({
      getTeamPlayer: builder.query({
        query: () => ({
          url: "api/TeamPlayer",
        }),
        providesTags: ["TeamPlayer"],
      }),
      getTeamPlayerById: builder.query({
        query: (id) => ({
          url: `api/TeamPlayer/${id}`,
        }),
        providesTags: ["TeamPlayer"],
      }),
      createTeamPlayer: builder.mutation({
        query: (data) => ({
          url: "api/TeamPlayer",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["TeamPlayer"],
      }),
      updateTeamPlayer: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/TeamPlayer/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["TeamPlayer"],
      }),
      deleteTeamPlayer: builder.mutation({
        query: (id) => ({
          url: "api/TeamPlayer/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["TeamPlayer"],
      }),
    }),
  });
  
  export const {
    useGetTeamPlayerQuery,
    useGetTeamPlayerByIdQuery,
    useCreateTeamPlayerMutation,
    useUpdateTeamPlayerMutation,
    useDeleteTeamPlayerMutation,
  } = teamPlayerApi;
  export default teamPlayerApi;