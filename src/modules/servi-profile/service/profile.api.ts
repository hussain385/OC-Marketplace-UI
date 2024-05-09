import { baseApi } from '@/redux/baseAPI.ts';
import { IGlobalPagination, IQueryGlobal } from '@/common/interface';
import { IAward, ICertificate, ISkill, TEmployement } from '@/modules/servi-profile/interfaces';

/**
 * Award API
 * @description fetch, create, update and delete
 * @method GET - getAwards
 * @method GET - getAwardDetail
 * @method POST - createAward
 * @method PATCH - updateAward
 * @method DELETE - deleteAward
 */
export const awardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAwards: builder.query<IAward[], IQueryGlobal | undefined>({
      query: (params) => ({
        url: 'marketplace/awards',
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: (a, __, _) => (a ? [...a.map((c) => ({ type: 'Award' as const, id: c.id })), 'Award'] : ['Award']),
    }),
    getAwardDetail: builder.query<unknown, string>({
      query: (awardId) => ({
        url: `marketplace/awards/${awardId}`,
      }),
      providesTags: (_, __, id) => [{ type: 'Award', id }],
    }),
    createAward: builder.mutation<{ body: FormData; entityId?: string }, unknown>({
      query: ({ body, entityId }) => ({
        url: 'marketplace/awards',
        method: 'POST',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Award'],
    }),
    updateAward: builder.mutation<unknown, { awardId: string; body: FormData; entityId?: string }>({
      query: ({ awardId, body, entityId }) => ({
        url: `marketplace/awards/${awardId}`,
        method: 'PATCH',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: (_, __, d) => [{ type: 'Award', id: d.awardId }],
    }),
    deleteAward: builder.mutation<unknown, { awardId: string; entityId?: string }>({
      query: ({ awardId, entityId }) => ({
        url: `marketplace/awards/${awardId}`,
        method: 'DELETE',
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: (_, __, d) => [{ type: 'Award', id: d.awardId }, 'Award'],
    }),
  }),
});

export const { useGetAwardsQuery } = awardsApi;

/**
 * Skill API
 * @description Fetch all skills
 * @method GET - getSkill
 * @method POST - setSkill
 */
export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<IGlobalPagination<ISkill>, IQueryGlobal | undefined>({
      query: (params) => ({
        url: 'marketplace/skills',
        params,
      }),
      providesTags: ['Skill'],
    }),
    setSkill: builder.mutation<{ uid: string }, { skills: string[]; entityId?: string }>({
      query: (body) => ({
        url: 'marketplace/skills/set-entity-skills',
        method: 'POST',
        body,
        headers: {
          'x-client-id': body.entityId,
        },
      }),
      invalidatesTags: (a) => ['Skill', { type: 'Entity', id: a?.uid }],
    }),
  }),
});

/**
 * Certiicate API
 * @method GET - getCertificates
 * @method GET - getCertificateDetail
 * @method POST - createCertificate
 * @method PATCH - updateCertificate
 * @method DELETE - deleteCertificate
 */
export const certificatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query<ICertificate[], IQueryGlobal | undefined>({
      query: (params) => ({
        url: 'marketplace/certificates',
        params,
      }),
      transformResponse: (response: any) => response?.data,
      providesTags: (a, __, _) =>
        a ? [...a.map((c) => ({ type: 'Certificate' as const, id: c.id })), 'Certificate'] : ['Certificate'],
    }),
    getCertificateDetail: builder.query<ICertificate, { params?: IQueryGlobal; certId: string }>({
      query: ({ params, certId }) => ({
        url: `marketplace/certificates/${certId}`,
        params,
      }),
      providesTags: (_, __, d) => [{ type: 'Certificate', id: d.certId }],
    }),
    createCertificate: builder.mutation<any, { body: Omit<ICertificate, 'id' | 'entity'>; entityId?: string }>({
      query: ({ body, entityId }) => ({
        url: 'marketplace/certificates',
        method: 'POST',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Certificate'],
    }),
    updateCertificate: builder.mutation<any, { body: Partial<ICertificate>; certId: string; entityId?: string }>({
      query: ({ body, certId, entityId }) => ({
        url: `marketplace/certificates/${certId}`,
        method: 'PATCH',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: (_, __, d) => [{ type: 'Certificate', id: d.certId }],
    }),
    deleteCertificate: builder.mutation<any, { certId: string; entityId?: string }>({
      query: ({ certId, entityId }) => ({
        url: `marketplace/certificates/${certId}`,
        method: 'DELETE',
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Certificate'],
    }),
  }),
});

export const { useGetCertificatesQuery } = certificatesApi;

/**
 * Employment API
 * @method GET - getEmployments
 * @method GET - getEmploymentDetail
 * @method POST - createEmployment
 * @method PATCH - updateEmployment
 * @method DELETE - deleteEmployment
 */
export const employmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployments: builder.query<IGlobalPagination<TEmployement>, IQueryGlobal | undefined>({
      query: (params) => ({
        url: 'marketplace/employments',
        params,
      }),
      providesTags: (a, _, __) =>
        a ? [...a.data.map((e) => ({ type: 'Employment' as const, id: e.id })), 'Employment'] : ['Employment'],
    }),
    getEmploymentDetail: builder.query<TEmployement, { params?: IQueryGlobal; empId: string }>({
      query: ({ params, empId }) => ({
        url: `marketplace/employments/${empId}`,
        params,
      }),
      providesTags: (_, __, d) => [{ type: 'Employment', id: d.empId }],
    }),
    createEmployment: builder.mutation<any, { body: Omit<TEmployement, 'id'>; entityId?: string }>({
      query: ({ body, entityId }) => ({
        url: 'marketplace/employments',
        method: 'POST',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Employment'],
    }),
    updateEmployment: builder.mutation<any, { body: Partial<TEmployement>; empId: string; entityId?: string }>({
      query: ({ body, empId, entityId }) => ({
        url: `marketplace/employments/${empId}`,
        method: 'PATCH',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: (_, __, d) => [{ type: 'Employment', id: d.empId }],
    }),
    deleteEmployment: builder.mutation<any, { empId: string; entityId?: string }>({
      query: ({ empId, entityId }) => ({
        url: `marketplace/employments/${empId}`,
        method: 'DELETE',
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Employment'],
    }),
  }),
});

/**
 * Profile API
 * @method GET - getProfile @param {String} profileId
 * @method PATCH - updateProfile
 */
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, string>({
      query: (profileId) => ({
        url: `marketplace/entity-profiles/${profileId}`,
      }),
    }),
    updateProfile: builder.mutation<any, { body: FormData; entityId?: string }>({
      query: ({ body, entityId }) => ({
        url: `marketplace/entity-profiles`,
        method: 'PATCH',
        body,
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Entity'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
export const { useCreateAwardMutation, useUpdateAwardMutation, useDeleteAwardMutation } = awardsApi;
export const { useCreateCertificateMutation, useUpdateCertificateMutation, useDeleteCertificateMutation } = certificatesApi;
export const { useCreateEmploymentMutation, useUpdateEmploymentMutation, useGetEmploymentsQuery, useDeleteEmploymentMutation } =
  employmentApi;
export const { useGetSkillsQuery, useLazyGetSkillsQuery, useSetSkillMutation } = skillApi;
