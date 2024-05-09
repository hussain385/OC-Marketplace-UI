import React from 'react';
import { Box, Typography } from '@mui/material';
import { HeadingText } from '../../common/styles/homepage.styles';
import { HomepageSubheadingsComponents } from '../../common/components/homepage-subheadings.components';
import useMediaBreakpoint from '../../common/components/breakpoint';
import RenderIf from '../../common/components/render-if.component';

type ImageProps = {
  children: React.ReactNode;
};

const PaymentImage = ({ children }: ImageProps) => {
  return (
    <Typography
      sx={(theme) => ({
        display: 'block',

        [theme.breakpoints.up('md')]: {
          display: 'flex',
          justifyContent: 'center',
        },

        [theme.breakpoints.up('sm')]: {
          display: 'flex',
          width: '100%',
          margin: '0 auto',
        },
      })}
      component={'i'}
    >
      {children}
    </Typography>
  );
};

function PaymentSecurityComponent() {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  return (
    <Box sx={{ marginTop: '120px' }}>
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          flexDirection: { sm: 'none', md: 'row-reverse' },
          alignItems: 'center',
        }}
      >
        <Box>
          <HeadingText
            style={{
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '16px',
              marginBottom: '5px',
            }}
          >
            WHY CHOOSE US
          </HeadingText>
          <HeadingText style={{ marginBottom: '24px' }}>Payment security</HeadingText>
          <HomepageSubheadingsComponents
            text={
              'We enable solution providers to establish a milestone payment system. This means that you as the customer always know what you are paying for and the money is only released to the solution provider when you approve the work.'
            }
          />
        </Box>
        <RenderIf value={xs}>
          <PaymentImage>
            <img
              style={{ maxWidth: '100%', width: '100%' }}
              src={require('../../assets/home-page/payment_security_xs.png').default}
              alt='Vector'
            />
          </PaymentImage>
        </RenderIf>
        <RenderIf value={mdLg}>
          <PaymentImage>
            <img
              style={{ maxWidth: '100%', width: '100%' }}
              src={require('../../assets/home-page/payment_security_md.png').default}
              alt='Vector'
            />
          </PaymentImage>
        </RenderIf>
        <RenderIf value={sm}>
          <PaymentImage>
            <img
              style={{ maxWidth: '100%', width: '100%' }}
              src={require('../../assets/home-page/payment_security_sm.png').default}
              alt='Vector'
            />
          </PaymentImage>
        </RenderIf>
      </Box>
    </Box>
  );
}

export default PaymentSecurityComponent;
