/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';

import { useValidated } from '../utils/global_state.util';

import { Color } from '../../theme';

import { ReactComponent as IconLogo } from './../../assets/logos/opn_mobile.svg';

import { ReactComponent as ArrowIcon } from './../../assets/icons/ic-arrow-left.svg';
import useHistoryBack from '../utils/hooks/useHistoryBack';

type TypeMobileNavigation = {
  icon: boolean;
  label?: string;
  validated?: boolean;
  hideLabel?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overideStyle?: Record<string, any>;
};

export default function MobileNavbarLayout({ icon, label, validated, overideStyle, hideLabel }: TypeMobileNavigation) {
  const [, setValidated] = useValidated();
  const { backRoute } = useHistoryBack();

  const navigateRoute = () => {
    setValidated(false);
    backRoute();
  };

  return (
    <AppBar
      position='sticky'
      color={'primary'}
      sx={{
        width: '100%',
        margin: '0 auto',
        background: Color.priWhite,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        ...overideStyle,
        color: Color.textBlack,
        padding: '10px 15px',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer' }}>
        <Box sx={{ width: '13%' }}>
          <Typography component={'span'} className='arrow'>
            {icon === true ? <IconLogo /> : <ArrowIcon onClick={navigateRoute} />}
          </Typography>
        </Box>
        <Box sx={{ width: '87%', textAlign: 'center', marginLeft: '-20px' }}>
          <Typography component={'span'} sx={{ fontWeight: 700, lineHeight: '24px', fontSize: '16px' }}>
            {label ? label : validated === true ? ' Sign in to your account' : hideLabel === true ? '' : 'Login/Signup'}
          </Typography>
        </Box>
      </Box>
    </AppBar>
  );
}
