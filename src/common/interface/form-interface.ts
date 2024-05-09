import { InputProps } from '@mui/material';
import React from 'react';

type FormProps = {
  name: string;
  label?: string;
  children?: React.ReactNode;
  getValuebyInput?: string;
} & InputProps;

type BusineProfileFormProps = FormProps;

type FormInputPropsType = {
  emailErr?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  showPassword?: boolean;
  inputOverrideStyle?: object;
} & FormProps;

type FormEmailMobilePropsType = {
  onClickHandler: () => void;
  countryNumber?: string;
  countryName?: string;
  validated?: boolean;
  setValue?: string;
  isNotEmail?: boolean;
  disabled?: boolean;
} & FormProps;

type FormMobilePropsType = {
  onClickHandler: () => void;
  countryNumber?: string;
  countryName?: string;
  validated?: boolean;
  mobileErr?: string;
  setMobileExist: React.Dispatch<React.SetStateAction<string>>;
} & FormProps;

export type { FormInputPropsType, FormMobilePropsType, FormEmailMobilePropsType, BusineProfileFormProps };
