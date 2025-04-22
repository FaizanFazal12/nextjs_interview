import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type  { GetAllFormData ,getFormData ,FormData } from '../../../types';

export const submissionsApi = createApi({
  reducerPath: 'submissionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Forms'],
  endpoints: (builder) => ({
    getSubmissions: builder.query<GetAllFormData, void>({
      query: () => '/form',
      providesTags: ['Forms'],
    }),
    getSubmissionById: builder.query<getFormData, string>({
      query: (id) => `/form/${id}`,
      providesTags: ['Forms'],
    }),
    createSubmission: builder.mutation<getFormData, getFormData & { resumeFile?: File | null }>({
      query: ({ resumeFile, ...data }) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data)); 
        if (resumeFile) {
          formData.append('resume', resumeFile);
        }
        return {
          url: '/form',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Forms'],
    }),
    updateSubmission: builder.mutation<getFormData, { id: string; data: Partial<FormData> & { resumeFile?: File | null } }>({
      query: ({ id,  data }) => {
        const formData = new FormData();
        const { resumeFile ,...body} = data;
        formData.append('data', JSON.stringify(body));
        if (resumeFile) {
          formData.append('resume', resumeFile);
        }
  
        return {
          url: `/form/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
    }),
    deleteSubmission: builder.mutation<void, string>({
      query: (id) => ({
        url: `/form/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Forms'],
    }),
  }),
});

export const {
  useGetSubmissionsQuery,
  useGetSubmissionByIdQuery,
  useCreateSubmissionMutation,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} = submissionsApi;