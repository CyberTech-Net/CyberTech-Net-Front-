import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const teamRatingApi = createApi({
    reducerPath: "teamRatingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["TeamRating"],
    endpoints: (builder) => ({
        getTeamRating: builder.query({
            query: () => ({
              url: "api/TeamRating",
            }),
            providesTags: ["TeamRating"]
          })
        }),
});

export const {
    useGetTeamRatingQuery
  } = teamRatingApi;
  export default teamRatingApi;