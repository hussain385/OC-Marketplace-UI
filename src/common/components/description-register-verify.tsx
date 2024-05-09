import React from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '../../theme';

function Description() {
  return (
    <Box
      sx={() => ({
        width: { xs: '100%', sm: '40%' },
        display: { xs: 'none', sm: 'block' },
        background: Color.priBlue,
        color: Color.priWhite,
        paddingTop: '204px',
        paddingLeft: '56px',
        paddingRight: '56px',
        minHeight: '100vh',
        position: 'relative',
      })}
    >
      <Typography component='i'>
        <img src='../homepage/reg-logo/logo.png' style={{ maxWidth: ' 250.2px', width: '100%' }} />
      </Typography>
      <Typography
        sx={{
          maxWidth: '436px',
          minheight: '146px',
          marginTop: '16px',
          marginBottom: '24px',
          fontSize: '36px',
          fontWeight: 'bold',
          lineHeight: 1.28,
          letterSpacing: '-0.72px',
        }}
      >
        Starting and managing a business has never been easier
      </Typography>
      <Box
        sx={{
          maxWidth: '432px',
          minheight: '104px',
          lineHeight: 1.57,
          fontStretch: 'normal',
          fontStyle: 'normal',
          letterSpacing: '-0.28px',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        <Typography
          component='p'
          sx={{
            letterSpacing: '-0.36px',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: 'normal',
            marginBottom: '16px',
          }}
        >
          Support any business model
        </Typography>
        Incoporation &amp; Coporate Govermance, Finance, Human Resource (HR) &amp; Payroll, Research &amp; Data Analysis,
        Marketing &amp; Design - all within a unified platform.
      </Box>
      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <img src='../homepage/design@3x.webp' style={{ maxWidth: '100%', width: '100%' }} />
      </Box>
    </Box>
  );
}

export default Description;
