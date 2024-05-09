/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { baseApi } from '../../../../../redux/baseAPI';
import { IQueryGlobal } from '../../../../../common/interface';
import { IEarningReport } from '../interface';
import { SERVICE_URLS } from '../../../../../common/constants';
import { IWithdrawalResponse } from '../interface/withdrawal.interface';

/**
 * Report APi
 */

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query<IEarningReport, { url: string; options?: IQueryGlobal }>({
      query: (params) => ({
        url: `transaction/report${params.url}`,
        params: {
          ...params.options,
        },
      }),
      providesTags: ['Report'],
    }),
    withdrawNow: builder.mutation<{ data: IWithdrawalResponse }, { grossAmount: number; otp: string }>({
      query: (body) => ({ url: 'transaction/withdrawals', method: 'POST', body }),
      invalidatesTags: ['Report', 'Withdrawals'],
    }),
  }),
});
export const { useGetReportQuery, useLazyGetReportQuery, useWithdrawNowMutation } = reportApi;

/**
 * Export APi
 */
type State = {
  entityId: string;
  role: string;
  token: string;
};
type TProps = {
  url: string;
  params?: unknown;
  type?: string;
  state: State;
};

export const exportReportApi = async (args: TProps) => {
  const { token, role, entityId } = args.state;

  const Api = axios.create({
    baseURL: SERVICE_URLS.TRANSACTION,
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-client-type': role,
      'x-client-id': entityId,
    },
  });
  const response: any = await Api.get(args.url, { params: args.params ? args.params : {} });
  const fileName = args.type === 'pdf' ? `${uuidv4()}.pdf` : `${uuidv4()}.csv`;
  const href = URL.createObjectURL(response?.data);
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', fileName); //or any other extension
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

//financial endpoint
export * from './payout.api';
