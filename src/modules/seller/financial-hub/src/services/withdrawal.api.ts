/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../../../../../redux/baseAPI';
import { IQueryGlobal } from '../../../../../common/interface';
import { IPaginateFinancialHubResponse } from '../interface';
import { IWithdrawalResponse } from '../interface/withdrawal.interface';

/**
 * Withdrawal Endpoints
 */
export const withdrawalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawals: builder.query<
      IPaginateFinancialHubResponse<IWithdrawalResponse>,
      { params: IQueryGlobal; id?: string; timestamp?: number }
    >({
      query: ({ params, id }) => ({
        url: `transaction/withdrawals/${id ? id : ''}`,
        params: {
          ...params,
        },
      }),
      providesTags: (result) =>
        result && 'data' in result
          ? [...result.data.map((item) => ({ type: 'Withdrawals' as const, id: item.id })), 'Withdrawals']
          : ['Withdrawals'],
    }),
  }),
});

export const { useGetWithdrawalsQuery, useLazyGetWithdrawalsQuery } = withdrawalApi;
