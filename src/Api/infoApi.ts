import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const infoApi = createApi({
    reducerPath: "infoApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["Info"],
    endpoints: (builder) => ({
      getInfo: builder.query({
        query: () => ({
          url: "api/Info",
        }),
        providesTags: ["Info"],
      }),
      getInfoById: builder.query({
        query: (id) => ({
          url: `api/Info/${id}`,
        }),
        providesTags: ["Info"],
      }),
      createInfo: builder.mutation({
        query: (data) => ({
          url: "api/Info",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Info"],
      }),
      updateInfo: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/Info/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Info"],
      }),
      deleteInfo: builder.mutation({
        query: (id) => ({
          url: "api/Info/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Info"],
      }),
    }),
  });
  
  export const {
    useGetInfoQuery,
    useGetInfoByIdQuery,
    useCreateInfoMutation,
    useUpdateInfoMutation,
    useDeleteInfoMutation,
  } = infoApi;
  export default infoApi;