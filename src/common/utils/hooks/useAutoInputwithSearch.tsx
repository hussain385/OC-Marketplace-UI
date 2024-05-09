/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';

import React, { useCallback, useState } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '../../../redux/hooks';

import httpClient from '../htttpClient';
import { SERVICE_URLS } from '../../constants';
import { userValidUpdated } from '../../../redux/reducers/authReducers';

const useAutoInputwithSearch = () => {
  const [searchVal, setSearch] = useState<string>('');
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [match, setMatch] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const acraUrl =
    import.meta.env.VITE_ENVIRONMENT === 'production'
      ? `${SERVICE_URLS.MARKET_PLACE}/acra-entities?filter[uen]=`
      : 'https://www.apimall-sandbox.acra.gov.sg/acra/entityQuery/entityBasicInformation?uen=';

  const [serverChecked, setServerCheck] = useState<string>('');

  const [{ uen, name, codeNumber, registerAddress, company }, setFilterData] = React.useState({
    uen: '',
    name: '',
    codeNumber: '',
    registerAddress: '',
    company: { primary: '', secondary: '' },
  });

  const onCapitalizeFire = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as typeof e.target & {
        value: string;
      };

      setSearch(target.value.toUpperCase());
    },
    [setSearch],
  );

  const onHandlerSearchUen = useCallback(async () => {
    const search = searchVal;

    const res = await httpClient('', acraUrl + search);

    const { status, statusText, data } = res.response;

    if (search === '') {
      setServerCheck('This field is not empty.');
      setMatch(false);
      setSubmit(false);
    } else {
      if (status === 200 && statusText === 'OK') {
        if (data.entities.length === 0) {
          setServerCheck("Can't find a company with that UEN Number.");
          setMatch(false);
          setSubmit(false);
        } else {
          setSubmit(true);
          if (search.match(res.response.data.entities[0].uen)) {
            const { uen, name } = data.entities[0];
            const { registeredAddress } = data.entities[0].entityRegisteredAddressDetails;
            const { description, code } = data.entities[0].entitySsicDetails.primarySSIC;
            const { secondarySSIC } = data.entities[0].entitySsicDetails;

            setMatch(true);

            const { blkhseNo, buildingName, levelNo, postalCode, streetName, unitNo } = registeredAddress;

            const combinedAddress = blkhseNo
              .concat(' ' + buildingName)
              .concat(' ' + levelNo)
              .concat(' ' + postalCode)
              .concat(' ' + streetName)
              .concat(' ' + unitNo);

            setFilterData({
              uen: uen,
              name: name,
              codeNumber: code ? code : secondarySSIC?.code,
              registerAddress: combinedAddress,

              company: {
                primary: description,
                secondary: secondarySSIC?.description,
              },
            });
          }
        }
      } else {
        if (!isEmpty(search)) {
          setServerCheck('UEN number you entered is invalid.');
          setMatch(false);
        }
      }
    }
  }, [searchVal]);

  const onSubmitHandler: SubmitHandler<any> = useCallback(async (value: any) => {
    dispatch(userValidUpdated({ isValid: true }));

    const search = value.search.toUpperCase() as string;

    const res = await httpClient('', acraUrl + search);

    const { status, statusText, data } = res.response;

    dispatch(userValidUpdated({ isValid: true }));

    if (status === 200 && statusText === 'OK') {
      if (data.entities.length === 0) {
        dispatch(userValidUpdated({ isValid: false }));
        setServerCheck("Can't find a company with that UEN Number.");
        setMatch(false);
        setSubmit(false);
      } else {
        setSubmit(true);
        if (search.match(res.response.data.entities[0].uen)) {
          const { uen, name } = data.entities[0];
          const { registeredAddress } = data.entities[0].entityRegisteredAddressDetails;
          const { description, code } = data.entities[0].entitySsicDetails.primarySSIC;
          const { secondarySSIC } = data.entities[0].entitySsicDetails;

          setMatch(true);

          const registeredAddressValue = [];

          for (const [, value] of Object.entries(registeredAddress)) {
            const registerAdd = value as string;

            const addressArr = registerAdd.split(' ');

            registeredAddressValue.push(addressArr);
          }

          const registeredAddressGetValue = registeredAddressValue.join(' ').replace(',', ' ');

          setFilterData({
            uen: uen,
            name: name,
            codeNumber: code ? code : secondarySSIC?.code,
            registerAddress: registeredAddressGetValue,

            company: {
              primary: description,
              secondary: secondarySSIC?.description,
            },
          });
        }
      }
    } else {
      if (!isEmpty(search)) {
        dispatch(userValidUpdated({ isValid: false }));
        setServerCheck('UEN number you entered is invalid.');
        setMatch(false);
        setSubmit(false);
      } else {
        setServerCheck('');
      }
    }
  }, []);

  return {
    searchVal,
    isSubmit,
    serverChecked,
    match,
    uen,
    name,
    codeNumber,
    registerAddress,
    company,
    onCapitalizeFire,
    onHandlerSearchUen,
    onSubmitHandler,
    setServerCheck,
    setMatch,
  };
};

export default useAutoInputwithSearch;
