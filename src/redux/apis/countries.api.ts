import { extraBaseApi } from '@/redux/baseAPI';
import { City, Country, State } from '@/common/interface/country-interface';

export const countriesApi = extraBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => 'https://opncorpmedia.blob.core.windows.net/ocmpubstore/locations/countries.json',
    }),
    getStates: builder.query<State[], { iso3: string }>({
      query: ({ iso3 }) =>
        `https://opncorpmedia.blob.core.windows.net/ocmpubstore/locations/countries.${iso3.toLowerCase()}.states.json`,
    }),
    getCities: builder.query<City[], { iso3: string; stateCode: string }>({
      query: ({ iso3, stateCode }) =>
        `https://opncorpmedia.blob.core.windows.net/ocmpubstore/locations/countries.${iso3.toLowerCase()}.states.${stateCode.toLowerCase()}.cities.json`,
    }),
  }),
});

export const { useGetCountriesQuery, useGetCitiesQuery, useGetStatesQuery } = countriesApi;
