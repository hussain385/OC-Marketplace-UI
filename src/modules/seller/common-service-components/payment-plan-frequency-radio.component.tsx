import React from 'react';
import { Controller } from 'react-hook-form';
import BpRadio from '@/common/components/bp-radio.component';
import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';

type componentPropType = {
  control: any;
  errors: any;
  loopKey: number;
  disabled?: boolean;
};

const PaymentPlanFrequencyRadioComponent = ({ control, errors, loopKey, disabled }: componentPropType) => {
  return (
    <Box
      sx={{
        height: '12em',
        padding: '10px',
        borderBottom: '1px solid #EAEAEA',
        backgroundColor: 'white',
      }}
    >
      <Controller
        name={`package${loopKey + 1}.paymentFrequency`}
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
                }
              }}
            >
              <FormControlLabel
                value='MONTHLY'
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
                    Monthly
                  </Typography>
                }
              />
              <FormControlLabel
                value='QUARTERLY'
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
                    Quarterly
                  </Typography>
                }
              />
              <FormControlLabel
                value='HALF_YEARLY'
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
                    Half yearly
                  </Typography>
                }
              />
              <FormControlLabel
                value='ANNUALLY'
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
                    Annually
                  </Typography>
                }
              />
            </RadioGroup>
          );
        }}
      />
      {Boolean(errors[`package${loopKey + 1}`]) && (
        <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
          {errors[`package${loopKey + 1}`]?.paymentFrequency?.message as never}
        </Typography>
      )}
    </Box>
  );
};

export default PaymentPlanFrequencyRadioComponent;
