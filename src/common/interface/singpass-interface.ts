export interface SingpassRet {
  entity: Entity;
  person: Person;
  sessionId: string;
}

export interface Entity {
  appointments: Addresses;
  'basic-profile': BasicProfile;
  addresses: Addresses;
}

export interface Addresses {
  lastupdated: Date;
  source: string;
  'addresses-list'?: AddressesList[];
  classification: string;
  'appointments-list'?: AppointmentsList[];
  value?: string;
}

export interface AddressesList {
  standard: BusinessConstitution;
  country?: BusinessConstitution;
  unit?: BusinessExpiryDate;
  street?: BusinessExpiryDate;
  block?: BusinessExpiryDate;
  postal?: BusinessExpiryDate;
  floor?: BusinessExpiryDate;
  type: string;
  building?: BusinessExpiryDate;
  line2?: BusinessExpiryDate;
  line1?: BusinessExpiryDate;
}

export interface BusinessExpiryDate {
  value: string;
}

export interface BusinessConstitution {
  code: string;
  desc: string;
}

export interface AppointmentsList {
  'person-reference': PersonReference;
  position: BusinessConstitution;
  'appointment-date': BusinessExpiryDate;
  'corppass-email': BusinessExpiryDate;
  category: BusinessConstitution;
  'corppass-mobileno': BusinessExpiryDate;
}

export interface PersonReference {
  nationality: BusinessConstitution;
  idno: BusinessExpiryDate;
  'person-name': BusinessExpiryDate;
}

export interface BasicProfile {
  uen: BusinessExpiryDate;
  'entity-name': BusinessExpiryDate;
  'entity-type': BusinessConstitution;
  'entity-status': BusinessExpiryDate;
  'primary-activity': BusinessConstitution;
  'primary-user-described-activity': BusinessExpiryDate;
  'secondary-activity': BusinessConstitution;
  'secondary-user-described-activity': BusinessExpiryDate;
  'registration-date': BusinessExpiryDate;
  source: string;
  classification: string;
  'company-type'?: BusinessConstitution;
  ownership?: BusinessConstitution;
  'country-of-incorporation'?: BusinessConstitution;
  'business-constitution'?: BusinessConstitution;
  'business-expiry-date'?: BusinessExpiryDate;
}

export interface Person {
  uinfin: Addresses;
  name: Addresses;
  nationality: Nationality;
}

export interface Nationality {
  lastupdated: Date;
  code: string;
  source: string;
  classification: string;
  desc: string;
}
