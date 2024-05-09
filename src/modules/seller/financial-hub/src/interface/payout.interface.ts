import { ACTIONSTATS, EntityStatusOptions, ObjectValues } from '../../../../../common/interface';

export interface IPayout extends BankAccount {
  latestRequest?: LatestRequest;
}

export interface IPayoutRequest {
  id: string;
  entityId: string;
  createdBy: string;
  action: string;
  metadata: Metadata;
  status: string;
  createdAt: Date;
  bankAccount: BankAccount;
}

export interface BankAccount {
  id: string;
  priority: number;
  currency: string;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  accountEmail: string;
  accountMobile: string;
  accountMobileCountryCode: string;
  companyName?: string;
  companyRegistrationNumber?: string;
  type: PayoutTypeObject;
  status: string;
  isVerified: boolean;
  entityId: string;
  payeeId: number;
  location: Location;
}

export type PayoutCreate = Metadata;

export interface PayoutCreateRequest {
  action: ACTIONSTATS;
  bankAccountId?: string;
  data?: Omit<Metadata, 'otp'>;
}

export interface PayoutUpdateRequest extends PayoutCreateRequest {
  bankAccountId: string;
}

export interface PayoutUpdateRequest extends PayoutCreateRequest {
  bankAccountId: string;
}

export interface PayoutUpdateRequestOwner {
  otp: string;
  status: 'REJECTED' | 'APPROVED';
  additionalData?: Partial<Omit<Metadata, 'otp'>>;
}

export interface PayoutDeleteRequest {
  action: ACTIONSTATS;
  bankAccountId: string;
}

export interface LatestRequest {
  id: string;
  entityId: string;
  createdBy: string;
  action: string;
  metadata: Metadata;
  status: EntityStatusOptions;
  createdAt: Date;
}

interface Metadata {
  otp: string;
  type: PayoutTypeObject;
  bankCode: string;
  bankName: string;
  companyName?: string;
  contactEmail: string;
  contactMobile: string;
  bankAccountNumber: string;
  bankAccountUsername: string;
  companyRegistrationId?: string;
  contactMobileCountryCode: string;
  location: Location;
}

export const PayoutTypes = {
  business: 'BUSINESS',
  individual: 'INDIVIDUAL',
} as const;

export type PayoutTypeObject = ObjectValues<typeof PayoutTypes>;

interface Location {
  state?: string;
  country?: string;
  city?: string;
  streetAddress: string;
  postalCode: string;
}
