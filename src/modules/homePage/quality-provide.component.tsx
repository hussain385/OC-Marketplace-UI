import React from 'react';
import { Box } from '@mui/material';
import { HeadingText } from '../../common/styles/homepage.styles';
import { Color } from '../../theme';
import useMediaBreakpoint from '../../common/components/breakpoint';
import RenderIf from '../../common/components/render-if.component';

const QualityPoints = ({ text1, text2 }: { text1: string; text2: string }) => (
  <>
    <Box display={'flex'} flexDirection={'row'}>
      <i>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='12' cy='12' r='9' fill='#2752E7' />
          <path d='M9 12L11.1 14.25L15 9.75' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </i>
      <Box style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <HeadingText
          sx={{
            fontWeight: '700 !important',
            fontSize: { xs: '14px !important', sm: '16px !important', md: '18px !important' },
            letterSpacing: '0.02em !important',
            color: `${Color.textBlack} !important`,
            pl: 1,
            maxWidth: '100% !important',
          }}
        >
          {text1}
        </HeadingText>
        <HeadingText
          sx={{
            fontWeight: '400 !important',
            fontSize: { xs: '14px !important', sm: '16px !important', md: '18px !important' },
            letterSpacing: '0.02em !important',
            color: '#3C3C3C !important',
            pl: 1,
            maxWidth: '100% !important',
          }}
        >
          {text2}
        </HeadingText>
      </Box>
    </Box>
  </>
);

function QualityProvideComponent() {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          flexDirection: { sm: 'none', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: { sm: 'block', md: 'flex' },
            flexDirection: { sm: 'none', md: 'column' },
            width: { xs: '100%', sm: '100%', md: '50%' },
          }}
        >
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
          <HeadingText style={{ marginBottom: '24px' }}>Quality service providers</HeadingText>
          <QualityPoints text1={'Verified vendors'} text2={'Only ACRA registered entities can sell their services'} />
          <br />
          <QualityPoints text1={'Vendor Mangement'} text2={'Overview of all your past and existing contracts in one place'} />
        </Box>
        <RenderIf value={xs}>
          <img
            src={require('../../assets/home-page/provider.png').default}
            alt='transaction'
            style={{ maxWidth: '100%', width: 'auto' }}
          />
        </RenderIf>

        <RenderIf value={mdLg}>
          <img
            src={require('../../assets/home-page/provider.png').default}
            alt='transaction'
            style={{ maxWidth: '625px', width: '100%' }}
          />
        </RenderIf>

        <RenderIf value={sm}>
          <img
            src={require('../../assets/home-page/provider.png').default}
            alt='transaction'
            style={{ maxWidth: '565px', width: '100%', margin: '0 auto' }}
          />
        </RenderIf>
      </Box>
    </Box>
  );
}

export default QualityProvideComponent;
