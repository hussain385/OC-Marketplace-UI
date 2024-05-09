import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVICE_URLS } from '../../../common/constants';

type TProps = {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
};

export const exportBilling = createAsyncThunk('billing/export', async (args: TProps) => {
  const {
    token,
    userRole,
    selectedEntity: { uid },
  } = args.state;

  const Api = axios.create({
    baseURL: SERVICE_URLS.TRANSACTION,
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-client-type': userRole,
      'x-client-id': uid,
    },
  });
  const response = await Api.get(args.url);
  return response?.data;
});
