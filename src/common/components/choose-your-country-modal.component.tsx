import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import countryData from '@/mock/country-info.json';
import { RxCross1 } from 'react-icons/rx';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import Modal from '@/common/components/modal.component';

type ModalProps = {
  onCloseHandle: () => void;
  modalOpen: boolean;
  handleCountrySelect: (countryInfo: ICountrySelectInfo) => void;
};

const countryButtonStyle = {
  gap: '10px',
  height: '4em',
  width: '33.33%',
  justifyContent: 'flex-start',
  textAlign: 'start',
  '&:hover': {
    background: '#eee',
  },
};

const countRegionHeading = {
  fontSize: '16px',
  fontWeight: '600',
  marginTop: '2em',
  marginBottom: '1em',
  fontFamily: 'Manrope',
};
const countryNameStyle = { color: 'black', fontWeight: '400', fontSize: '14px', textTransform: 'capitalize' };

const ChooseYourCountryModalComponent = ({ onCloseHandle, modalOpen, handleCountrySelect }: ModalProps) => {
  return (
    <Modal
      noBtnDisplay
      isOpen={modalOpen}
      content={
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>Choose your country</Typography>
            <Button onClick={onCloseHandle} sx={{ color: 'black', fontSize: '16px', '&:hover': { background: '#eee' } }}>
              <RxCross1 />
            </Button>
          </Box>
          <Typography sx={countRegionHeading}>Asia Pacific</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {countryData
              .filter((value: ICountrySelectInfo) => value.region === 'Asia Pacific')
              .map((country: ICountrySelectInfo, key) => (
                <Button onClick={() => handleCountrySelect(country)} key={key} sx={countryButtonStyle}>
                  <img alt={country.name} src={`https://flagsapi.com/${country.code}/flat/32.png`} />
                  <Typography sx={countryNameStyle}>{country.name}</Typography>
                </Button>
              ))}
          </Box>
          <Typography sx={countRegionHeading}>Europe, the Middle East and Africa</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {countryData
              .filter((value: ICountrySelectInfo) => value.region === 'Europe, the Middle East and Africa')
              .map((country: ICountrySelectInfo, key) => (
                <Button onClick={() => handleCountrySelect(country)} key={key} sx={countryButtonStyle}>
                  <Typography sx={{ fontSize: '36px' }}>{country.flag}</Typography>
                  <Typography sx={countryNameStyle}>{country.name}</Typography>
                </Button>
              ))}
          </Box>
          <Typography sx={countRegionHeading}>North & South America</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {countryData
              .filter((value: ICountrySelectInfo) => value.region === 'North & South America')
              .map((country: ICountrySelectInfo, key) => (
                <Button onClick={() => handleCountrySelect(country)} key={key} sx={countryButtonStyle}>
                  <Typography sx={{ fontSize: '36px' }}>{country.flag}</Typography>
                  <Typography sx={countryNameStyle}>{country.name}</Typography>
                </Button>
              ))}
          </Box>
        </>
      }
      maxWidth={'md'}
      onCancel={onCloseHandle}
    />
  );
};

export default ChooseYourCountryModalComponent;
