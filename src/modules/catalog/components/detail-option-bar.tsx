// @flow
import { Box, Stack } from '@mui/material';

import React, { useState } from 'react';

import { BoxText, ContainerNav } from '../../../common/styles/common.styles';

import { Color } from '../../../theme';

export const DetailOptionBar = () => {
  const [options, setOptions] = useState<string>('overview');

  const changeHandler = (option: string) => {
    setOptions(option);
    const win: Window = window;
    if (option === 'overview') {
      win.scrollTo(0, 0);
      win.location.hash = '';
    } else {
      win.scrollTo(0, (document.getElementById(option) as HTMLElement).offsetTop - 235);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
        position: 'sticky',
        top: { xs: '5.3em', md: '8em' },
        background: 'rgba(255, 255, 255)',
        zIndex: 10,
      }}
    >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
        sx={{
          width: '100%',
          margin: { xs: undefined, md: '0 auto' },
          maxWidth: '1280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: { md: '2.5%', lg: '3%' },
        }}
      >
        <ContainerNav
          onClick={() => changeHandler('overview')}
          sx={{ borderBottom: options === 'overview' ? `2px solid ${Color.priBlue}` : 'none' }}
        >
          <BoxText sx={{ color: options === 'overview' ? Color.priBlue : Color.bgGreyDark }}>Overview</BoxText>
        </ContainerNav>
        <ContainerNav
          onClick={() => changeHandler('about-company')}
          sx={{ borderBottom: options === 'about-company' ? `2px solid ${Color.priBlue}` : 'none' }}
        >
          <BoxText sx={{ color: options === 'about-company' ? Color.priBlue : Color.bgGreyDark }}>About the seller</BoxText>
        </ContainerNav>
        <ContainerNav
          onClick={() => changeHandler('compare-packages')}
          sx={{ borderBottom: options === 'compare-packages' ? `2px solid ${Color.priBlue}` : 'none' }}
        >
          <BoxText sx={{ color: options === 'compare-packages' ? Color.priBlue : Color.bgGreyDark }}>Compare packages</BoxText>
        </ContainerNav>
      </Stack>
    </Box>
  );
};
