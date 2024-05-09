import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IHookStateSetAction } from 'react-use/lib/misc/hookState';
import { LoginSchemaType } from '../utils/schema/login-schema';

export type ILoginDropdown = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCountryName: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  countryName: string;
};

export type ILoginRes = {
  status: string | undefined;
  data: {
    jwt: string;
    refresh_token?: string;
    user: {
      metadata: {
        categories: string[];
      };
    };
    error: { message: string };
  };
};

export interface ILoginRedirect {
  jwt: string;
  user: Record<string, string | boolean | number | object | []>;
}

export interface ConditionResponse {
  status: string | undefined;
  data: {
    jwt: string;
    user: {
      metadata: {
        categories: string[];
      };
    };

    claims: Array<{
      company: {
        id: string;
        metadata: {
          step: number;
          creatorType: string;
        };
      };
      grant: {
        title: string;
      };
    }>;

    error: { message: string };
  };
}

export interface ConditionUser {
  companies: Array<{
    id: string;
  }>;
}

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
