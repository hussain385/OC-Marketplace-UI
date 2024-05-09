// @flow
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Shimmer } from 'react-shimmer';
import { ShimmerCard } from './shimmer-card';
import { BsShieldCheck } from 'react-icons/bs';
import { Color } from '../../../theme';
import { bottomBtnStyle } from '../../../common/styles/common.styles';

export const SellerProfileLoadingPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '40%' }}>
        <Box className={'SellerInfoBox'}>
          <Box className={'center'}>
            <Shimmer height={140} width={140} className={'avatar-shimmer'} />
            <Shimmer height={18} width={108} className={'mt-005'} />
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', marginBlock: '0.5em' }}>
              <BsShieldCheck size='13' color={Color.positive} />
              <Typography className='subHeading' style={{ color: Color.positive }}>
                Identity verified
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <Typography className='simpleText'>Since:</Typography>
              <Shimmer height={16} width={38} className={'mt-005'} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <Typography className='simpleText'>Company staff:</Typography>
              <Shimmer height={16} width={38} className={'mt-005'} />
            </Box>
            <Button
              sx={{
                ...bottomBtnStyle,
                display: 'undefined',
                marginTop: '1em',
                border: '1px solid #66D19E',
                color: '#66D19E',
              }}
            >
              Contact provider
            </Button>
            <Shimmer height={18} width={320} className={'mt-01'} />
            <Shimmer height={18} width={320} className={'mt-005'} />
            <Shimmer height={18} width={320} className={'mt-005'} />
            <Shimmer height={18} width={138} className={'mt-005'} />
          </Box>
        </Box>
        <Box className={'SellerInfoBox mt-01'}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Awards/Achievements</Typography>
          </Box>
        </Box>
        <Box className={'SellerInfoBox mt-01'}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Staffs</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginLeft: '1.5em', width: '100%' }}>
        <Shimmer width={520} height={30} className={'mt-01'} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {[...Array(3).keys()].map((values) => (
            <ShimmerCard key={values} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
