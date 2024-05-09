import React from 'react';
import { PrimaryButton, SecondryButton } from '@/common/styles';
import { Box } from '@mui/material';

type componentPropType = {
  isLoading: boolean;
  setVerifyFormShow?: (value: boolean) => void;
  setStep: (value: number) => void;
  step: number;
  onOk?: () => void;
};

const SubmitButton = ({ isLoading, setStep, step, onOk }: componentPropType) => {
  const onClick = () => {
    onOk && onOk();
  };
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: '3em' }}>
      <SecondryButton
        onClick={() => {
          setStep(step - 1);
        }}
        type={'button'}
        sx={{
          color: 'black',
          backgroundColor: 'white',
          border: '1px solid #eaeaea',
        }}
      >
        {step === 1 ? 'Cancel' : 'Back'}
      </SecondryButton>
      <PrimaryButton
        disabled={isLoading}
        onClick={onClick} // Add onClick only if it's present
        type='submit'
        sx={{ marginLeft: 2 }}
      >
        {isLoading ? 'Please wait!' : 'Next'}
      </PrimaryButton>
    </Box>
  );
};

export default SubmitButton;
