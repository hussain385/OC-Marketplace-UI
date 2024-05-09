import React from 'react';
import InputForm from '@/common/components/forms/input.form';
import { Box } from '@mui/material';

const LegalFormComponent = ({ control }: { control: any }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <InputForm
        label={`Legal representative’s name`}
        name={'legalName'}
        control={control}
        inputProps={{ placeholder: `Legal Representative's Name` }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
      <InputForm
        label={'Legal representative’s email address'}
        name={'legalEmail'}
        control={control}
        inputProps={{ placeholder: 'Legal representative’s email address' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
    </Box>
  );
};

export default LegalFormComponent;
