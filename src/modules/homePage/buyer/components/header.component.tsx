import { Box, Typography } from '@mui/material';
import React from 'react';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';
import BuyerHeaderStyles, { BoxContainer } from '../../styles/buyer-header.styles';
import CatalogSearchNavigation from '@/modules/catalog/search/component/catalog-search-navigation';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { Color } from '@/theme';

const HeaderComponent = () => {
  const { xs, sm } = useMediaBreakpoint();

  return (
    <BoxContainer sx={{ minHeight: { xs: '65vh', md: 'min(80vh, 697px)' }, placeItems: 'stretch', padding: '5vw' }}>
      <Box sx={BuyerHeaderStyles.gridItem}>
        <Typography sx={BuyerHeaderStyles.headingText}>
          We’d love to help your business go from <span style={{ color: '#00ACEC' }}>zero</span> to{' '}
          <span style={{ color: '#00ACEC' }}>hero</span>
        </Typography>
        <Typography sx={BuyerHeaderStyles.subheadingText}>
          Let&apos;s get you the corporate support you need through our reliable providers
        </Typography>
        <RenderIf value={xs || sm}>
          <AppThemeBtnComponent
            text={'Explore services'}
            backgroundColor={Color.priBlue}
            customButtonStyle={{ border: 'none', borderRadius: '10em' }}
          />
        </RenderIf>
        <CatalogSearchNavigation scrollDirection={485} catalogSearchPage />
      </Box>
    </BoxContainer>
  );
};

export default HeaderComponent;
