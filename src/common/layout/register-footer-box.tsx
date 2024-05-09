import { Box, Typography } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';

type FooterProps = {
  customStyle?: React.CSSProperties;
};

export const RegisterFooterBox = ({ customStyle }: FooterProps) => {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        marginTop: 'auto',
        paddingBottom: '17px',

        [theme.breakpoints.between(0, 481)]: {
          paddingLeft: '2%',
          paddingRight: '2%',
        },
        ...customStyle,
      })}
    >
      <Box
        sx={() => ({
          width: '100%',
          maxWidth: '379px',
          display: 'flex',
          flexDirection: 'row',
          gap: '18px',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        })}
      >
        <Typography
          sx={{
            fontSize: '12px',
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
            fontSize: '12px',
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
            fontSize: '12px',
            color: Color.textHint,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          Privacy policy
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: Color.textHint,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
          }}
        >
          Terms and conditions
        </Typography>
      </Box>
    </Box>
  );
};
