import { useSetState } from 'react-use';
import { useGetCitiesQuery, useGetCountriesQuery, useGetStatesQuery } from '@/redux/apis/countries.api';
import { City, Country, State } from '@/common/interface/country-interface';
import { useEffect } from 'react';

interface IProps {
  country?: string;
  city?: string;
  state?: string;
}

function useCountries({ country, city, state }: IProps) {
  const [{ selectedCountry, selectedState, selectedCity }, setState] = useSetState<{
    selectedCountry: Country | null;
    selectedState: State | null;
    selectedCity: City | null;
  }>();
  const { data: countries } = useGetCountriesQuery();
  const { data: states } = useGetStatesQuery({ iso3: selectedCountry?.iso3 ?? '' }, { skip: !selectedCountry?.iso3 });
  const { data: cities } = useGetCitiesQuery(
    {
      iso3: selectedCountry?.iso3 ?? '',
      stateCode: selectedState?.state_code ?? '',
    },
    { skip: !selectedCountry?.iso3 || !selectedState?.state_code },
  );

  useEffect(() => {
    if (countries && selectedCountry == null && country) {
      const index = countries.findIndex((c) => c.name === country);
      if (index >= 0)
        setState({
          selectedCountry: countries[index],
        });
    }
  }, [countries, country, selectedCountry, setState]);

  useEffect(() => {
    if (states && selectedState == null && state) {
      const index = states.findIndex((c) => c.name === state);
      if (index >= 0)
        setState({
          selectedState: states[index],
        });
    }
  }, [selectedState, setState, state, states]);

  useEffect(() => {
    if (cities && !selectedCity && selectedState && city) {
      const index = cities.findIndex((c) => c.name === city);
      if (index >= 0)
        setState({
          selectedCity: cities[index],
        });
    }
  }, [cities, city, selectedCity, selectedState, setState]);

  return { countries, states, cities, selectedCountry, selectedState, selectedCity, setState };
}

export default useCountries;
