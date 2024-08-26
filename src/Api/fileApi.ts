import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import uploadResponseModel from '../Interfaces/uploadResponseModel';


const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7047/api/',
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<uploadResponseModel, FormData>({
      query: (formData) => ({
        url: 'storage',
        method: 'POST',
        body: formData,
      }),
    }),
    deleteFile: builder.mutation<string, string>({
      query: (id) => ({
        url: `storage/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: string) => response,
    }),
  }),
});


export const { useUploadFileMutation, useDeleteFileMutation } = fileApi;
export default fileApi;