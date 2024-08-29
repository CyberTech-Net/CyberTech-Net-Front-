import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const teamApi = createApi({
    reducerPath: "teamApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["Team"],
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => ({
              url: "api/Team",
            }),
            providesTags: ["Team"],
          }),
          getTeamById: builder.query({
            query: (id) => ({
              url: `api/Team/${id}`,
            }),
            providesTags: ["Team"],
          }),
          createTeam: builder.mutation({
            query: (data) => ({
              url: "api/Team",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Team"],
          }),
          updateTeam: builder.mutation({
            query: ({ data, id }) => ({
              url: "api/Team/" + id,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Team"],
          }),
          deleteTeam: builder.mutation({
            query: (id) => ({
              url: "api/Team/" + id,
              method: "DELETE",
            }),
            invalidatesTags: ["Team"],
          }),
        }),
});

export const {
    useGetTeamsQuery,
    useGetTeamByIdQuery,
    useCreateTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
  } = teamApi;
  export default teamApi;