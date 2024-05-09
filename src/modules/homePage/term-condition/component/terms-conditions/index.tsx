import React from 'react';
import TermofCondition from '../..';
import TermsConditionsContent from './terms-conditions.content';
import { Box } from '@mui/material';

const TermofService = () => {
  return (
    <TermofCondition heading='Terms and conditions' subheading='Last Update: March 2023'>
      <Box sx={{ border: { xs: 'transparent', sm: '1px solid #eaeaea' } }}>
        <TermsConditionsContent />
      </Box>
    </TermofCondition>
  );
};
export default TermofService;
