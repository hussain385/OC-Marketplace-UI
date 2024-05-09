// @flow
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormLabel } from '../../../common/styles';
import BusinessProfileFormField from '../../../common/components/business.profile.component';

export const NonAuthPersonFormComponent = () => {
  return (
    <Box style={{ marginTop: '0.7em' }}>
      <FormLabel sx={{ marginBottom: '0.7em', fontSize: '14px !important' }}>
        2. Invite your authorised officer to set up your organisation
      </FormLabel>
      <Typography
        sx={{ fontSize: '14px !important', marginBottom: '5px', fontWeight: '400', maxWidth: { xs: '100%', md: '645px' } }}
      >
        We&apos;ll email an invite to your duly authorised officer along with instructions on how to finish setting up your
        organisation.
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '16px',
          mt: { xs: '20px', sm: '0' },
        }}
      >
        <BusinessProfileFormField type='text' name='identificationName' label={'Authorised officer’s name'} />
        <BusinessProfileFormField type='text' name='email' label={'Authorised officer’s email address'} />
      </Box>
    </Box>
  );
};
