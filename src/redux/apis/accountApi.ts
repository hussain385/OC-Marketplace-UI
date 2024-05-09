import { v4 as uuidv4 } from 'uuid';
import { baseApi } from '../baseAPI';
import { User } from '../../common/interface/User';
// import { RootState } from '../../../../service/store';

interface AuthHeader {
  token?: string;
}

interface BuyerAccountApi extends AuthHeader {
  professional_title: string;
  identity_name: string;
  identity_type: string;
  identity_number: string;
  _inherit: number;
  title: string;
  token: string;
  account_type?: string;
}

interface BuyerCompany {
  UEN: string;
  name: string;
  SSIC: string;
  registered_address: string;
  official_email: string;
  official_phone: string;
  account: number;
}

interface EmailTemplate {
  recepient: string;
  uen: string;
  companyName: string;
  companyAddress: string;
  userName: string;
  staffName: string;
}

// interface UpdateProfileDetails {
//   name?: string;
//   mobile?: string;
//   mobileCountryCode?: string;
//   profile_photo?: string;
//   profile_photo_id?: string;
// }
export const buyerAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: ({
        professional_title,
        identity_name,
        identity_type,
        identity_number,
        _inherit,
        title,
        token,
        account_type,
      }: BuyerAccountApi) => ({
        url: 'iam/accounts',
        method: 'POST',
        body: {
          data: {
            title,
            professional_title,
            identity_name,
            identity_type,
            identity_number,
            _inherit,
            account_type,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createCompany: builder.mutation({
      query({ UEN, name, SSIC, registered_address, official_email, official_phone, account }: BuyerCompany) {
        return {
          url: `iam/companies`,
          method: 'POST',
          body: {
            data: {
              UEN,
              name,
              SSIC,
              registered_address,
              official_email,
              official_phone,
              account,
              uid: uuidv4(),
            },
          },
        };
      },
      invalidatesTags: [{ type: 'Buyer', id: 'user' }],
    }),

    uploadAccountPhoto: builder.mutation<Record<string, never>, FormData>({
      query(data) {
        return {
          url: `iam/upload`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Buyer', id: 'user' }],
    }),

    uploadCompanyPhoto: builder.mutation<Record<string, never>, FormData>({
      query(data) {
        return {
          url: `iam/upload`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Buyer', id: 'user' }],
    }),

    accountEmailVerification: builder.mutation({
      query({ recepient, uen, companyName, companyAddress, userName, staffName }: EmailTemplate) {
        return {
          url: 'iam/users/tedx',
          method: 'POST',
          body: {
            recepient,
            tRef: 1007,
            valueObj: {
              uen,
              company: {
                name: companyName,
                address: companyAddress,
              },
              user: {
                name: userName,
                email: recepient,
              },
              staff: {
                name: staffName,
              },
            },
          },
        };
      },
    }),
    getCompanyByAccountId: builder.query<Record<string, never>, number>({
      query: (accountId) => ({
        url: `iam/accounts/${accountId}/companies`,
        method: 'GET',
      }),
    }),
    createCompanyAndAccount: builder.mutation<Record<string, never>, FormData>({
      query: (data) => ({
        url: 'iam/users:setup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Buyer', id: 'user' }],
    }),
    getUserME: builder.query<User, void>({
      query: () => ({
        url: 'iam/users/me',
      }),
      providesTags: [{ type: 'Buyer', id: 'user' }],
    }),
    updateUser: builder.mutation<Record<string, never>, { data: Partial<User> }>({
      query: ({ data }) => ({
        url: 'iam/users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [{ type: 'Buyer', id: 'user' }],
    }),

    updateAccount: builder.mutation<Record<string, never>, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `iam/accounts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Buyer', id: 'user' }],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useCreateCompanyMutation,
  useUploadAccountPhotoMutation,
  useUploadCompanyPhotoMutation,
  useAccountEmailVerificationMutation,
  useGetCompanyByAccountIdQuery,
  useUpdateUserMutation,
  useUpdateAccountMutation,
  useCreateCompanyAndAccountMutation,
  useGetUserMEQuery,
  useLazyGetUserMEQuery,
} = buyerAccountApi;
