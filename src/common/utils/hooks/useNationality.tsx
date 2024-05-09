import React, { useCallback, useEffect, useState } from 'react';

import { IMenuItems } from '../../interface';

import jsonCountry from '../../mock-data/api/country.json';

export type JSONCountry = { name: string; value: string }[];

export interface Country {
  countryName: string;
  countryCode: string;
  countryLength: number[];
  countryPrefixes: number[];
  countryNumber: string;
}

export type CountryName = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countryName: [{ name: string; value: string }];
};

const useNationality = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [countryName, setCountryName] = useState<IMenuItems[]>([]);
  const mounted = React.useRef<boolean>(false);

  const countryNameList = useCallback(() => {
    mounted.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const objArray: JSONCountry = [];

    jsonCountry.map((value: Country) => {
      return objArray.push({ name: value.countryName, value: value.countryName });
    });

    setCountryName(objArray as any);
  }, [jsonCountry]);

  useEffect(() => {
    if (countryName.length === 0) {
      mounted.current = true;
      countryNameList();
    }

    () => (mounted.current = false);
  }, [countryName, mounted]);

  return { countryName };
};

export default useNationality;
