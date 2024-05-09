import { isUndefined } from 'lodash';
import { useState } from 'react';
import usePayload from './usePayload';

const useCountryValue = () => {
  const { countryCode, countryNameGet } = usePayload();

  const [country, setCountry] = useState<string>(!isUndefined(countryCode) ? countryCode : '+65');
  const [countryName, setCountryName] = useState<string>(countryNameGet ?? 'Singapore');

  return { country, setCountry, countryName, setCountryName };
};

export default useCountryValue;
