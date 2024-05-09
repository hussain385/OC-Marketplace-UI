import React from 'react';
import InputForm from '@/common/components/forms/input.form';
import { Box } from '@mui/material';

const CompanyFormComponent = ({ control, documentType }: { control: any; documentType: string }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <InputForm
        label={`Company Registration Name`}
        name={'companyName'}
        control={control}
        inputProps={{ placeholder: 'Company Name' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
      <InputForm
        label={`Company Registration ID`}
        name={'registrationId'}
        control={control}
        inputProps={{ placeholder: 'Company ID' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
      <InputForm
        label={'Business Type'}
        name={'businessType'}
        control={control}
        inputProps={{ placeholder: 'Business type' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
    </Box>
  );
};

export default CompanyFormComponent;
