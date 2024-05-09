import { isUndefined } from 'lodash';

import { Maybe } from 'yup';
import React from 'react';
import { buyerAccountApi } from '../../../redux/apis/accountApi';
import { userAuthApi } from '../../../redux/apis/authApi';

export type PasswordFieldType = {
  password?: Maybe<string | undefined>;
  currentpwd: string;
  confirmpwd: string;
};

export type OtpResponseType = {
  status: string;
  message: string;
};
export interface IUserFormData {
  id: number;
  name?: string;
  professional_role?: string;
  career_start_year?: number;
  credential_url?: string;
  email?: string;
  mobile?: string;
  password?: string;
}

export interface IAccountFormDataAttributes {
  fullname?: string;
  title?: string;
  career_start_year?: number;
  credential_url?: string;
}

export interface IAccountFormData {
  id: number;
  data?: string;
  files?: File[] | string | Blob | File;
}

export interface IServerError {
  status: number | string | null;
  message: string;
  name: string;
}

export interface IServerErrorResponse {
  data: {
    data: null | any;
    error: {
      message: string;
      name: string;
      status: number | string;
    };
  };
  status: number | string;
}

export interface IEmailConfirmationResponse {
  data: {
    email: string;
    message: string;
  };
}

export const mapApiErrors = (response: any): IServerError | null => {
  if (response.error) {
    return {
      message: response.error.data.error.message,
      name: response.error.data.error.name,
      status: response.error.data.error.status,
    };
  }
  return null;
};

export const updateUserFullName = (name: string, dispatch: React.Dispatch<any>) => {
  return dispatch(buyerAccountApi.endpoints.updateUser.initiate({ data: { name: name } }));
};

export const updateUserMobile = (mobile: string, dispatch: React.Dispatch<any>, mobileCountryCode: string) => {
  return dispatch(
    buyerAccountApi.endpoints.updateUser.initiate({ data: { mobile: mobile, mobileCountryCode: mobileCountryCode } }),
  );
};

export const updateUserPhoto = (profile_photo: string, profile_photo_id: string, dispatch: React.Dispatch<any>) => {
  return dispatch(
    buyerAccountApi.endpoints.updateUser.initiate({
      data: { profile_photo: profile_photo, profile_photo_id: profile_photo_id },
    }),
  );
};

export const updateUserPassword = (
  currentPassword: string,
  newPassword: string,
  newPasswordConfirmation: string,
  dispatch: React.Dispatch<any>,
) => {
  return dispatch(userAuthApi.endpoints.changePassword.initiate({ currentPassword, newPassword, newPasswordConfirmation }));
};

export const resendEmailConfirmationService = (userId: string, dispatch: React.Dispatch<any>) => {
  return dispatch(userAuthApi.endpoints.resendEmailConfirmation.initiate({ userId }));
};

/**
 * @Deprecated
 */
export const updateAccountDetailService = (id: number, fields: FormData, dispatch: React.Dispatch<any>) =>
  dispatch(buyerAccountApi.endpoints.updateAccount.initiate({ id: id, data: fields }));

export const checkMobileNumberExists = (phone: string, dispatch: React.Dispatch<any>) =>
  dispatch(userAuthApi.endpoints.getUserMobile.initiate({ phone }));
export const resendOtpCode = (phone: string, dispatch: React.Dispatch<any>) => {
  return dispatch(userAuthApi.endpoints.sendOtpCode.initiate(phone));
};

export const sendOtp = async (phone: string, dispatch: React.Dispatch<any>, callback?: any) => {
  const result: any = dispatch(userAuthApi.endpoints.sendOtpCode.initiate(phone));
  await result.then((response: any) => {
    if (!isUndefined(response.data)) {
      const { status, statusText, message } = response.data;
      if (status && statusText === 'SUCCESS') {
        callback && callback({ status: 'success', message });
      }
    } else {
      callback && callback({ status: 'error', message: response.error.data.error.message });
    }
  });
};
