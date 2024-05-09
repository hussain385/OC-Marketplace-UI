import { isUndefined } from 'lodash';
import React, { useState, useCallback } from 'react';

import { useAppSelector } from '../../../redux/hooks';

import useSearchManagerforCountry from './useSearch';

const useMobileCountry = () => {
  const { useInfo } = useAppSelector((state) => state.mainState);

  const { countryCode: countryGetCode, countryName: countryGetName } = !isUndefined(useInfo.payload) ? useInfo.payload : '';

  const { setSearchValInput, setSearch } = useSearchManagerforCountry();

  const [open, setOpen] = useState<boolean>(false);

  const [countryName, setCountryName] = useState<string>(countryGetName ?? 'Singapore');

  const [country, setCountry] = React.useState<string>(countryGetCode ?? '+65');

  const phoneHandlerInput = useCallback(() => {
    setOpen(!open);
    setSearchValInput('');
    setSearch([]);
  }, [setOpen, open]);

  return {
    open,
    phoneHandlerInput,
    setOpen,
    countryName,
    country,
    setCountry,
    setCountryName,
  };
};

export default useMobileCountry;
