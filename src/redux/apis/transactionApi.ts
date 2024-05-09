import { IKey, IQueryGlobal } from '@/common/interface';
import { baseApi } from '../baseAPI';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTransactionBillingOrder: builder.query<any, IQueryGlobal>({
      query(queryParams) {
        return {
          url: 'transaction/orders',
          method: 'GET',
          params: queryParams,
        };
      },
      providesTags: [{ type: 'transaction', id: 'orders' }],
    }),
    getKeyStatus: builder.query<{ data: IKey[] }, IQueryGlobal>({
      query(query) {
        return {
          url: `transaction/kv`,
          method: 'GET',
          params: query,
        };
      },
      // providesTags: [{ type: 'transaction', id: 'orders' }],
    }),

    postOrderRequirements: builder.mutation({
      query: ({ orderId, body }) => {
        return {
          url: `transaction/activities`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (a, s, d) => [
        { type: 'Order', id: d.orderId },
        { type: 'OrderActivity', id: d.orderId },
      ],
    }),
    getInvoices: builder.query<any, any>({
      query: (args) => {
        const params = args.params ? args.params : args.export ? `export=${args.export}` : '';
        const pageLimit = args.limit ? args.limit : 10; //default 10 record per page
        const currentPage = args.page ? args.page : 1; //default current page 1
        const url = `transaction/invoices?join=items&join=items.transaction&sort=createdAt,DESC&limit=${pageLimit}&page=${currentPage}&${
          params && params
        }`;
        return {
          url,
          responseHandler: (response) => (args && args.export ? response.blob() : response.json()),
        };
      },
      transformResponse: (response: any) => response,
    }),
    findOneInvoice: builder.query<any, string>({
      query: (id) => {
        const url = `transaction/invoices/${id}?join=items&join=items.transaction`;
        return {
          url,
        };
      },
      transformResponse: (response: any) => (response.data ? response.data : response),
    }),
  }),
});

export const {
  useGetTransactionBillingOrderQuery,
  useLazyGetKeyStatusQuery,
  useGetKeyStatusQuery,
  useLazyGetTransactionBillingOrderQuery,
  usePostOrderRequirementsMutation,
  useLazyGetInvoicesQuery,
  useLazyFindOneInvoiceQuery,
} = transactionApi;
