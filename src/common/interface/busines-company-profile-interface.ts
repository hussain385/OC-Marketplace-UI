/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { IMedia } from '@/common/interface/index';
import { IEntity } from '@/common/interface/entity-interface';
import { Category, Package } from '@/common/interface/service-interface.ts';

export enum CompanyStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECT',
  VERIFIED = 'VERIFIED',
  DRAFT = 'DRAFT',
}

export enum companyProfiles {
  individual = 'INDIVIDUAL',
  business = 'BUSINESS',
  freelancer = 'FREELANCER',
}

export enum SelectedCompanyStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
}

export interface ICompaniesResponse {
  id?: string;

  attributes: {
    uid?: string;
    UEN?: string;
    name?: string;
    registered_address?: string;
    status: CompanyStatus;
  };
}

export interface IGetCompanyInfo {
  data: {
    claims: Array<{
      company: {
        id: string;
        // other properties of the company
      };
    }>;
  };
}

export interface IUser {
  email: string;
  mobile: string;
  uid: string;
  name: string;
}

interface ICompanyAwards {
  data: any[];
}
interface ICompanyEmployees {
  data: any[];
}
interface ICompanyLogo {
  data: any;
}
interface ICompanyMetadata {
  categories: any[];
}
interface ICompanyServices {
  data: any[];
}
interface ICompanyAttributes {
  SSIC: string;
  SSIC_description: string | null;
  UEN: string;
  about: string | null;
  awards: ICompanyAwards;
  createdAt: string;
  employees: ICompanyEmployees;
  incorporation_date: string | null;
  logo: ICompanyLogo;
  metadata: ICompanyMetadata;
  name: string;
  official_email: string;
  official_phone: string;
  official_website: string | null;
  operation_year: string | null;
  publishedAt: string;
  registered_address: string;
  services: ICompanyServices;
  status: string;
  uid: string;
  updatedAt: string;
  workforce: any | null;
}
export interface ICompanyData {
  attributes: ICompanyAttributes;
  id: number;
  meta: Record<string, unknown>;
}
export interface ICompanyBusinessProfile {
  data: ICompanyData;
}

export interface IPaymentSchedules {
  relations: {
    planId: string;
  };
  title: string;
  amount: number;
  type: string;
  orderNumber: number;
  status: string;
  uid?: string;
  id?: string;
}

export interface IPlanData {
  uid: string;
  title: string;
  description: string;
  duration: string;
  requirements: string;
  price: string;
  is_one_time_payment: boolean;
  status: boolean;
  paymentSchedules?: IPaymentSchedules | undefined;
}

export interface IMilestoneState {
  price: number;
  deliverable: string;
  inverted: boolean;
  id: number;
  duration: string;
  uid?: string;
  isEscrow: boolean;
  initialDepositPrice?: number;
  initialDepositId?: string;
}

export interface IPackage extends Package {
  milestones: IMilestoneState[];
}

export interface IRequirementState {
  id: string;
  type: string;
  question: string;
  no: number;
  options: string[];
  isAllowMultipleChoice: boolean;
  edit: boolean;
  isRequired: boolean;
}

export interface IRequirement {
  uid: string;
  type: string;
  description: string;
  options?: string[];
  multipleSelection?: boolean;
  edit: boolean;
  answers?: string[] | number[] | string;
  attachs?: { url: string; originalName: string; fileType: string; size: number }[] | null;
}

export interface IMilestone {
  packageId: string;
  price: number;
  bulk: IMilestoneBulk[];
}

export interface IMilestoneBulk {
  no: number;
  items: {
    no: number;
    type: string;
    price?: number;
    deliverableText?: string;
  }[];
}

export interface IServicesData {
  status: string;
  step: number;
  edit: boolean;
  uid: string;
  servicePic: { picUrl: string; uid: string }[];
  categories: string[];
  about: string;
  title: string;
  package1: undefined | IPackage;
  package2: undefined | IPackage;
  package3: undefined | IPackage;
}

export interface IRequirementsRequest {
  serviceId: string;
  bulk: IRequirementsRequestBulk[];
}

export interface IRequirementsRequestBulk {
  type: string;
  question: string;
  no: number;
  isRequired: boolean;
  options: string[];
  isAllowMultipleChoice: boolean | null;
}

export interface IServiceRes {
  id: string;
  name: string;
  description: string;
  status: string;
  medias: IMedia[];
  createdAt: string;
  updatedAt: string;
  minPrice: number;
  minDeliveryDays: number;
  supporters: string[];
  enabledPaymentTypes: string[];
  step: number;
  packages: IPackage[];
  entity: IEntity;
  requirements: IRequirementRes[];
  categories: Category[];
}

export interface IRequirementRes {
  id: string;
  question: string;
  no: number;
  isRequired: boolean;
  type: string;
  options: string[];
  isAllowMultipleChoice: boolean | null;
}
