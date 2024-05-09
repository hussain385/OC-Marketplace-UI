import { Box, Typography } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';

type StyledProps = {
  customStyle?: any;
};

const UserFooter = ({ customStyle }: StyledProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={() => ({
          width: '100%',
          maxWidth: '100%',
          margin: ' 0 auto',
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: '5px', md: '18px' },
          justifyContent: 'center',
          alignItems: 'center',
          // height: '100%',
          // background: '#ffffff',
          ...customStyle,
        })}
      >
        <Typography
          sx={{
            fontSize: '12px',
            color: Color.bgGreyDark,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          © OPNCORP
        </Typography>
        <span style={{ fontSize: '12px' }}>|</span>
        <Typography
          sx={{
            fontSize: '12px',
            color: Color.bgGreyDark,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          Contact
        </Typography>
        <span style={{ fontSize: '12px' }}>|</span>
        <Typography
          component='a'
          href='/privacy-policy'
          target='_blank'
          sx={{
            fontSize: '12px',
            color: Color.bgGreyDark,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
            '&:hover': {
              color: Color.priBlue,
              cursor: 'pointer',
            },
          }}
        >
          Privacy policy
        </Typography>
        <span style={{ fontSize: '12px' }}>|</span>
        <Typography
          component='a'
          href='/terms-conditions'
          target='_blank'
          sx={{
            fontSize: '12px',
            color: Color.bgGreyDark,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
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

export default UserFooter;
