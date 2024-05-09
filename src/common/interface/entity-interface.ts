import { EntityStatusOptions, ILogo, ObjectValues, Profiles, USER_GROUP } from './index';
import { BuyerRatingPoint, ICounts, SellerRatingPoint } from '../../modules/reviews/src/utils/interface-validation';
import { UserRoles } from '@/common/interface/User.ts';

export interface IEntity {
  profile: IProfile;
  identity?: Identity;
  relations: IEntityRelations;
  _id: string;
  currentStep: number;
  status: EntityStatusOptions;
  groups: USER_GROUP[];
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  __logo?: ILogo;
  id: string;
  averageRating: number;
  totalCount: number;
  __counts: Profiles<ICounts>;
  __averages: Profiles<BuyerRatingPoint, SellerRatingPoint>;
  metadata: Metadata;
  __mainIdentityMedia?: ILogo;
  __backIdentityMedia?: ILogo;
  __selfieIdentityMedia?: ILogo;
  __profileCertMedia?: ILogo;
  __awards?: Award[];
  __proofOfResidenceMedias?: ILogo[];
  skills: string[];
}

export const PROFILE_TYPE = {
  freelancer: 'FREELANCER',
  individual: 'INDIVIDUAL',
  business: 'BUSINESS',
} as const;

export type ProfileType = ObjectValues<typeof PROFILE_TYPE>;

export interface IProfile {
  id: string;
  type: ProfileType;
  detail: IProfileDetail;
}

export interface IProfileDetail {
  about: string;
  name: string;
  logo?: ILogo;
  operationYear: number;
  registrationId?: string;
  ssic?: string;
  workforce?: string;
  type: string;
  address: string;
  country: string;
  state?: string;
  city?: string;
  postalCode: string;
  certMediaId: string;
  professionalRole?: string;
  professionalStartYear?: string;
  credentialURL?: string;
  numberEmployees?: number;
}

export interface Identity {
  type: string;
  iamUserId: string;
  detail?: IdentityDetail;
}

export interface IdentityDetail {
  address: string;
  backMediaId?: string;
  businessRole?: string;
  city?: string;
  code: string;
  country: string;
  fullname: string;
  mainMediaId?: string;
  nationality: string;
  ownerEmail?: string;
  ownerName?: string;
  position?: string;
  postalCode: string;
  selfieMediaId?: string;
  state?: string;
}

export interface IEntityRelations {
  logoId: string;
}

export interface Metadata {
  source: string;
  reasonForSuspension: null;
  reasonForRemovalOfSuspension: null;
  reasonForRejection: null;
  statusBeforeSuspension: null;
}

export interface Member {
  id: string;
  role: UserRoles;
  entityId: string;
  entityType: string;
  entityClass: string;
  entityStatus: string;

  type: string;
  status: string;
  email: string;
  name: string;
  position: string;
  metadata: Metadata;
  expiredTime: null;
  createdAt: Date;
}

export interface Award {
  relations: Relations;
  _id: string;
  name: string;
  description: null;
  link: null;
  issuer: string;
  year: number;
  status: string;
  isCensored: boolean;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  __avatar: ILogo;
  id: string;
}

export interface Relations {
  entityId: string;
  mediaId: string;
}
