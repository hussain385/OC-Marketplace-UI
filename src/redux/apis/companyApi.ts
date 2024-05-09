import { baseApi } from '../baseAPI';

export const companyInfoApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    companySetup: builder.mutation<Record<string, never>, { id: string; data: FormData }>({
      query({ id, data }) {
        return {
          url: `marketplace/companies/${id}/setup`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    serviceSetup: builder.mutation<Record<string, never>, { data: FormData; id: number }>({
      query({ data, id }) {
        return {
          url: `marketplace/companies/${id}/services`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    updateAwardSetup: builder.mutation<Record<string, never>, { data: any; awardId: string }>({
      query({ data, awardId }) {
        return {
          url: `marketplace/awards/${awardId}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    addAwardSetup: builder.mutation<Record<string, never>, { body: any }>({
      query({ body }) {
        return {
          url: 'marketplace/awards',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    deleteAwardSetup: builder.mutation<Record<string, never>, { awardId: string }>({
      query({ awardId }) {
        return {
          url: `marketplace/awards/${awardId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    updateEmployeeSetup: builder.mutation<Record<string, never>, { data: any; employeeId: string }>({
      query({ data, employeeId }) {
        return {
          url: `marketplace/employees/${employeeId}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    addEmployeeSetup: builder.mutation<Record<string, never>, { data: any }>({
      query({ data }) {
        return {
          url: 'marketplace/employees',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    deleteEmployeeSetup: builder.mutation<Record<string, never>, { employeeId: string }>({
      query({ employeeId }) {
        return {
          url: `marketplace/employees/${employeeId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'company', id: 'user-account' }],
    }),
    getCompanyInfo: builder.query<Record<string, unknown>, string>({
      query(id) {
        return {
          url: `marketplace/entities/${id}`,
          params: {
            populate: [
              { path: '__services', populate: ['__medias', '__plans'] },
              { path: '__awards', populate: ['__avatar'] },
              { path: '__logo' },
            ],
          },
        };
      },
      providesTags: [{ type: 'company', id: 'user-account' }],
    }),
  }),
});

export const {
  useDeleteAwardSetupMutation,
  useDeleteEmployeeSetupMutation,
  useUpdateEmployeeSetupMutation,
  useAddEmployeeSetupMutation,
  useUpdateAwardSetupMutation,
  useAddAwardSetupMutation,
} = companyInfoApis;
