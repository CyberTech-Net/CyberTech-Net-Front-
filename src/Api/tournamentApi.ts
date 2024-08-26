import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tournamentApi = createApi({
    reducerPath: "tournamentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7050/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["Tournament"],
    endpoints: (builder) => ({
        getTournament: builder.query({
            query: () => ({
              url: "api/Tournament",
            }),
            providesTags: ["Tournament"],
          }),
          getTournamentById: builder.query({
            query: (id) => ({
              url: `api/Tournament/${id}`,
            }),
            providesTags: ["Tournament"],
          }),
          createTournament: builder.mutation({
            query: (data) => ({
              url: "api/Tournament",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Tournament"],
          }),
          updateTournament: builder.mutation({
            query: ({ data, id }) => ({
              url: "api/Tournament/" + id,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Tournament"],
          }),
          deleteTournament: builder.mutation({
            query: (id) => ({
              url: "api/Tournament/" + id,
              method: "DELETE",
            }),
            invalidatesTags: ["Tournament"],
          }),
        }),
});

export const {
    useGetTournamentQuery,
    useGetTournamentByIdQuery,
    useCreateTournamentMutation,
    useUpdateTournamentMutation,
    useDeleteTournamentMutation,
  } = tournamentApi;
  export default tournamentApi;