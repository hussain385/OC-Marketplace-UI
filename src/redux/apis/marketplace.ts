import Qs from 'qs';
import { isNil } from 'lodash';
import { baseApi } from '../baseAPI';
import { IGlobalPagination, IPaginateResponseGlobal, IQueryGlobal } from '@/common/interface';
import { BuyerRatingPoint, ICounts } from '@/modules/reviews/src/utils/interface-validation.ts';
import { ICatalog } from '@/common/interface/catalog-interface.ts';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { IService, Extra, IPackagePatchReq, IMilestoneResponse } from '@/common/interface/service-interface';
import {
  IMilestone,
  IPackage,
  IRequirementRes,
  IRequirementsRequest,
} from '@/common/interface/busines-company-profile-interface';

export const marketplaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<IGlobalPagination<IService>, IQueryGlobal>({
      query: (params) => ({
        url: 'marketplace/services',
        params,
      }),
      providesTags: (response) =>
        response ? [...response.data.map((e) => ({ type: 'Service' as const, id: e.id })), 'Service'] : ['Service'],
    }),
    getServicesDetail: builder.query<IService, { serviceId: string; params: IQueryGlobal }>({
      query: ({ serviceId, params }) => ({
        url: `marketplace/services/${serviceId}`,
        params,
      }),
      providesTags: (_, __, d) => [{ type: 'Service', id: d.serviceId }],
      transformResponse: (response: any) => response?.data,
    }),
    getPackageDetail: builder.query<Extra, { packageId: string; params?: IQueryGlobal }>({
      query: ({ packageId, params }) => ({
        url: `marketplace/packages/${packageId}`,
        params,
      }),
      providesTags: ['Package'],
      transformResponse: (response: any) => response?.data,
    }),
    createServices: builder.mutation<IService, FormData>({
      query: (body) => ({
        url: 'marketplace/services',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Service'],
    }),
    updateServices: builder.mutation<IService, { body: FormData; serviceId: string }>({
      query: ({ body, serviceId }) => ({
        url: `marketplace/services/${serviceId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteServices: builder.mutation({
      query: ({ serviceId }) => ({
        url: `marketplace/services/${serviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),

    updateEntity: builder.mutation<
      { data: { updatedEntity: IEntity } },
      {
        id: string | number;
        body: FormData | { [key: string]: any };
      }
    >({
      query: ({ id, body }) => ({
        url: `marketplace/entities/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (a, s, d) => ['Entity', { type: 'Buyer', id: 'user' }],
    }),
    entitySkipVerification: builder.mutation({
      query({ entityType }: { entityType: string }) {
        return {
          url: 'marketplace/entities/skip',
          method: 'POST',
          body: { entityType: entityType },
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'skip-verification' }],
    }),
    entitySetupSingpassCreation: builder.mutation({
      query({ profileType, sessionId }: { profileType: string; sessionId: string }) {
        return {
          url: 'marketplace/entities/singpass',
          method: 'POST',
          body: { data: { profileType, sessionId } },
        };
      },
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }, { type: 'marketplace', id: 'create-services' }],
    }),
    filterMultipleEntitiesQuery: builder.mutation({
      query({ userId, userRole }: { userId: string; userRole: string }) {
        return {
          url: `marketplace/entities/?filter[identity.iamUserId]=${userId}&filter[groups]=${userRole}&filter[profile.type][$in]=INDIVIDUAL&filter[profile.type][$in]=INTERNATIONAL&filter[profile.type][$in]=LOCAL&filter[status][$nin][0]=REJECTED`,
          method: 'GET',
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'filter-entities' }],
    }),

    filterOrganization: builder.mutation<{ data: { entities: IEntity[] } }, { type: string; uen: string }>({
      query({ type, uen }) {
        return {
          url: `marketplace/entities?filter[profile.type][$in]=${type}&filter[profile.detail.registrationId]=${uen}`,
          method: 'GET',
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'filter-entities' }],
    }),

    organisationSearch: builder.mutation({
      query(queryObject) {
        return {
          url: `marketplace/entities`,
          method: 'GET',
          params: queryObject,
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'entities-search' }],
    }),

    getEntityList: builder.query<IEntity[], { params: IQueryGlobal }>({
      query: ({ params }) => ({
        url: 'marketplace/entities',
        params,
      }),
      transformResponse: (response: any) => response?.data,
      providesTags: (result) =>
        result
          ? result.map((e) => ({
              type: 'Entity' as const,
              id: e.id,
            }))
          : ['Entity'],
    }),

    createEntity: builder.mutation<IEntity, FormData>({
      query: (body) => ({
        url: 'marketplace/entities',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.data.newEntity,
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),
    verifyEntity: builder.mutation<IEntity, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `marketplace/entities/${id}/verify`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any) => response?.data.entity,
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),
    verifyEntityInvitation: builder.mutation<IEntity, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `marketplace/entities/${id}/verify-invitation`,
        method: 'PATCH',
        body,
        headers: {
          'x-client-id': id,
        },
      }),
      transformResponse: (response: any) => response?.data.entity,
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),
    verifyEntityByExisted: builder.mutation<IEntity, { id: string }>({
      query: ({ id }) => ({
        url: `marketplace/entities/${id}/verify-by-existed-individual`,
        method: 'PATCH',
        headers: {
          'x-client-id': id,
        },
      }),
      transformResponse: (response: any) => response,
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),
    deleteEntity: builder.mutation<void, { entityId: string }>({
      query: ({ entityId }) => ({
        url: `marketplace/entities/${entityId}`,
        method: 'DELETE',
        headers: {
          'x-client-id': entityId,
        },
      }),
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),
    appealEntity: builder.mutation<void, { entityId: string; body: FormData }>({
      query: ({ entityId, body }) => ({
        url: `marketplace/entities/${entityId}/appeal`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),

    filterMetaServices: builder.mutation({
      query(queryObject) {
        return {
          url: `marketplace/service-metadatas/?${Qs.stringify(queryObject)}`,
          method: 'GET',
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'filter-meta-services' }],
    }),
    filterServiceMetaData: builder.mutation({
      query(queryObject: string) {
        return {
          url: `marketplace/service-metadatas?populate=__plans&populate=__medias&populate=__entity&${queryObject}`,
          method: 'GET',
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'filter-meta-services' }],
    }),
    get4MetaServiceDetails: builder.query<any, object>({
      query(queryObject: object) {
        return {
          url: `marketplace/service-metadatas/?${Qs.stringify(queryObject)}`,
          method: 'GET',
        };
      },
      providesTags: [{ type: 'marketplace', id: 'meta-services' }],
    }),
    get4MetaServiceDetails1: builder.query<IPaginateResponseGlobal<ICatalog>, IQueryGlobal>({
      query: (queryObject) => ({
        url: `marketplace/service-metadatas`,
        params: {
          ...queryObject,
          options: {
            limit: 12,
            page: 1,
            ...queryObject.options,
          },
        },
      }),
      providesTags: [{ type: 'marketplace', id: 'meta-services' }],
      transformResponse: (baseQueryReturnValue: any, meta, arg) =>
        baseQueryReturnValue.data?.paginate ?? baseQueryReturnValue.data,
    }),
    getServiceLise: builder.query({
      query: (arg) => ({
        url: `marketplace/services?${Qs.stringify(arg)}`,
      }),
    }),
    createService: builder.mutation<IService, { data: FormData }>({
      query({ data }) {
        return {
          url: 'marketplace/services',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'create-services' }],
    }),
    addPackagesBulk: builder.mutation<IPackagePatchReq[], { data: { serviceId: string; bulk: IPackage[] } }>({
      query({ data }) {
        return {
          url: 'marketplace/packages/bulk',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'create-packages' }],
    }),
    addMileStoneBulk: builder.mutation<IMilestoneResponse[], { data: IMilestone }>({
      query({ data }) {
        return {
          url: 'marketplace/milestones/bulk',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'create-milestone' }],
    }),
    addRequirementsBulk: builder.mutation<IRequirementRes[], { data: IRequirementsRequest }>({
      query({ data }) {
        return {
          url: 'marketplace/service-requirements/bulk',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'create-requirement' }],
    }),
    deleteRequirement: builder.mutation<IRequirementRes[], { requirementId: string }>({
      query({ requirementId }) {
        return {
          url: `marketplace/service-requirements/${requirementId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'marketplace', id: 'delete-requirement' }],
    }),
    getEntityMembers: builder.query<any, IQueryGlobal>({
      query(query) {
        return {
          url: `marketplace/entities/${query.id}/members`,
          params: query,
        };
      },
      providesTags: [{ type: 'marketplace', id: 'entity-members' }],
    }),
    getEntityInfo: builder.query<{ data: IEntity }, { entityId: string; queryObject?: IQueryGlobal }>({
      query: ({ entityId, queryObject }) => ({
        url: `marketplace/entities/${entityId}`,
        method: 'GET',
        params: queryObject,
      }),
      providesTags: (a, s, query) => [{ type: 'Entity', id: query.entityId }],
      transformResponse: (baseQueryReturnValue: any, meta, arg) => {
        if (!baseQueryReturnValue?.data.entity) {
          return baseQueryReturnValue;
        }

        // Get the sellerProfile counts from the response
        const sellerProfileCounts: ICounts | null | undefined = baseQueryReturnValue?.data.entity.__counts?.sellerProfile;
        // Get the ratings from the response
        const sellerProfileAverages: BuyerRatingPoint | null | undefined =
          baseQueryReturnValue?.data.entity.__averages?.sellerProfile;

        if (sellerProfileCounts) {
          // Calculate the totalCount by summing the values in the sellerProfile object
          baseQueryReturnValue.data.entity.totalCount = Object.values(sellerProfileCounts).reduce((acc, count) => acc + count, 0);
        } else {
          baseQueryReturnValue.data.entity.totalCount = 0;
        }

        // Check if sellerProfile is null
        if (isNil(sellerProfileAverages)) {
          // If sellerProfile is null, get the buyerProfile overview as averageRating
          baseQueryReturnValue.data.entity.averageRating =
            baseQueryReturnValue?.data.entity.__averages?.buyerProfile?.overview ?? 0;
        } else {
          // Calculate the averageRating based on the sellerProfile averages
          // Add the averageRating to the entity object
          baseQueryReturnValue.data.entity.averageRating =
            ((sellerProfileAverages.communicationLevel +
              sellerProfileAverages.serviceAsDescribed +
              sellerProfileAverages.taskResponsibility +
              sellerProfileAverages.recommendToFriends) /
              20) *
            5;
        }

        return baseQueryReturnValue;
      },
    }),
    verifyEntityBySingpass: builder.mutation<any, { entityId: string; sessionId: string }>({
      query: ({ entityId, sessionId }) => ({
        url: `marketplace/entities/${entityId}/verify-by-singpass`,
        method: 'PATCH',
        body: { data: { sessionId } },
      }),
      transformResponse: (response: any) => response?.data.entity,
      invalidatesTags: ['Entity', { type: 'Buyer', id: 'user' }],
    }),
  }),
});

export const {
  useUpdateEntityMutation,
  useFilterMultipleEntitiesQueryMutation,
  useFilterOrganizationMutation,
  useCreateServiceMutation,
  useGetEntityInfoQuery,
  useGetEntityMembersQuery,
  useLazyGetEntityInfoQuery,
  useUpdateServicesMutation,
  useGet4MetaServiceDetailsQuery,
  useLazyGet4MetaServiceDetailsQuery,
  useEntitySetupSingpassCreationMutation,
  useFilterServiceMetaDataMutation,
  useOrganisationSearchMutation,
  useAddRequirementsBulkMutation,
  useDeleteRequirementMutation,
  useAddPackagesBulkMutation,
  useAddMileStoneBulkMutation,
  useEntitySkipVerificationMutation,
  useGetServiceLiseQuery,
  useGet4MetaServiceDetails1Query,
  useGetEntityListQuery,
  useCreateEntityMutation,
  useDeleteEntityMutation,
  useAppealEntityMutation,
  useVerifyEntityMutation,
  useVerifyEntityInvitationMutation,
  useVerifyEntityByExistedMutation,
  useVerifyEntityBySingpassMutation,
  useGetServicesQuery,
  useGetServicesDetailQuery,
  useGetPackageDetailQuery,
} = marketplaceApi;
