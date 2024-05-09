// Define a service-review using a base URL and expected endpoints
import { baseApi } from '../baseAPI';
import { IQueryGlobal } from '../../common/interface';
import { Role } from '@/common/interface/User.ts';
import { IPaginateFinancialHubResponse } from '@/modules/seller/financial-hub/src/interface';
import { Member } from '@/common/interface/entity-interface.ts';

type IUserInvitation = {
  name?: string;
  email: string;
  entityId: string;
  role: string;
  clientType?: string;
};

type IRolesFilter = {
  xClientType: string;
  xClientId: string;
};

export const teamManagementApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFunctionalEmployee: builder.query<IPaginateFinancialHubResponse<Member>, { params?: IQueryGlobal; xClientId?: string }>({
      query: ({ params, xClientId }) => ({
        url: 'iam/invitations',
        params,
        headers: {
          'x-client-id': xClientId,
        },
      }),
      providesTags: [{ type: 'Teams', id: 'Teams' }],
    }),
    deleteFunctionalEmployee: builder.mutation<any, string>({
      query(employeeId) {
        return {
          url: `iam/invitations/${employeeId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Teams', id: 'Teams' }],
    }),
    sendInvitation: builder.mutation<any, { invitation: IUserInvitation }>({
      query({ invitation }) {
        return {
          url: `iam/invitations`,
          method: 'POST',
          body: {
            ...invitation,
          },
        };
      },
      invalidatesTags: [{ type: 'Teams', id: 'Teams' }],
    }),
    acceptInvitation: builder.mutation<any, { invitationToken: string; isAccept: boolean }>({
      query(body) {
        return {
          url: 'iam/invitations/accept-invitation',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Teams', id: 'Teams' }, 'Entity', { type: 'Buyer', id: 'user' }, 'Invitation'],
    }),
    validateInvitation: builder.query<any, IQueryGlobal>({
      query: (query) => ({
        url: 'iam/invitations/lookup',
        params: query,
      }),
      providesTags: [{ type: 'Teams', id: 'Teams' }],
    }),
    updateEmployeeRole: builder.mutation<any, { employeeId: string; role: string }>({
      query({ employeeId, role }) {
        return {
          url: `iam/invitations/${employeeId}/role`,
          method: 'PATCH',
          body: {
            role: role,
          },
        };
      },
      invalidatesTags: [{ type: 'Teams', id: 'Teams' }],
    }),
    updateEmployeePermissions: builder.mutation<any, { employeeId: string; permissions: string[] }>({
      query({ employeeId, permissions }) {
        return {
          url: `iam/invitations/${employeeId}/permissions`,
          method: 'PATCH',
          body: {
            permissions: permissions,
          },
        };
      },
      invalidatesTags: [{ type: 'Teams', id: 'Teams' }],
    }),
    getRolesFilters: builder.query<any, IRolesFilter>({
      query(queryObject) {
        return {
          url: 'iam/invitations/get-filters',
          method: 'GET',
          headers: {
            'x-client-type': queryObject.xClientType,
            'x-client-id': queryObject.xClientId,
          },
        };
      },
    }),
    getMyInvitations: builder.query<Role[], { status: 'Accepted' | 'Pending' }>({
      query: (params) => ({
        url: 'iam/invitations/me',
        params,
      }),
      providesTags: ['Invitation'],
    }),
  }),
});

export const {
  useGetFunctionalEmployeeQuery,
  useDeleteFunctionalEmployeeMutation,
  useAcceptInvitationMutation,
  useLazyValidateInvitationQuery,
  useSendInvitationMutation,
  useUpdateEmployeeRoleMutation,
  useUpdateEmployeePermissionsMutation,
  useLazyGetFunctionalEmployeeQuery,
  useGetRolesFiltersQuery,
  useGetMyInvitationsQuery,
} = teamManagementApis;
