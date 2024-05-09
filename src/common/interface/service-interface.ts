import { ILogo, ObjectValues } from '@/common/interface/index.ts';
import { IEntity } from '@/common/interface/entity-interface.ts';

export interface IService {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'DISABLED';
  createdAt: Date;
  updatedAt: Date;
  medias: ILogo[];
  minPrice: number;
  entity?: IEntity;
  categories: BaseCategory[];
  requirements: any[];
  packages: Package[];
  supporters: string[];
  step: number;
}

export interface BaseCategory {
  id: string;
  name: string;
  level: number;
}

export interface Category extends BaseCategory {
  description: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  childs?: Category[];
}

export const paymentFrequency = {
  monthly: 'MONTHLY',
  quarterly: 'QUARTERLY',
  yearly: 'YEARLY',
  annually: 'ANNUALLY',
} as const;

export type PaymentFrequency = ObjectValues<typeof paymentFrequency>;

export const paymentType = {
  milestone: 'MILESTONE',
  subscription: 'SUBSCRIPTION',
} as const;

export type PaymentTypes = ObjectValues<typeof paymentType>;

export interface Package {
  id: string;
  name: string;
  no: number;
  status: string | boolean;
  description: string;
  isContactFirst: boolean;
  prerequisite?: string;
  paymentType: null | PaymentTypes;
  paymentFrequency?: PaymentFrequency;
  subscriptionCount?: number;
  maxRevision: number | null;
  deliveryDays?: number;
  price: number | null;
  currency: string;
  service?: IService; // Join relation from package
}

export interface MilestoneItem {
  id: string;
  type: MilestoneTypes; // Consider using an enum or union type if there are specific, known types
  no: number;
  price?: number | null;
  deliverableText?: string | null;
  isEscrow?: boolean | null;
  deliveryDays?: number;
}

export interface Milestone {
  id: string;
  no: number;
  price: number;
  items: MilestoneItem[];
}

export interface Extra extends Package {
  milestones?: Milestone[];
}

// Extend or adjust the existing Package interface as necessary

export interface IPackagePrice {
  package1: number;
  package2: number;
  package3: number;
}

export const REQUIREMENT_TYPE = {
  freeText: 'FREE_TEXT',
  multiChoice: 'MULTIPLE_CHOICE',
  fileUpload: 'FILE_UPLOAD',
} as const;

export type ServiceRequirementType = ObjectValues<typeof REQUIREMENT_TYPE>;

export const milestoneType = {
  initial: 'INITIAL_DEPOSIT',
  payment: 'PAYMENT',
  deliverable: 'DELIVERABLE',
} as const;

export type MilestoneTypes = ObjectValues<typeof milestoneType>;

export interface ServiceRequirement {
  id: number;
  question: string;
  no: number;
  isRequired: boolean;
  type: ServiceRequirementType;
  options?: string[];
  isAllowMultipleChoice: boolean;
}

export interface IPackagePatchReq {
  isContactFirst: boolean;
  no: number;
  name: string;
  status: string;
  description: string;
  id: string;
  currency: string;
  service: {
    id: string;
  };
  prerequisite: any;
  paymentType: any;
  paymentFrequency: any;
  subscriptionCount: any;
  maxRevision: any;
  deliveryDays: any;
  price: any;
}

export interface IMilestoneResponse {
  no: number;
  items: IMilestoneArray[];
  id: string;
  package: {
    id: string;
  };
  price: number;
}

export interface IMilestoneArray {
  type: string;
  no: number;
  price?: number;
  isEscrow?: boolean;
  id: string;
  deliverableText?: string;
  deliveryDays?: number;
}
