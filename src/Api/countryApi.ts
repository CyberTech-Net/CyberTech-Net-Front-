import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countryApi = createApi({
    reducerPath: "countryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["Countries"],
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => ({
              url: "api/Country",
            }),
            providesTags: ["Countries"],
          }),
          getCountriesById: builder.query({
            query: (id) => ({
              url: `api/Country/${id}`,
            }),
            providesTags: ["Countries"],
          }),
          createCountry: builder.mutation({
            query: (data) => ({
              url: "api/Country",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Countries"],
          }),
          updateCountry: builder.mutation({
            query: ({ data, id }) => ({
              url: "api/Country/" + id,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Countries"],
          }),
          deleteCountry: builder.mutation({
            query: (id) => ({
              url: "api/Country/" + id,
              method: "DELETE",
            }),
            invalidatesTags: ["Countries"],
          }),
        }),
});

export const {
    useGetCountriesQuery,
    useGetCountriesByIdQuery,
    useCreateCountryMutation,
    useUpdateCountryMutation,
    useDeleteCountryMutation,
  } = countryApi;
  export default countryApi;