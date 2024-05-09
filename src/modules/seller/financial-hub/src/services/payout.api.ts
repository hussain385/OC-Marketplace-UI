import { baseApi } from '../../../../../redux/baseAPI';
import { IQueryGlobal } from '../../../../../common/interface';
import {
  IPayout,
  IPayoutRequest,
  PayoutCreate,
  PayoutCreateRequest,
  PayoutUpdateRequestOwner,
} from '../interface/payout.interface';

export const payoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayoutInfo: builder.query<{ data: IPayout[] }, IQueryGlobal>({
      query: (params) => ({ url: 'transaction/bank-accounts', params }),
      providesTags: (res, s, d) =>
        res ? [...res.data.map((e) => ({ type: 'Payout' as const, id: e.id })), 'Payout'] : ['Payout'],
    }),
    createPayout: builder.mutation<{ id?: string }, PayoutCreate>({
      query: (body) => ({
        url: 'transaction/bank-accounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payout'],
    }),
    updatePayout: builder.mutation<void, { id: string | number; data: PayoutCreate }>({
      query: ({ data, id }) => ({
        url: `transaction/bank-accounts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (a, s, arg) => [{ type: 'Payout', id: arg.id }, 'Payout'],
    }),
    deletePayout: builder.mutation<void, { id: string | number; otp: number | string }>({
      query: ({ otp, id }) => ({
        url: `transaction/bank-accounts/${id}`,
        method: 'DELETE',
        params: { otp },
      }),
      invalidatesTags: (a, s, arg) => [{ type: 'Payout', id: arg.id }, 'Payout'],
    }),
    getPayoutRequestInfo: builder.query<{ data: IPayoutRequest[] }, IQueryGlobal>({
      query: (params) => ({ url: 'transaction/bank-account-requests', params }),
      providesTags: ['Payout'],
    }),
    createPayoutRequest: builder.mutation<void, PayoutCreateRequest>({
      query: (body) => ({
        url: 'transaction/bank-account-requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payout'],
    }),
    updatePayoutRequestOwner: builder.mutation<void, { id: string; body: PayoutUpdateRequestOwner }>({
      query: ({ id, body }) => ({
        url: `transaction/bank-account-requests/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (a, s, arg) => [{ type: 'Payout', id: arg.id }, 'Payout'],
    }),
  }),
});

export const {
  useGetPayoutInfoQuery,
  useCreatePayoutMutation,
  useCreatePayoutRequestMutation,
  useUpdatePayoutMutation,
  useDeletePayoutMutation,
  useUpdatePayoutRequestOwnerMutation,
  useGetPayoutRequestInfoQuery,
} = payoutApi;
