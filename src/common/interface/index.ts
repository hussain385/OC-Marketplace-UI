import { SxProps } from '@mui/material';

export interface BaseInterface {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* eslint-disable no-unused-vars */
export enum NOTIFICATION_STATUS {
  READ = 'READ',
  UNREAD = 'UNREAD',
}

export interface IMenuItems {
  name: string;
  value: string;
  object?: object;
  labelStyle?: SxProps;
}

interface IUserPhoto {
  id?: number;
  name?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface ISender {
  id: number;
  name: string;
  photo?: IUserPhoto;
}

interface IRoomLatestMessage {
  id: number;
  createdAt: string;
  message: string;
  messageType: string;
  sender: ISender;
}

export interface IMedia {
  uid: string;
  name: string;
  url: string;
  width?: number;
  height?: number;
  mime?: string;
  ext?: string;
  size?: number;
  sender?: ISender;
  timestamp?: string;
}

export interface IUpdateState {
  [key: string]: any;
}

export interface IOrderInfo {
  buyerEntityId: string;
  sellerEntityId: string;
  transactionType: string;
  currency: string;
  serviceId: string;
  planId: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IPaginateResponseGlobal<T> {
  totalDocs: number;
  totalPages: number;
  currentPage: number;
  previousPage?: string;
  nextPage?: string;
  limit?: number;
  docs: T[];
}

/**
 * you can also use our queryBuilder
 */
export interface IQueryGlobal {
  populate?: TPopulate;
  options?: IQueryOptionGlobal;
  filter?: Record<string, any> | string[] | string;
  join?: string | string[];
  sort?: string;
  s?: string;
  id?: string;
  limit?: number;
  page?: number;
  export?: 'csv' | 'pdf';
  fromDate?: string;
  toDate?: string;
  invitationToken?: string;
}

export type TPopulate = string | string[] | IPopulateObject | IPopulateObject[];

export interface IPopulateObject {
  path: string;
  match?: Record<string, any>;
  populate?: TPopulate;
}

export interface IQueryOptionGlobal {
  limit?: number;
  page?: number;
  sort?: ISortGlobal;
}

export interface ISortGlobal {
  [key: string]: 'asc' | 'desc' | 'ascending' | 'descending';
}

export interface ILogo {
  id: string;
  uid: string;
  size: number;
  domain: string;
  status: string;
  mimetype: string;
  position: number;
  protocol: string;
  resource: string;
  sasToken?: string;
  container: string;
  createdAt: string;
  extension: string;
  fieldname: string;
  updatedAt: string;
  originalname: string;
}

export enum Status {
  Disable = 'DISABLE',
  Enable = 'ENABLE',
}

export const EntityStatus = {
  pending: 'PENDING',
  processing: 'PROCESSING',
  rejected: 'REJECTED',
  verified: 'VERIFIED',
  draft: 'DRAFT',
  inviting: 'INVITING',
} as const;

export type EntityStatusOptions = ObjectValues<typeof EntityStatus>;

export enum USER_GROUP {
  Buyer = 'BUYER',
  Seller = 'SELLER',
}

export enum USER_GROUP_LOWERCASE {
  buyer = 'buyer',
  seller = 'seller',
}

export const UserGroupLower = {
  buyer: 'buyer',
  seller: 'seller',
} as const;

export type UserGroupLowerType = ObjectValues<typeof UserGroupLower>;

export interface IMetadataResponse {
  id: number;
  name: string;
  about?: string;
  status: string;
  registered_address?: string;
  UEN: string;
  SSIC_description?: string;
}

export interface ISerivcesResponseMetaData {
  name: string;
  description?: string;
  category?: any;
  subcategory?: any;
}

export type IError = {
  status: string | undefined;
  data: { error: { message: string } };
};

export type IIError = {
  status?: string | number | undefined;
  statusCode?: string;
  statusText?: string;
  data: { message: string; description?: { issues: [] } };
};

export type IdentityRegisterInfo = {
  id: string;
  documentType?: string;
  identificationName?: string;
  identificationNumber?: string;
  nationality?: string;
  status?: 'DRAFT' | 'PENDING' | 'PROCESSING' | 'VERIFIED' | 'REJECTED';
  step?: number;
};

export type FileUpload = {
  uploadFile: File[] | string | Blob | File;
  key: string;
};

export interface IOMEndpointProps {
  orderId: string;
  text: string;
  attachs: string[];
  deliveryId?: string;
  isAccepted?: boolean;
}

export interface ICategories {
  uid: string;
  name: string;
}

export interface ICatalogServiceDetails {
  data: [] | null;
  currentPage?: number;
  totalDocs: number;
  totalPages: number;
  limit?: number;
  nextpage?: string;
  previousPage?: string;
}

export type ObjectValues<T> = T[keyof T];

export const ACTION = {
  create: 'CREATE',
  update: 'UPDATE',
  delete: 'DELETE',
};

export type ACTIONSTATS = ObjectValues<typeof ACTION>;

export interface IKey {
  id: number;
  type: string;
  subtype: null;
  code: string;
  text: string;
  metadata?: { logo?: string };
}

export interface Profiles<I, K = I> {
  sellerProfile: I;
  buyerProfile: K;
}

export interface IGlobalPagination<T> {
  total: number;
  count: number;
  page: number;
  pageCount: number;
  data: T[];
}
