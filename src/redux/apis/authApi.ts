/* eslint-disable no-console */
// Need to use the React-specific entry point to import createApi
import { baseApi } from '../baseAPI';
import { User } from '../../common/interface/User';
import { SingpassRet } from '../../common/interface/singpass-interface';

type Auth = {
  emailPhone: string;
  password: string;
  token: string;
  role: string;
};

export const userAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, Auth>({
      query: ({ emailPhone, password, token, role }) => ({
        url: 'iam/auth/login',
        method: 'POST',
        body: { identifier: emailPhone, password: password, role: role },
        headers: {
          Authorization: `Basic ${token}`,
        },
      }),
    }),
    getUserEmail: builder.query<Record<string, never>, string>({
      query: (email) => ({
        url: `iam/users/lookup?email=${email}`,
        method: 'GET',
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: 'iam/auth/logout',
        method: 'POST',
        validateStatus: () => true,
      }),
    }),
    getUserMobile: builder.mutation({
      query({ phone }: { phone: string }) {
        return {
          url: `iam/users/lookup?mobile=%2B${phone}`,
          method: 'GET',
        };
      },
    }),

    getUserEmailExist: builder.mutation<number, { email?: string | null }>({
      query({ email }) {
        return {
          url: `iam/users/lookup?email=${email}`,
          method: 'GET',
        };
      },
    }),
    refreshUserToken: builder.mutation<{ access_token: string; refresh_token: string }, { refresh_token: string }>({
      query({ refresh_token }) {
        return {
          url: 'iam/auth/refresh-token',
          method: 'POST',
          body: {
            refresh_token: refresh_token,
          },
        };
      },
    }),
    getUserMobileExist: builder.mutation({
      query({ phone }: { phone: string }) {
        return {
          url: `iam/users/lookup?mobile=%2B${phone}`,
          method: 'GET',
        };
      },
    }),

    sendOtpCode: builder.mutation<AuthResponse, string>({
      query: (mobile) => ({
        url: 'iam/auth/send-code',
        method: 'POST',
        body: { mobile },
      }),
    }),
    verifyOtpCode: builder.mutation<AuthResponse, { code: string; mobile: string }>({
      query: ({ mobile, code }) => ({
        url: 'iam/auth/verify-code',
        method: 'POST',
        body: { mobile, code },
      }),
    }),
    registerUser: builder.mutation<
      AuthResponse,
      {
        name: string;
        email: string;
        mobile?: string;
        password: string;
        mobileCountryCode?: string;
        role: string;
        registrationToken?: string;
        invitationToken?: string;
      }
    >({
      query: ({ name, email, mobile, password, role, mobileCountryCode, registrationToken, invitationToken }) => ({
        url: 'iam/auth/register',
        method: 'POST',
        body: {
          name,
          email,
          mobile,
          password,
          mobileCountryCode,
          metadata: { categories: role === 'seller' ? ['SELLER'] : ['BUYER'] },
          registrationToken,
          invitationToken,
        },
      }),
    }),
    emailConfirmation: builder.mutation<Record<string, never>, { token: string }>({
      query: ({ token }) => ({
        url: `iam/auth/email-confirmation?token=${token}`,
        method: 'POST',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singpassInitSession: builder.query({
      query: () => `iam/auth/singpass/init-redirect-session`,
    }),
    sendEmailVerification: builder.mutation<Record<string, never>, number>({
      query: (id) => ({
        url: 'iam/auth/send-email-confirmation',
        method: 'POST',
        body: { id },
      }),
    }),
    resendEmailConfirmation: builder.mutation<Record<string, never>, { userId: string }>({
      query: ({ userId }) => ({
        url: 'iam/auth/send-email-confirmation',
        method: 'POST',
        body: { userId },
      }),
    }),
    loginwithSingPass: builder.mutation<AuthResponse, { code: string; state: string }>({
      query: ({ code, state }) => ({
        url: 'iam/auth/singpass/login',
        method: 'POST',
        body: { code, state },
      }),
    }),

    redirectMyInfoSession: builder.query<{ sessionId: string; auth_uri: string }, void>({
      query: () => `iam/auth/singpass/myinfo/v4`,
      providesTags: [{ type: 'POST', id: 'redirect-session' }],
    }),
    redirectMyInfoSessionBiz: builder.query({
      query: () => `iam/auth/singpass/init-myinfo-biz-session`,
      providesTags: [{ type: 'POST', id: 'redirect-session' }],
    }),

    retrieveSingpassInfo: builder.mutation<
      SingpassRet,
      {
        code: string;
        state?: string | null;
        route?: string;
        sessionId?: string | null;
      }
    >({
      query: ({ code, state, sessionId, route = 'myinfo/v4' }) => ({
        url: `iam/auth/singpass/${route}`,
        method: 'POST',
        body: { code, state, sessionId },
      }),
      invalidatesTags: [{ type: 'POST', id: 'retrieve-info' }],
    }),
    forgotPassword: builder.mutation<Record<string, never>, string>({
      query: (email) => ({
        url: 'iam/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query({
        token,
        newPassword,
        newPasswordConfirmation,
      }: {
        token: string | null;
        newPassword?: string | null;
        newPasswordConfirmation?: string | null;
      }) {
        return {
          url: 'iam/auth/reset-password',
          method: 'POST',
          body: {
            token,
            newPassword,
            newPasswordConfirmation,
          },
        };
      },
    }),
    changePassword: builder.mutation<
      any,
      {
        currentPassword: string;
        newPassword?: string;
        newPasswordConfirmation?: string;
      }
    >({
      query({ currentPassword, newPassword, newPasswordConfirmation }) {
        return {
          url: 'iam/auth/change-password',
          method: 'POST',
          body: {
            currentPassword,
            newPassword,
            newPasswordConfirmation,
          },
        };
      },
    }),
    getOtp: builder.mutation<{ status: boolean; message: string; statusText: string }, { mobile: string }>({
      query: (body) => ({ url: 'iam/auth/get-otp', method: 'POST', body }),
    }),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthResponse = {
  jwt: string;
  refresh_token: string;
  user: User;
  isRegistered?: boolean;
};

export const {
  useLoginUserMutation,
  useGetUserEmailQuery,
  useGetUserMobileMutation,
  useGetUserEmailExistMutation,
  useGetUserMobileExistMutation,
  useSendOtpCodeMutation,
  useVerifyOtpCodeMutation,
  useRegisterUserMutation,
  useEmailConfirmationMutation,
  useSendEmailVerificationMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useRefreshUserTokenMutation,
  useLoginwithSingPassMutation,
  useRedirectMyInfoSessionQuery,
  useRedirectMyInfoSessionBizQuery,
  useRetrieveSingpassInfoMutation,
  useLogoutUserMutation,
  useLazySingpassInitSessionQuery,
  useGetOtpMutation,
  useResendEmailConfirmationMutation,
  useChangePasswordMutation,
} = userAuthApi;
