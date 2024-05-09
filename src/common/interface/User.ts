import { EntityStatusOptions, ILogo, ObjectValues } from './index';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  mobileCountryCode?: string;
  isActive: boolean;
  emailConfirmed: boolean;
  mobileConfirmed: boolean;
  metadata: Metadata;
  createdAt: Date;
  updatedAt: Date;
  singpassUser?: SingpassUser;
  roles: Role[];

  /** @deprecated */
  username: string;
  /** @deprecated */
  profile_photo?: string;
  /** @deprecated */
  profile_photo_id?: string;
  /** @deprecated */
  countryName?: string;
  /** @deprecated */
  password?: string;
  /** @deprecated */
  mobileGet?: string;
  /** @deprecated */
  uid?: string;
  /** @deprecated */
  updateMobileSuccess?: any;
}

export interface Metadata {
  categories: string[];
}

export interface Role {
  id: string;
  role: UserRoles;
  entityId: string;
  entityLogo?: ILogo;
  entityName: string;
  entityType?: companyProfiles;
  entityClass?: string;
  entityStatus: EntityStatusOptions;
  metadata: RoleMetadata;
}

export interface RoleMetadata {
  permissions: UserPermissions[];
}

export const rolePermission = {
  buy: 'PG:Buy',
  sell: 'PG:Sell',
  finance: 'PG:Finance',
} as const;

export type UserPermissions = ObjectValues<typeof rolePermission>;

export const UserRole = {
  Owner: 'Owner',
  Individual: 'Individual',
  Admin: 'Admin',
  Member: 'Member',
  Unknown: '',
} as const;

export type UserRoles = ObjectValues<typeof UserRole>;

export interface SingpassUser {
  id: string;
  registrationToken: string;
  singpassNRIC: string;
  singpassUUID: string;
  status: string;
}
