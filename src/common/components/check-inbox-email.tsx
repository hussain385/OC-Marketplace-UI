import { Box, Button, Typography } from '@mui/material';

import React from 'react';

import { Color } from '../../theme';

import BoxMessageDisplay from './box-message-display';

type Props = {
  active?: boolean;
  children?: React.ReactNode;
  navigateRoute?: () => void;
};

function CheckInboxEmailNotification({ active, navigateRoute, children }: Props) {
  return (
    <BoxMessageDisplay
      overideStyle={{
        background: active ? Color.priBlue : Color.bgGreyLight,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            background: Color.priWhite,
            width: '100%',
            maxWidth: '544px',
            height: { xs: '369px', sm: '408px', md: '408px' },
            borderRadius: '8px',
          }}
        >
          <i style={{ background: Color.priWhite }}>
            <img src='../verify/stock-email-send.svg' style={{ maxWidth: '100%', width: '100%' }} />
          </i>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              paddingBottom: '18px',
            }}
          >
            <Typography
              sx={{
                marginTop: '24px',
                fontSize: ' 24px',
                fontWeight: 'bold',
                letterSpacing: '-0.48px',
                color: Color.lightBlack,
              }}
            >
              Check inbox
            </Typography>

            <Box
              sx={{
                width: '100%',
                maxWidth: '432px',
                height: '70px',
                padding: '14px 0px 14px 16px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '24px',
              }}
            >
              <Box>{children}</Box>
            </Box>

            <Button
              type='submit'
              variant='contained'
              color='secondary'
              sx={{
                width: '96%',
                maxWidth: '432px',
                borderRadius: '2px',
                height: '44px',
                fontSize: '1.25rem',
                marginTop: '24px',
                marginBottom: '16px',
              }}
              onClick={navigateRoute}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 1.5,
                  letterSpacing: '-0.5px',
                  textTransform: 'initial',
                }}
              >
                Done
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </BoxMessageDisplay>
  );
}

export default CheckInboxEmailNotification;
