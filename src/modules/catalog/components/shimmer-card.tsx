// @flow
import React from 'react';

import { Shimmer } from 'react-shimmer';

import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';

import '../style.css';

import { styled } from '@mui/system';

const AvatarBox = styled(Box)(() => ({
  width: 32,
  height: 32,
  position: 'relative',
  borderRadius: '100%',
}));

export const ShimmerCard = () => {
  return (
    <Card sx={{ width: '21em', height: '25.5em', marginBlock: '1em', cursor: 'pointer' }}>
      <CardMedia>
        <Shimmer width={350} height={190} />
      </CardMedia>
      <CardContent sx={{ paddingTop: '10px' }}>
        <Stack
          direction='row'
          spacing={1}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '14px' }}
        >
          <AvatarBox>
            <Shimmer width={32} height={32} className='shimmerClass' />
          </AvatarBox>
          <Shimmer width={100} height={16} />
        </Stack>
        <Shimmer width={265} height={16} />
        <Shimmer width={100} height={16} className='ShimmerSecondTextClass' />
      </CardContent>
      <Divider color='#EFEEEE' />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack
            direction='row'
            spacing={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: '10px',
              borderRight: '1px solid #EAEAEA',
              paddingRight: '15px',
            }}
          >
            <Shimmer width={130} height={16} />
          </Stack>
          <Typography sx={{ color: '#1D2130', fontSize: '10px', display: 'flex', marginTop: '4px' }}>
            From <Shimmer width={70} height={16} className='ShimmerPriceTextClass' />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
