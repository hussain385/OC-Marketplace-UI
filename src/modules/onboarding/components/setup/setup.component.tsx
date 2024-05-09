import { Box, Typography, Step, StepLabel, Button } from '@mui/material';
import React from 'react';
import { ActionButtonPrimary, ActionButtonSecondry, RoundContainer } from '../../../../common/styles';
import { Props } from './setup.interface';
import { CustomStepper } from './setup.style';

export const SetupOrganisation = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <RoundContainer>
      <Box>
        <Typography sx={{ fontSize: '18px', fontWeight: '700', fontFamily: 'Manrope' }}>
          Set up your organisation ({activeStep + 1}/{props.steps.length}){' '}
        </Typography>
      </Box>
      <CustomStepper activeStep={activeStep} sx={{ marginY: '16px', '.MuiStepConnector-line': { borderTopWidth: 0 } }}>
        {props.steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </CustomStepper>
      {activeStep === props.steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ padding: '10px' }}>{props.steps[activeStep].component}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <ActionButtonSecondry color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Skip for now
            </ActionButtonSecondry>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep > 0 ? (
              <ActionButtonSecondry sx={{ mr: 1 }} color='inherit' onClick={handleBack}>
                Previous
              </ActionButtonSecondry>
            ) : null}
            <ActionButtonPrimary onClick={handleNext}>
              {activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
            </ActionButtonPrimary>
          </Box>
        </React.Fragment>
      )}
    </RoundContainer>
  );
};
