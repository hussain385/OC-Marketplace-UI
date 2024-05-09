import React, { useCallback } from 'react';
import { Divison, InputList, InputUl, PhoneInputDivision } from '../../styles';

import { Color } from '../../../theme';

import { ILoginDropdown } from '../../interface/login-interface';

import jsonCountry from '../../mock-data/api/country.json';

import useSearchManagerforCountry from '../../utils/hooks/useSearch';

const PhoneAutoComplete = ({ open, countryName, setOpen, country, setCountry, setCountryName }: ILoginDropdown) => {
  const { valInputSearch, search, searchHandler, setSearchValInput, setSearch } = useSearchManagerforCountry();

  const onLeaveHandler = useCallback(() => {
    setOpen(false);
    setSearchValInput('');
    setSearch([]);
  }, [setOpen, setSearch, setSearchValInput]);

  return (
    <div style={{ position: 'relative' }} onMouseLeave={onLeaveHandler}>
      <Divison style={{ display: open ? 'block' : 'none' }} height={valInputSearch.length > 0 ? 'auto' : '212px'}>
        <input
          type='search'
          placeholder='Search'
          style={{
            padding: '0.5rem 1rem',
            width: '100%',
            display: 'flex',
            border: `1px solid ${Color.line}`,
            borderRadius: '2px',
            outline: 'none',
            marginBottom: '16px',
          }}
          onKeyUp={searchHandler}
        />
        <PhoneInputDivision>
          {search.length === 0 && valInputSearch.length === 0 && (
            <InputList
              className='selected'
              onClick={() => {
                setCountry(country);
                setCountryName(countryName);
                setOpen(false);
              }}
            >
              <span
                style={{
                  width: '30%',
                  textAlign: 'center',
                }}
              >
                {country}
              </span>
              <span style={{ width: '70%' }}>{countryName}</span>
            </InputList>
          )}
          <InputUl>
            <>
              {search.length === 0 &&
                valInputSearch.length === 0 &&
                jsonCountry
                  .filter((a) => a.countryNumber !== '' && a.countryNumber !== country.slice(1))
                  .map((value) => (
                    <InputList
                      style={{ width: '100%' }}
                      key={value.countryName}
                      onClick={() => {
                        setCountry('+' + value.countryNumber);
                        setCountryName(value.countryName);
                        setOpen(false);
                      }}
                    >
                      <span
                        style={{
                          width: '30%',

                          textAlign: 'center',
                        }}
                      >
                        {' '}
                        +{value.countryNumber}{' '}
                      </span>
                      <span style={{ width: '70%' }}>{value.countryName.slice(0, 15)}</span>
                    </InputList>
                  ))}

              {search.length > 0 &&
                valInputSearch.length > 0 &&
                search.map((value: any) => (
                  <InputList
                    style={{ width: '100%' }}
                    key={value.countryName}
                    onClick={() => {
                      setCountry('+' + value.countryNumber);
                      setCountryName(value.countryName);
                      setOpen(false);
                    }}
                  >
                    <span
                      style={{
                        width: '30%',

                        textAlign: 'center',
                      }}
                    >
                      {' '}
                      +{value.countryNumber}{' '}
                    </span>
                    <span style={{ width: '70%' }}>{value.countryName.slice(0, 15)}</span>
                  </InputList>
                ))}
            </>
          </InputUl>
        </PhoneInputDivision>
      </Divison>
    </div>
  );
};

export default PhoneAutoComplete;
