import { baseApi } from '../../../../../redux/baseAPI';
import { IQueryGlobal } from '../../../../../common/interface';
import { IPaginateFinancialHubResponse } from '../interface';
import { IEarningResponse } from '../interface/earning.interface';

/**
 * Earning Endpoints
 */
export const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query<
      IEarningResponse | IPaginateFinancialHubResponse<IEarningResponse>,
      { params: IQueryGlobal; id?: string; timestamp?: number }
    >({
      query: ({ params, id }) => ({
        url: `transaction/earnings/${id ? id : ''}`,
        params: {
          ...params,
        },
      }),
      providesTags: (result) =>
        result && 'data' in result
          ? [...result.data.map((item) => ({ type: 'Earnings' as const, id: item.id })), 'Earnings']
          : ['Earnings'],
    }),
  }),
});

export const { useGetEarningsQuery, useLazyGetEarningsQuery } = earningApi;
