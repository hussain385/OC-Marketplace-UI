// @flow
import React, { useState } from 'react';

import { Box, Button, Divider, Tab, Tabs, Typography } from '@mui/material';

import { Color } from '../../../theme';

import MuiAppThemeBtnComponent from '../../../common/components/mui-app-theme-btn.component';

import { ReactComponent as CheckIcon } from '../../../assets/icons/ic-check.svg';

import { ReactComponent as DeliverTimerIcon } from '../../../assets/icons/Timer.svg';

import { ReactComponent as BulletIcon } from '../../../assets/icons/BulletDot.svg';

import { Shimmer } from 'react-shimmer';

export const PackagesOverviewLoading = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className='Package'>
      <Box sx={{ borderBottom: '1px solid #EAEAEA', width: '23.5em' }}>
        <Tabs
          TabIndicatorProps={{ style: { background: '#c4c4c4', color: '#c4c4c4' } }}
          variant='fullWidth'
          textColor='secondary'
          indicatorColor='secondary'
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: `${Color.priBlue} !important`,
            },
            '& .Mui-selected': {
              color: Color.priBlue,
            },
          }}
        >
          <Tab value={0} label={'loading'} />
          <Tab value={1} label={'loading'} />
          <Tab value={2} label={'loading'} />
        </Tabs>
      </Box>
      <Box sx={{ lineHeight: '32px' }} className='packageBox'>
        <Typography sx={{ mb: 1 }} className='subHeading'>
          What You&#39;ll Get
        </Typography>

        {[...Array(3).keys()].map((value: any, key) => (
          <Box sx={{ color: '#c4c4c4', display: 'flex', flex: 1, gap: '10px' }} key={key}>
            <Typography component='span'>
              <CheckIcon />
            </Typography>
            <Shimmer width={150} height={16} />
          </Box>
        ))}
      </Box>
      <Box className='packageBox'>
        <Typography className='subHeading'>Delivery Time</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
          <DeliverTimerIcon color={Color.positive} />
          <Shimmer width={150} height={16} />
        </Box>
      </Box>
      <Box className='packageBox'>
        <Typography sx={{ mb: 1 }} className='subHeading'>
          Exclusions / Requirements
        </Typography>

        {[...Array(4).keys()].map((value) => (
          <Box sx={{ color: '#c4c4c4', display: 'flex', flex: 1, gap: '10px' }} key={value}>
            <Typography component='span'>
              <BulletIcon />
            </Typography>
            <Shimmer width={150} height={16} />
          </Box>
        ))}
      </Box>
      <Box className='packageBox'>
        <Typography className='subHeading'>Payment schedule</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          <Shimmer width={150} height={16} />
        </Box>
      </Box>
      <MuiAppThemeBtnComponent
        type='button'
        widthSize='100%'
        heightSize='44px'
        style={{
          background: Color.priWhite,
          borderRadius: '2px',
          border: 'none',
          color: Color.priBlue,
          lineHeight: 1.71,
          letterSpacing: '-0.5px',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBlock: '0.3em',
        }}
        value={'Compare packages'}
      />
      <Divider style={{ marginBlock: '1em' }} color='eaeaea' />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 700, color: Color.pureBlack, fontSize: '14px' }} className='subHeading'>
          Estimated
        </Typography>
        <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>$0.00</Typography>
      </Box>
      <Box
        sx={{
          marginTop: '1em',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          width: '100%',
        }}
      >
        <MuiAppThemeBtnComponent
          type='button'
          widthSize='100%'
          heightSize='44px'
          style={{
            background: Color.priBlue,
            borderRadius: '2px',
            color: Color.priWhite,
            lineHeight: 1.71,
            letterSpacing: '-0.5px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          value={'Choose'}
        />
        <Button
          sx={{
            background: Color.priWhite,
            borderRadius: '2px',
            width: '100%',
            height: '44px',
            border: `1px solid ${Color.positive}`,
            color: Color.positive,
            textTransform: 'capitalize',
            lineHeight: 1.71,
            letterSpacing: '-0.5px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Contact Provider
        </Button>
      </Box>
    </Box>
  );
};
