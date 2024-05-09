import { SerializedError } from '@reduxjs/toolkit';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IHookStateSetAction } from 'react-use/lib/misc/hookState';
import { LoginSchemaType } from '../../../common/utils/schema/login-schema';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ILoginUser = {
  styleOveride?: React.CSSProperties;
};

export type LoginProps = {
  onSubmitHandler: SubmitHandler<LoginSchemaType>;
  formSubmitted: boolean;
  loginError: FetchBaseQueryError | SerializedError | undefined;
  acceptError: FetchBaseQueryError | SerializedError | undefined;
  acceptSuccess: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInviteEmail: any;
  setValidated: (state: IHookStateSetAction<boolean>) => void;
  validated: boolean;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  countryName: string;
  setCountryName: React.Dispatch<React.SetStateAction<string>>;
};
