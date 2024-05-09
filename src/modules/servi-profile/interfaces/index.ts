import { ILogo, ObjectValues } from '@/common/interface';

export type TAttributeTags = {
  uid: string;
  name: string;
};

interface ProfileAttributes {
  id: string;
  title: string;
  issuer: string;
  issuerYear: string;
  description?: string;
  url: string;
  entity: {
    id: string;
  };
}

export const ATTRIBUTE_STYLE = {
  plain: 'plain',
  chip: 'chip',
} as const;

export type TAttributeStyle = ObjectValues<typeof ATTRIBUTE_STYLE>;

export const ATT_DISPLAY_STYLE = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export type TAttributeDisplayType = ObjectValues<typeof ATT_DISPLAY_STYLE>;

export const ALIGNMENT = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
} as const;

export type TAlignment = ObjectValues<typeof ALIGNMENT>;

export const AVATAR_SIZE = {
  small: 40,
  medium: 60,
  large: 80,
} as const;

export type TAvatarSize = ObjectValues<typeof AVATAR_SIZE>;

export interface ICertificate extends Omit<ProfileAttributes, 'issuerYear'> {
  issuedYear: string;
  issuedMonth: string;
  expiredMonth?: string | null | undefined;
  expiredYear?: string | null | undefined;
  certId: string;
}

export type TEmployement = {
  id: string;
  title: string;
  years: string | number;
  companyName: string;
};

export interface ISkill {
  id: string;
  name: string;
  popularity_points: number;
}

export interface IAward extends ProfileAttributes {
  media: ILogo;
}
