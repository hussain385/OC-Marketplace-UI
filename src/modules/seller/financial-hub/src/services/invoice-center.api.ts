/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../../../../../redux/baseAPI';
import { IQueryGlobal } from '../../../../../common/interface';
import { IPaginateFinancialHubResponse } from '../interface';
import { IInvoiceCenterResponse } from '../interface/invoice-center-interface';

/**
 * Withdrawal Endpoints
 */
export const invoiceCenterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarningInvoices: builder.query<
      IPaginateFinancialHubResponse<IInvoiceCenterResponse>,
      { params: IQueryGlobal; id?: string; timestamp?: number }
    >({
      query: ({ params, id }) => ({
        url: `transaction/earning-invoices/${id ? id : ''}`,
        params: {
          ...params,
        },
      }),
      providesTags: (result) =>
        result && 'data' in result
          ? [...result.data.map((item) => ({ type: 'Earning-Invoices' as const, id: item.id })), 'Earning-Invoices']
          : ['Earning-Invoices'],
    }),
  }),
});

export const { useGetEarningInvoicesQuery, useLazyGetEarningInvoicesQuery } = invoiceCenterApi;
