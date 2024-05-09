// @flow
import { Box } from '@mui/material';

import React, { useState } from 'react';

import { Color } from '../../../theme';

import { useLocation } from 'react-router-dom';

import { FooterComp } from '../../seller/common/footer-comp';

import CheckoutSteps from '../components/checkout-steps';

import CheckoutMessageBox from '../components/checkout-message-box';

import RequirementForm from '../components/requirement-form';

import LandingFooter from '../../homePage/buyer/components/footer.component';
import NavBar from '@/common/components/navbar';
import useScroll from '@/common/utils/hooks/useScroll';

export const MessageSuccessBox = () => {
  const [step, setStep] = useState<number>(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  useScroll({ useEffectDep: [] });

  if (queryParams.get('requirements') && queryParams.get('requirements') === 'true') {
    return (
      <Box sx={{ position: 'relative' }}>
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            borderBottom: `1px solid ${Color.line}`,
            height: '5em',
            alignItems: 'center',
            marginInline: '5%',
            width: '90%',
            justifyContent: { xs: 'center', sm: 'space-between' },
            flexDirection: 'row',
          }}
        >
          <CheckoutSteps steps={step} showLabel />
        </Box>
        {step === 0 ? (
          <></>
        ) : step === 1 ? (
          <RequirementForm setStep={setStep} />
        ) : (
          <Box
            style={{
              backgroundColor: '#ffffff',
              height: '80vh',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <CheckoutMessageBox setStep={setStep} />
          </Box>
        )}
        <LandingFooter />
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      <Box
        style={{
          backgroundColor: '#ffffff',
          height: '90vh',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <CheckoutMessageBox />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <FooterComp />
      </Box>
    </>
  );
};
