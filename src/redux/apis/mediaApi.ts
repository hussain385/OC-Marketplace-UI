/* eslint-disable no-console */
import { baseApi } from '../baseAPI';
import { ILogo, IMedia, IQueryGlobal } from '@/common/interface';

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadUserVerificationMedia: builder.mutation<any, { data: FormData }>({
      query({ data }) {
        return {
          url: `media/uploads`,
          method: 'POST',

          body: data,
        };
      },
      invalidatesTags: [{ type: 'media', id: 'uploads' }],
    }),
    uploadMedia: builder.mutation<{ data: { newMedia: IMedia } }, { data: FormData }>({
      query({ data }) {
        return {
          url: `media/uploads`,
          method: 'POST',

          body: data,
        };
      },
      invalidatesTags: [{ type: 'media', id: 'uploads' }],
    }),
    deleteMedia: builder.mutation<any, { uuid: string }>({
      query({ uuid }) {
        return {
          url: `media/uploads/${uuid}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'media', id: 'uploads' }],
    }),
    getMedias: builder.query<ILogo[], IQueryGlobal>({
      query: (params) => ({
        url: `media/uploads`,
        params,
      }),
      transformResponse: (response: any) => response.data.medias,
    }),
  }),
});

export const { useUploadUserVerificationMediaMutation, useUploadMediaMutation, useDeleteMediaMutation, useGetMediasQuery } =
  mediaApi;
