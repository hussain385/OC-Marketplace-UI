import { Box, Typography } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';
import SearchInputFieldComponent from './search-input-field.component';
import { HeadingText } from '../../common/styles/homepage.styles';

const TopContainerComponent = () => {
  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'grid', sm: 'grid', md: 'grid' },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr' },
            gap: '24px',
          }}
        >
          <Box sx={{ paddingTop: { md: '0', lg: '20%' } }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '68%',
                marginBottom: { xs: '16px', sm: '32px' },
              }}
            >
              <HeadingText>
                Starting and managing a business <span style={{ color: Color.textBlack }}>has never been easier</span>
              </HeadingText>
            </Box>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '16px', sm: '18px', md: '18px' },
                lineHeight: 1.65,
                mb: 2,
              }}
            >
              Search for corporate services to help you start, manage and run your businesses.
            </Typography>
            <SearchInputFieldComponent />
          </Box>
          <>
            <Box>
              <img
                style={{ maxWidth: '100%', width: '100%' }}
                src={require('../../assets/home-page/hero.svg').default}
                alt='Vector'
              />
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default TopContainerComponent;
