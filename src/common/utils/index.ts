/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import * as crypto from 'crypto-js';
import { InputProps } from '@mui/material';
import { toast, ToastOptions } from 'react-toastify';
import React from 'react';
import { ICompaniesResponse } from '../interface/busines-company-profile-interface';
import { companyInfoApis } from '../../redux/apis/companyApi';
import { showAlertMessageMobile } from '../components/mobile-alert-box/alert.component';
import { isEmpty, isUndefined } from 'lodash';
import { companyByAccountUpdated, updateUserInfo } from '../../redux/reducers/authReducers';
import { GridComparatorFn, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { ILogo } from '../interface';
import moment from 'moment';

export const Encrypt = (text: string): string => {
  return crypto.AES.encrypt(text, import.meta.env.VITE_ENCRYPTION_KEY as string).toString();
};

export const Decrypt = (text: string): string => {
  const bytes = crypto.AES.decrypt(text, import.meta.env.VITE_ENCRYPTION_KEY as string);
  return bytes.toString(crypto.enc.Utf8);
};

export enum ToastTypes {
  SUCCESS = 'succes',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export const showToast = (message: string, type: ToastTypes) => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
    draggable: true,
    progress: undefined,
  };
  switch (type) {
    case ToastTypes.SUCCESS:
      toast.success(message, options);
      break;
    case ToastTypes.ERROR:
      toast.error(message, options);
      break;
    case ToastTypes.WARNING:
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
};

export const validateFileSize = (file: File, maxSize?: number): boolean => {
  const max = maxSize ? maxSize : 5242880; //5 mb
  if (file.size > max) {
    return false;
  }
  return true;
};

type FormProps = {
  name: string;
  label?: string;
  children?: React.ReactNode;
  getValuebyInput?: string;
  optional?: boolean;
} & InputProps;

type BusineProfileFormProps = FormProps;

type FormInputPropsType = {
  emailErr?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  showPassword?: boolean;
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

export const renameFile = (file: File, name: string, uid: string): File => {
  return new File([file] as File[], `${name}@${uid}.${file.name.split('.').pop()}`, { type: file.type });
};

export const fileDownloader = (url: string, filename: string): void => {
  fetch(url) // mode no-cors disable CORS error on browser { mode: 'no-cors' }
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch((error) => error);
};

export function getParamsValue(arr: string[], search: URLSearchParams) {
  const res = arr.map((value: string) => search.get(value));
  return res;
}

export function capitalize(char: string) {
  return char.charAt(0).toUpperCase() + char.slice(1).toLowerCase();
}

export function uniqueValue(str: string) {
  const value = str.split(' ');
  return [...new Set(value)].join(' ');
}

export function formatBytes(a: number, b = 2) {
  if (!+a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`;
}

export const truncate = (str: string, length = 36) => {
  return str && str.length > length ? str.substring(0, length) + '...' : str;
};

export function loginUserConditions<T>(
  data: T,
  userCategory: string,
  userRole: string,
  password: string,
  cb: (userRole: string, data: T, password: string) => void,
) {
  switch (userCategory) {
    case 'authenticated':
      cb(userRole, data, password);
      break;
    case 'BUYER':
      cb('buyer', data, password);
      break;
    case 'SELLER':
      cb('seller', data, password);
      break;
    default:
      cb('authenticated', data, password);
      break;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const passwordEncrypt = (res: any, password: string, dispatch: any) => {
  //Store encrypted password
  const { user } = res;
  const encryptedPassword = Encrypt(password);
  dispatch(
    updateUserInfo({
      user: {
        ...user,
        password: encryptedPassword,
      },
    }),
  );
};

export const mapCompanyData = (response: unknown) => {
  const res: ICompaniesResponse = response as ICompaniesResponse;

  if (res) {
    return {
      id: res.id,
      uid: res.attributes.uid,
      UEN: res.attributes.UEN,
      name: res.attributes.name,
      registered_address: res.attributes.registered_address,
      status: res.attributes.status,
    };
  }
  return null;
};

export const fetchAccountCompany = (id: string, dispatch: any) => {
  const getCompanyByAccount = dispatch(companyInfoApis.endpoints.getCompanyInfo.initiate(id));
  getCompanyByAccount.then((res: any) => {
    const data = mapCompanyData(res.data.data);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(companyByAccountUpdated(data!));
  });
};

export const pictureCustomName = (file: any, name: any, UID: any, professionalServices?: boolean) => {
  if (professionalServices) {
    return new File([file[0]] as File[], `${name}.${file[0].name.split('.').pop()}`, { type: file[0].type });
  }
  return new File([file[0]] as File[], `${name}@${UID}.${file[0].name.split('.').pop()}`, { type: file[0].type });
};

export const storePictures = async (name: string, url: string, uid: string, professionalServices?: boolean) => {
  if (professionalServices) {
    const blob = await fetch(url).then((res) => res.blob());
    return new File([blob], `${name}.${blob.type.split('/').pop()}`, { type: blob.type });
  }

  const blob = await fetch(url).then((res) => res.blob());
  return new File([blob], `${name}@${uid}.${blob.type.split('/').pop()}`, { type: blob.type });
};

export const mediaUrlGenerator = (data: ILogo | string): string => {
  if (typeof data === 'string') {
    return data;
  }

  const { protocol, domain, container, uid, sasToken } = data;
  return `${protocol || 'https'}://${domain}/${container}/${uid}${!sasToken ? '' : `%3F${encodeURI(sasToken)}`}`;
};

// export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
//   const res: Response = await fetch(dataUrl);
//   const blob: Blob = await res.blob();
//   return new File([blob], fileName, { type: 'image/jpg' });
// }

export function AlertMessageBox(xs: boolean, message: string, error?: string) {
  if (!isUndefined(error)) {
    if (xs === true) {
      showAlertMessageMobile(error, ToastTypes.ERROR);
    } else {
      showToast(error, ToastTypes.ERROR);
    }
  } else {
    if (!isEmpty(message)) {
      if (xs === true) {
        showAlertMessageMobile(message as string, ToastTypes.SUCCESS);
      } else {
        showToast(message as string, ToastTypes.SUCCESS);
      }
    }
  }
}

export function getUniqueArray<T>(array: T[], key1: keyof T) {
  return array.reduce((uniqueArray, obj) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isDuplicate = uniqueArray.some((uniqueObj: any) => uniqueObj[key1] === obj[key1]);
    if (!isDuplicate) {
      uniqueArray.push(obj);
    }
    return uniqueArray;
  }, [] as T[]);
}

export function containsUppercase(str: string) {
  return /[A-Z]/.test(str);
}

export const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
  return gridStringOrNumberComparator((v1 as any).name, (v2 as any).name, param1, param2);
};

export const role_list = [
  {
    name: 'Owner',
  },
  {
    name: 'Director',
  },
  {
    name: 'Partner',
  },
  {
    name: 'Authorised Representative',
  },
  {
    name: 'Others',
  },
];

/**
 * date count down timer
 * @param startDate
 * @param endDate
 * @returns Object - { data as endDate, month, year, hourLeft, time }
 */
export const dateDiff = (startDate: moment.Moment, endDate: moment.Moment) => {
  const duration = moment.duration(endDate.diff(startDate));
  const totalHours = parseInt(duration.asHours().toFixed(0));
  const time = `${endDate.format('HH:mm')}H`;
  const totalDays = parseInt(duration.asDays().toFixed(0));

  const dateObj: any = {
    date: endDate.date(),
    month: endDate.format('MMMM'),
    year: endDate.year(),
    hourLeft: '',
    time,
  };

  if (totalDays >= 2) {
    dateObj.hourLeft = `${totalDays}day(s)`;
  } else {
    if (totalDays >= 1 && totalDays < 2) {
      dateObj.hourLeft = `${endDate.format('HH:mm')}H`;
    } else {
      dateObj.hourLeft = `${totalHours}h`;
    }
  }
  return dateObj;
};
