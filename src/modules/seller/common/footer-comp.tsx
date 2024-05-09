// @flow
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '../../../theme';

export const FooterComp = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <Box
        sx={() => ({
          width: { xs: '85%', md: '544px' },
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: '10px', md: '18px' },
          justifyContent: { xs: 'space-between', md: 'center' },
          alignItems: 'center',
          paddingBottom: '17px',
          textAlign: 'center',
        })}
      >
        <Typography
          sx={{
            fontSize: { xs: '11px', md: '12px' },
            color: Color.textHint,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          © OPNCORP
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '11px', md: '12px' },
            color: Color.textHint,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          ·
        </Typography>
        <Typography
          component='a'
          href='mailto:help@opncorp.com?subject=Enquiry'
          target='_blank'
          sx={{
            fontSize: { xs: '11px', md: '12px' },
            color: Color.textHint,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          Contact
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '11px', md: '12px' },
            color: Color.textHint,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          ·
        </Typography>
        <Typography
          component='a'
          href='/privacy-policy'
          target='_blank'
          sx={{
            fontSize: { xs: '11px', md: '12px' },
            color: Color.bgGreyDark,
            fontWeight: 600,
            '&:hover': {
              color: Color.priBlue,
              cursor: 'pointer',
            },
          }}
        >
          Privacy policy
        </Typography>
        ·
        <Typography
          component='a'
          href='/terms-conditions'
          target='_blank'
          sx={{
            fontSize: { xs: '11px', md: '12px' },
            color: Color.bgGreyDark,
            fontWeight: 600,
            '&:hover': {
              color: Color.priBlue,
              cursor: 'pointer',
            },
          }}
        >
          Terms and conditions
        </Typography>
      </Box>
    </Box>
  );
};
