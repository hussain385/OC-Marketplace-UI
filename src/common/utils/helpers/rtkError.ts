import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

interface ICustomFetchError<T> {
  status: number;
  data: {
    statusCode: number;
    message: string;
    data: T;
  };
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage<T>(error: unknown): error is ICustomFetchError<T> {
  return isFetchBaseQueryError(error) && typeof error.status === 'number' && 'message' in (error.data as object);
}
