// @flow
import React from 'react';

import { Typography, Box } from '@mui/material';

// import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { Shimmer } from 'react-shimmer';

import { AboutCompanyLoading } from './about-company-loading';

import { PackagesOverviewLoading } from './packages-overview-loading';

export const DetailOverviewLoadingPage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingInline: '10px' }}>
      <Box className='width-38'>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {/* <Shimmer width={190} height={16} />
          <MdOutlineArrowForwardIos style={{ marginInline: '10px', fontSize: '14px' }} />
          <Shimmer width={100} height={16} /> */}
        </Typography>
        <Shimmer width={420} height={30} className={'mt-01'} />
        <Box sx={{ display: 'flex', marginBlock: '1.5em' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '1em' }}>
            {[...Array(4).keys()].map((value) => (
              <Shimmer key={value} width={138} height={92} />
            ))}
          </Box>
          <Shimmer width={138 * 4} height={415} />
        </Box>
        <Box>
          <Shimmer width={520} height={24} />
          <Shimmer height={18} width={138 * 5} className={'mt-01'} />
          <Shimmer height={18} width={138 * 5} className={'mt-005'} />
          <Shimmer height={18} width={138 * 5} className={'mt-005'} />
          <Shimmer height={18} width={138 * 3} className={'mt-005'} />
        </Box>
        <AboutCompanyLoading />
      </Box>
      <Box style={{ width: '35%' }}>
        <PackagesOverviewLoading />
      </Box>
    </Box>
  );
};
