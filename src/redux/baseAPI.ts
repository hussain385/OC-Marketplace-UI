import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import Qs from 'qs';

import { SERVER_URL } from '../common/constants';
import { RootState } from './store';
import { getCookie } from '@/common/utils/cookie';
import { urlHelper } from '@/common/utils/helpers/url';

export const RtkTags = [
  'POST',
  'Buyer',
  'catalog',
  'company',
  'Teams',
  'transaction',
  'marketplace',
  'media',
  'Review',
  'Order',
  'OrderActivity',
  'Payout',
  'Earnings',
  'Withdrawals',
  'Earning-Invoices',
  'Report',
  'Entity',
  'Invitation',
  'Award',
  'Skill',
  'Package',
  'Certificate',
  'Employment',
  'Service',
] as const;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token, selectedEntity, selectedRole } = (getState() as RootState).mainState.useInfo;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (getCookie('x-client-type')) headers.set('x-client-type', getCookie('x-client-type') as string);
    const xClientId = selectedEntity?.uid ?? selectedRole?.entityId;
    if (xClientId && !headers.get('x-client-id')) headers.set('x-client-id', xClientId);
    return headers;
  },
  paramsSerializer: (params) => Qs.stringify(params),
});

// async function Logout({ token, api, extraOptions }: { token: string; api: BaseQueryApi; extraOptions: any }) {
//   const isLoggedIn = getCookie('isLoggedIn');
//   const location = window.location;
//   const isLoginPage = location.pathname.search(/login/);
//   await baseQuery(
//     {
//       url: '/iam/auth/logout',
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${token}`,
//       },
//     },
//     api,
//     extraOptions,
//   );
//   api.dispatch(userLogout());
//   api.dispatch(clearAllTransactionDataAction());
//   localStorage.removeItem('persist:root');
//   unmountCacheData();
//   setCookie('isLoggedIn', 'false', 1);
//   setCookie('token', '', 0);
//   if (!isLoggedIn && isLoginPage <= -1) {
//     window.location.replace('/');
//   }
// }

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    !['iam/auth/login', 'iam/auth/logout'].includes(typeof args === 'string' ? args : args.url)
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      const {
        mainState: {
          useInfo: { refresh_token },
        },
      } = <RootState>api.getState();

      try {
        try {
          const refreshResult = await baseQuery(
            {
              url: '/iam/auth/refresh-token',
              method: 'POST',
              body: {
                refresh_token,
              },
            },
            api,
            extraOptions,
          );
          if (refreshResult.data) {
            // Refresh user token
            api.dispatch({
              type: 'userInfo/refreshTokenUpdated',
              payload: {
                token: (refreshResult.data as any).access_token,
                refresh_token: (refreshResult.data as any).refresh_token,
              },
            });

            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch({
              type: 'appReducers/updateAppConfig',
              payload: {
                hasSessionTimeout: true,
                redirectUrl: urlHelper().segment === '/' ? undefined : urlHelper().segment,
              },
            });
          }
        } catch (e) {
          // console.error('Triggering logout from rtk catch');
          // window.prompt('Rtk Error');
          // showToast('RTK Error', ToastTypes.ERROR);
          api.dispatch({
            type: 'appReducers/updateAppConfig',
            payload: {
              hasSessionTimeout: true,
              redirectUrl: urlHelper().segment === '/' ? undefined : urlHelper().segment,
            },
          });
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// initialize an empty api service-review that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: RtkTags,
});

export const extraBaseApi = createApi({
  reducerPath: 'extra-api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: () => ({}),
});
