/* eslint-disable no-unused-vars */
import { BuyerRatingPoint, ICounts } from '../../modules/reviews/src/utils/interface-validation';
import { ILogo, Status } from './index';
import { IEntity } from './entity-interface';
import { Category } from './service-interface';

export interface PackageInfo {
  merchantId: string;
  planId: string;
  serviceId: string;
  companyId?: string;
  serviceName: string;
  companyName: string;
  categoryName: string;
  whatYouGet: string;
  deliveryTime: string;
  requirements?: string;
  paymentSchedule: boolean;
  packageHeading: string;
  price: number;
  orderId: string;
  vkey?: string;
  vcode?: string;
  returnurl?: string;
  callbackurl?: string;
  paymentUrl?: string;
  bill_name?: string;
  bill_email?: string;
  bill_mobile?: string;
  bill_desc?: string;
}

export interface IPlanInterface {
  id: number;
  title: string;
  description: string;
  duration: string;
  requirements: string;
  price: string;
  is_one_time_payment: boolean;
  status: string;
}

export interface ICompanyInfo {
  id: string;
  logo: string;
  name: string;
  createdAt: string;
  about: string;
}

enum SERVICE_STATUS {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}

export interface IServiceCategory {
  uid?: string;
  name?: string;
  status?: SERVICE_STATUS;
  position?: number | null;
  description?: string | null;
  relations?: Partial<{
    serviceCategoryId: string | null;
  }>;
  __subCategories?: IServiceCategory[];
}

export interface IServiceRequirementData {
  resourceId: string;
  data: {
    type: string;
    data: {
      question: string;
      isAllowMultipleChoice?: boolean;
      options?: string[];
    };
  };
}

export interface IServiceUpdateRequirementData {
  data: {
    type: string;
    data: {
      question: string;
      isAllowMultipleChoice?: boolean;
      options?: string[];
    };
  };
}

export interface ICatalog {
  // relations:   CatalogRelations;
  _id: string;
  name: string;
  description: string;
  status: Status;
  isCensored: boolean;
  currentStep: number;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  __entity: IEntity;
  __plans: IPlan[];
  __medias: ILogo[];
  __averages?: BuyerRatingPoint;
  __counts?: ICounts;
  __categories?: Category[];
  id: string;
}

export interface IPlan {
  relations: IPlanRelations;
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  requirements: null | string;
  exclusions: null;
  currency: string;
  duration_min: number;
  duration_max: number;
  transactionType: TransactionType;
  status: Status;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  isCensored?: boolean;
  // services?: Service[];
}

export enum TransactionType {
  Single = 'SINGLE',
  Milestone = 'MILESTONE',
  Subscription = 'SUBSCRIPTION',
}

export interface IPlanRelations {
  serviceId: string;
}
