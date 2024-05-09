import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IPaginateFinancialHubResponse<T> {
  total: number;
  count: number;
  page: number;
  pageCount: number;
  data: T[];
}

export interface IEarningReport {
  currency: string;
  balance: number;
  earning?: {
    pending: number;
    total: number;
  };
  withdrawal?: {
    requested: number;
    total: number;
  };
  metadata: {
    withdrawFee: string;
    serviceFeeRate: string;
    ownerMobile: string;
    ownerMobileCountryCode: string;
  };
}

export interface IFinancialResponseError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  description: null;
}

export interface IQueryReturnType<T> {
  data: IPaginateFinancialHubResponse<T>;
  isFetching?: boolean;
  error?: FetchBaseQueryError;
}

export interface IDetailsQueryReturnType<T> {
  data: T;
  error: FetchBaseQueryError;
  isFetching: boolean;
}
