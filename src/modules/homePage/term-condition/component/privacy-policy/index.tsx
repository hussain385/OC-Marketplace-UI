import { Box } from '@mui/material';
import React from 'react';
import TermofCondition from '../..';
import PrivacyPolicyContent from './privacy-policy.content';

const PrivacyPolicy = () => {
  return (
    <TermofCondition heading='Privacy Policy' subheading='Last Update: March 2023'>
      <Box sx={{ border: { xs: 'transparent', sm: '1px solid #eaeaea' } }}>
        <PrivacyPolicyContent />
      </Box>
    </TermofCondition>
  );
};

export default PrivacyPolicy;
