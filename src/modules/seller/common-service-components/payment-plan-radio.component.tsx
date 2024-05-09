import React from 'react';
import { Controller } from 'react-hook-form';
import BpRadio from '@/common/components/bp-radio.component';
import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';

type componentPropType = {
  control: any;
  errors: any;
  loopKey: number;
  onChangePlan: (value: string) => void;
  disabled?: boolean;
};

const PaymentPlanRadioComponent = ({ control, errors, loopKey, disabled, onChangePlan }: componentPropType) => {
  return (
    <Box
      sx={{
        height: '8em',
        padding: '10px',
        borderBottom: '1px solid #EAEAEA',
        backgroundColor: 'white',
      }}
    >
      <Controller
        name={`package${loopKey + 1}.paymentType`}
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={field.value}
              onChange={(event) => {
                if (!disabled) {
                  field.onChange(event);
                  onChangePlan(event.target.value);
                }
              }}
            >
              <FormControlLabel
                value='SUBSCRIPTION'
                control={<BpRadio />}
                label={
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: 1.71,
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Subscription
                  </Typography>
                }
              />
              <FormControlLabel
                value='MILESTONE'
                control={<BpRadio />}
                label={
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: 1.71,
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Milestone payment
                  </Typography>
                }
              />
            </RadioGroup>
          );
        }}
      />
      {Boolean(errors[`package${loopKey + 1}`]) && (
        <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
          {errors[`package${loopKey + 1}`]?.payment_plan?.message as never}
        </Typography>
      )}
    </Box>
  );
};

export default PaymentPlanRadioComponent;
