import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const matchCardApi = createApi({
    reducerPath: "matchCardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["MatchCard"],
    endpoints: (builder) => ({
        getMatchCard: builder.query({
            query: () => ({
              url: "api/MatchCard",
            }),
            providesTags: ["MatchCard"]
          })
        }),
});

export const {
    useGetMatchCardQuery
  } = matchCardApi;
  export default matchCardApi;