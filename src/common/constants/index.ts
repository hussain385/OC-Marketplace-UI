//file://constants/index.ts contains all constants
import { PROFILE_TYPE, ProfileType } from '@/common/interface/entity-interface.ts';
import { NoInfer } from 'react-redux';
import { rolePermission, UserPermissions } from '@/common/interface/User.ts';

export const ImageURL = import.meta.env.VITE_API_SERVER_URL;
export const RESEND_OTP_TIMEOUT = 60; // 1 min

export const EMAILREGEX =
  // eslint-disable-next-line no-control-regex
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
export const UPPERCASE_REGEX = /^((?=.*[A-Z]).{1,})$/;
export const DIGIT_REGEX = /[0-9]/;
export const LETTER_REGEX = /[a-zA-z]/;
export const PASSWORD_REGEX = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?![~@#\$%\^&\*_\-\+=`|{}:;!\.\?\"()\[\]]).{8,})$/;
export const MIN_CHARNUM_REGEX = /^((?=.*[a-zA-Z0-9])(?![~@#\$%\^&\*_\-\+=`|{}:;!\.\?\"()\[\]]).{8,})$/;
export const MIN_CHAR_REGEX = /^((?=.*[a-z])(?=.*[A-Z]).{8,})$/;
export const LOWERCASE_REGEX = /^((?=.*[a-z]).{1,})$/;

export const CHAR_ONLY_REGEX = /^[A-Za-z\s]+$/;
export const ALPHA_NUMERIC_REGEX = /^[A-z]\d*$/;
export const SPECIAL_CHARACTER_REGEX = /\W|_/;

export const ALLOWED_IMAGE_EXT = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/jfif ',
  'image/pjpeg ',
  'image/pjp',
  'image/webp',
  'image/bmp',
  // 'image/svg+xml',
];

export const SERVER_URL = `${import.meta.env.VITE_API_SERVER_URL}/${import.meta.env.VITE_API_VERSION}`;
export const SERVICE_URLS = {
  COMMUNICATION: `${SERVER_URL}/communication`,
  MARKET_PLACE: `${SERVER_URL}/marketplace`,
  IAM: `${SERVER_URL}/iam`,
  NOTIFICATION: `${SERVER_URL}/notification`,
  MEDIA: `${SERVER_URL}/media`,
  TRANSACTION: `${SERVER_URL}/transaction`,
};

export const reducerPath = {
  account: 'accountUser',
  auth: 'userLogin',
  catalog: 'catalogInfo',
  accountApi: 'accountApi',
  company: 'companyInfo',
  marketplace: 'marketplace',
  media: 'media',
  teams: 'teamManagement',
  transaction: 'transactionInfo',
  verification: 'userNotification',
};

/**
 * This has to be removed once order management v2 is completed
 */
export const ORDER_STATUS: any = {
  2000: 'NOT-STARTED',
  2001: 'IN-PROGRESS',
  2002: 'REQUEST-REVISION',
  2003: 'LATE',
  2004: 'REVIEW-DELIVERY',
  2005: 'REQUEST-CANCELLATION',
  2006: 'CANCELLED',
  2007: 'COMPLETED',
  2008: 'FAILED',
  2009: 'WAITING_PAYMENT',
  2054: 'MISSING-REQUIREMENT',
  2051: 'LATE',
};

export const BLACKLIST_FILE_EXT = ['exe', 'js', 'php', 'jsx', 'sh', 'bat', 'py', 'script'];

export function photoUrlLink(userId: string, uid: string, type = 'users') {
  return `https://opncorpmedia.blob.core.windows.net/ocmpubstore/${type}/${userId}/${uid}`;
}

export const LIMIT = 10; //default record page limit

export interface ICard<T extends ProfileType> {
  img: any;
  text1: string;
  url: string;
  allowedAccounts: T[];
  text2: string | Record<NoInfer<T>, string>;
  tag: string;
  type: string;
  permission?: UserPermissions;
}

function defineCards<Allowed extends [ProfileType, ...ProfileType[]] | []>(cards: {
  [I in keyof Allowed]: ICard<Allowed[I]>;
}): ICard<ProfileType>[] {
  return cards;
}

export const cards = defineCards([
  {
    img: require('../../assets/icons/receipt.svg').default,
    text1: 'Sale management',
    url: '/account/order-management?profileType=seller',
    text2: 'Manage sales and track order progress',
    tag: 'sale-management',
    type: 'Selling',
    allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.freelancer],
    permission: rolePermission.sell,
  },
  {
    img: require('../../assets/icons/browser.svg').default,
    text1: 'Manage listing',
    url: '/account/manage-listing',
    text2: 'Info about your provided services',
    tag: 'manage-listing',
    type: 'Selling',
    allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.freelancer],
  },
  {
    img: require('../../assets/icons/buisness.svg').default,
    text1: 'Seller profile',
    url: '/account/seller-profile',
    text2: {
      [PROFILE_TYPE.business]: 'Manage or add new company in your organisation',
      [PROFILE_TYPE.freelancer]: 'Your info as a business for buyer’s reference',
    },
    tag: 'company-profile',
    type: 'Selling',
    allowedAccounts: [PROFILE_TYPE.freelancer, PROFILE_TYPE.business],
  },
  {
    img: require('../../assets/icons/financial-hub.svg').default,
    text1: 'Financial hub',
    url: '/account/financial-hub',
    text2: 'Manage your earnings, withdrawals, invoices, and payout methods',
    tag: 'financial-hub',
    type: 'Selling',
    allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.freelancer],
    permission: rolePermission.finance,
  },
  // {
  //   img: require('../../assets/icons/manage-proposal.svg').default,
  //   text1: 'Manage Proposal',
  //   url: '/account/manage-proposal',
  //   text2: 'Info about your submitted proposals',
  //   tag: 'manage-proposal',
  //   type: 'Selling',
  //   allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.freelancer],
  // },
  {
    img: require('../../assets/icons/receipt.svg').default,
    text1: 'Order management',
    url: '/account/order-management?profileType=buyer',
    text2: 'Check and track your orders',
    tag: 'order-payment',
    type: 'Buying',
    allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.individual, PROFILE_TYPE.freelancer],
    permission: rolePermission.buy,
  },
  {
    img: require('../../assets/icons/staff.svg').default,
    text1: 'Billing',
    url: '/account/billing',
    text2: 'Check your orders and payment',
    tag: 'billing',
    type: 'Buying',
    allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.individual, PROFILE_TYPE.freelancer],
  },
  {
    img: require('../../assets/icons/staff.svg').default,
    text1: 'Team management',
    url: '/account/team-management',
    text2: 'Manage and give approval to access your organisation',
    tag: 'team-management',
    type: 'General',
    allowedAccounts: [PROFILE_TYPE.business],
  },
  {
    img: require('../../assets/icons/profile.svg').default,
    text1: 'My profile',
    url: '/account/my-profile',
    text2: 'User profile details and how we can reach you',
    tag: 'my-profile',
    type: 'General',
    allowedAccounts: [PROFILE_TYPE.business, PROFILE_TYPE.individual],
  },
]);
