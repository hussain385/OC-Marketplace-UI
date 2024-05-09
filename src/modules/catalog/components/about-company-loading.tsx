// @flow
import React from 'react';

import { Box, Divider, Typography } from '@mui/material';

import { AiOutlineStar } from 'react-icons/ai';

import { BsLock, BsShieldCheck } from 'react-icons/bs';

import { Shimmer } from 'react-shimmer';

import { Color } from '../../../theme';

export const AboutCompanyLoading = () => {
  return (
    <Box sx={{ marginBlock: '2em', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Shimmer height={60} width={60} className={'avatar-shimmer'} />
        <Box>
          <Shimmer width={320} height={30} className={'mt-01'} />
          <Shimmer width={120} height={18} className={'mt-01'} />
        </Box>
      </Box>
      <Divider style={{ marginTop: '1.5em' }} />
      <Box sx={{ display: 'flex', gap: '1.5em', marginBlock: '1em' }}>
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <AiOutlineStar size='15' color={Color.positive} />
          <Typography className='subHeading'>0 Review</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <BsShieldCheck size='13' color={Color.positive} />
          <Typography className='subHeading'>Identity verified</Typography>
        </Box>
      </Box>
      <Shimmer height={18} width={138 * 5} className={'mt-01'} />
      <Shimmer height={18} width={138 * 5} className={'mt-005'} />
      <Shimmer height={18} width={138 * 5} className={'mt-005'} />
      <Shimmer height={18} width={138 * 3} className={'mt-005'} />
      <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', marginBlock: '1em' }}>
        <BsLock size='13' color='#FF6A68' />
        <Typography sx={{ color: '#7e7e7e', fontSize: '14px !important' }}>
          Your security is important to us. To protect your payment, transact only within the OPNCORP website
        </Typography>
      </Box>
    </Box>
  );
};
