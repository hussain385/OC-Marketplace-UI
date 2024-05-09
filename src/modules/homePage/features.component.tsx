// @flow
import React from 'react';
import { HeadingText } from '../../common/styles/homepage.styles';
import { HomepageSubheadingsComponents } from '../../common/components/homepage-subheadings.components';
import { Box, Typography } from '@mui/material';
import RenderIf from '../../common/components/render-if.component';
import useMediaBreakpoint from '../../common/components/breakpoint';

export const FeaturesComponent = () => {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  return (
    <Box
      sx={{
        display: { sm: 'block', md: 'flex' },
        flexDirection: { sm: 'none', md: 'row-reverse' },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '100%', md: '50%' } }}>
        <HeadingText
          style={{
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '16px',
            marginBottom: '5px',
          }}
        >
          OUR FEATURE
        </HeadingText>
        <HeadingText style={{ marginBottom: '24px' }}>
          {'Basic customer\nrelationship management and invoicing system'}
        </HeadingText>
        <HomepageSubheadingsComponents
          text={
            'For new entrepreneurs, we provide basic customer relationship management flow and invoicing assistance to kickstart your business'
          }
        />
      </Box>
      <RenderIf value={xs}>
        <Typography sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }} component={'i'}>
          <img
            src={require('../../assets/home-page/invoice_xs.png').default}
            alt='transaction'
            style={{ maxWidth: '100%', width: '100%' }}
          />
        </Typography>
      </RenderIf>
      <RenderIf value={mdLg}>
        <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }} component={'i'}>
          <img
            src={require('../../assets/home-page/invoice_md.png').default}
            alt='transaction'
            style={{ maxWidth: '625px', width: '100%' }}
          />
        </Typography>
      </RenderIf>
      <RenderIf value={sm}>
        <Typography sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }} component={'i'}>
          <img
            src={require('../../assets/home-page/invoice_md.png').default}
            alt='transaction'
            style={{ maxWidth: '565px', width: '100%' }}
          />
        </Typography>
      </RenderIf>
    </Box>
  );
};
