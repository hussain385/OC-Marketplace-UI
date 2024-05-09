export interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native?: string;
  region: Region;
  region_id?: string;
  subregion: string;
  subregion_id?: string;
  nationality: string;
  timezones?: Timezone[];
  translations: Translations;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

export type Region = 'Asia' | 'Europe' | 'Africa' | 'Oceania' | 'Americas' | 'Polar' | '';

export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface Translations {
  kr: string;
  'pt-BR'?: string;
  pt?: string;
  nl?: string;
  hr?: string;
  fa?: string;
  de?: string;
  es?: string;
  fr?: string;
  ja?: string;
  it?: string;
  cn: string;
  tr: string;
}

export interface State {
  id: number;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  type: null;
}

export interface City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export interface ICountrySelectInfo {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
  region: string;
}
