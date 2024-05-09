import React from 'react';
import InputForm from '@/common/components/forms/input.form';
import { Box } from '@mui/material';

const NationalFormComponent = ({ control, documentType }: { control: any; documentType: string }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <InputForm
        label={`Full name on ${documentType === 'NATIONAL' ? 'National ID' : 'Passport'}`}
        name={'name'}
        control={control}
        inputProps={{ placeholder: 'Full name' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
      <InputForm
        label={'Nationality'}
        name={'nationality'}
        control={control}
        inputProps={{ placeholder: 'Nationality' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
      <InputForm
        label={documentType === 'NATIONAL' ? 'National ID  number' : 'Passport  number'}
        name={'nationalityNumber'}
        control={control}
        inputProps={{ placeholder: 'National ID  number' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EAEAEA',
          },
        }}
      />
      <InputForm
        label={'Street address'}
        name={'streetAddress'}
        control={control}
        inputProps={{
          placeholder: 'Street address',
          sx: {
            height: '7rem',
            alignItems: 'start',
            padding: '2px 0px',
            border: '1px solid #EAEAEA',
            '&:hover': { outline: '1px solid black' },
            overflow: 'auto',
          },
          multiline: true,
        }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
          },
        }}
      />
    </Box>
  );
};

export default NationalFormComponent;
