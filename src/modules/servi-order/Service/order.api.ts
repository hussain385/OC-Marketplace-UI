import { baseApi } from '@/redux/baseAPI.ts';
import { IGlobalPagination, IQueryGlobal } from '@/common/interface';
import { ActivityTypes, Order } from '@/modules/servi-order/interface';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrder>({
      query: (body) => ({
        url: 'transaction/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.query<IGlobalPagination<Order>, IQueryGlobal>({
      query: (params) => ({
        url: 'transaction/orders',
        params,
      }),
      providesTags: (a, s, d) => (a ? [...a.data.map((e) => ({ type: 'Order' as const, id: e.id })), 'Order'] : ['Order']),
    }),
    getOrderDetails: builder.query<Order, { orderId: string; params?: IQueryGlobal }>({
      query: ({ params, orderId }) => ({
        url: `transaction/orders/${orderId}`,
        params,
      }),
      providesTags: (a, s, d) => [{ type: 'Order', id: d.orderId }],
      transformResponse: (response: any) => response?.data,
    }),
    activityActions: builder.mutation<any, { formData?: FormData; data: ActivityActions }>({
      query: ({ data, formData }) => {
        const body = formData ?? new FormData();
        body.append('data', JSON.stringify(data));

        return {
          url: 'transaction/activities',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (a, s, d) => [{ type: 'Order', id: d.data.orderId }],
    }),
    orderContinue: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `transaction/orders/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: (a, s, d) => [{ type: 'Order', id: d.id }],
    }),
  }),
});

interface CreateOrder {
  serviceId: string;
  packageId: string;
}

interface ActivityActions {
  orderId: string;
  activity: {
    type: ActivityTypes;
    data?: Record<string, any>;
  };
}

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useActivityActionsMutation,
  useCreateOrderMutation,
  useOrderContinueMutation,
} = orderApi;
