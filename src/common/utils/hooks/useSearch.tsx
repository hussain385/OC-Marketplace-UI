import React, { useCallback, useState } from 'react';
import jsonCountry from '../../mock-data/api/country.json';

type CountryProps = {
  countryName: string;
  countryCode: string;
  countryLength: number[];
  countryPrefixes: number[];
  countryNumber: string;
};

const useSearchManagerforCountry = () => {
  const [valInputSearch, setSearchValInput] = useState('');

  const [search, setSearch] = useState([]);

  const searchHandler = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchValInput('');

    if (value !== '') {
      const filterValueLowerCase = value.toLowerCase().trim();
      const filterValue = value.trim();

      setSearchValInput(filterValue);

      const filterData = jsonCountry.filter((val: CountryProps) => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { countryName, countryNumber, countryCode, ...rest } = val;
        const plusSign = '+';
        const countryN =
          countryName.toLowerCase().includes(filterValueLowerCase) ||
          countryCode.toLowerCase().includes(filterValueLowerCase) ||
          countryName.includes(filterValue) ||
          countryNumber.includes(filterValue) ||
          plusSign.concat(countryNumber).includes(filterValue) ||
          countryCode.includes(filterValue);
        return countryN;
      });

      setSearch(filterData as []);
    } else {
      setSearchValInput('');
      setSearch([]);
    }
  }, []);

  const [open, setOpen] = useState(false);

  const dropdownClick = useCallback(() => {
    setOpen(!open);
    setSearchValInput('');
    setSearch([]);
  }, [setOpen, open]);

  const onLeaveHandler = useCallback(() => {
    setOpen(false);
    setSearchValInput('');
    setSearch([]);
  }, [setOpen, setSearchValInput]);

  return {
    valInputSearch,
    search,
    searchHandler,
    setSearchValInput,
    setSearch,
    dropdownClick,
    onLeaveHandler,
    open,
    setOpen,
  };
};

export default useSearchManagerforCountry;
