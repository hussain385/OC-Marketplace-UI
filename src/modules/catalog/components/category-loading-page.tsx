// @flow
import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { Shimmer } from 'react-shimmer';

import { ShimmerCard } from './shimmer-card';

export const CategoryLoadingPage = () => {
  return (
    <>
      <Box sx={{ marginBlock: '15px', flexWrap: 'wrap', display: { xs: 'none', md: 'flex' } }}>
        {[...Array(4).keys()].map((value) => (
          <Button
            key={value}
            sx={{
              minWidth: '21.5em',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '3.5em',
              boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
              marginRight: '1em',
              marginTop: '1em',
            }}
          >
            <Shimmer width={22} height={22} className={'mr-10'} />
            <Shimmer width={170} height={22} />
          </Button>
        ))}
      </Box>
      {[...Array(2).keys()].map((value) => (
        <div key={value}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3em' }}>
            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
              <Shimmer width={180} height={22} />
              <Box
                sx={{
                  padding: '0px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  height: '2em',
                  fontWeight: '700',
                  color: '#7E7E7E',
                  borderRadius: '50em',
                  border: '1px solid #EAEAEA',
                }}
              >
                0 services available
              </Box>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[...Array(4).keys()].map((value) => (
              <ShimmerCard key={value} />
            ))}
          </Box>
        </div>
      ))}
    </>
  );
};
