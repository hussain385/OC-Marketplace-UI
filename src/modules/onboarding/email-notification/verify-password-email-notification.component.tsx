import React, { useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { isUndefined } from 'lodash';

import { Typography } from '@mui/material';

import { Color } from '../../../theme';

import { useAppSelector } from '../../../redux/hooks';

import { useValidated } from '../../../common/utils/global_state.util';

import CheckInboxEmailNotification from '../../../common/components/check-inbox-email';

function EmailNotification() {
  const navigate = useNavigate();

  const { useInfo } = useAppSelector((state) => state.mainState);

  const location = useLocation();

  const { email, active } = !isUndefined(useInfo.payload) ? useInfo.payload : '';

  const [, setValidated] = useValidated();

  const handlerRoute = useCallback(() => {
    setValidated(false);
    navigate('/login');
  }, []);

  const route = location.search as string;

  const isRouteFind = route.indexOf('reset=true') >= 0;

  const getSeller = !isUndefined(active) && active === 'seller' ? true : false;

  return (
    <CheckInboxEmailNotification active={getSeller} navigateRoute={handlerRoute}>
      {isRouteFind === true ? (
        <Typography
          sx={{
            fontSize: '14px',
            color: Color.textBlack,
            lineHeight: 1.57,
            letterSpacing: '-0.5px',
          }}
        >
          We have sent an email with password reset instructions to &nbsp;
          <Typography sx={{ color: '#2752e7', fontWeight: 600 }} component='span'>
            {email}
          </Typography>
        </Typography>
      ) : (
        <Typography
          sx={{
            fontSize: '14px',
            color: Color.textBlack,
            lineHeight: 1.57,
            letterSpacing: '-0.5px',
          }}
        >
          We have sent an email &nbsp;
          <Typography sx={{ color: '#2752e7', fontWeight: 600 }} component='span'>
            {email}
          </Typography>
          &nbsp; with the instructions on how to proceed.
        </Typography>
      )}
    </CheckInboxEmailNotification>
  );
}

export default EmailNotification;
