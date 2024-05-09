import React from 'react';
import { FormControlLabel, RadioGroup, Typography } from '@mui/material';
import BpRadio from '@/common/components/bp-radio.component';
import { Controller } from 'react-hook-form';
import useQueryParams from '@/common/utils/hooks/useQueryParams';

type componentPropType = {
  control: any;
};

const AccountTypeControllerComponent = ({ control }: componentPropType) => {
  const [params] = useQueryParams();
  return (
    <Controller
      name='accountType'
      control={control}
      render={({ field }) => (
        <RadioGroup
          onChange={field.onChange}
          value={field.value}
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
        >
          {!params.get('isFreelancerEntity') && (
            <FormControlLabel
              value='FREELANCER'
              control={<BpRadio />}
              label={
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: 1.71,
                    letterSpacing: '-0.5px',
                  }}
                >
                  I’m representing myself (<span style={{ fontWeight: 600 }}>non-registered business</span>)
                </Typography>
              }
            />
          )}
          <FormControlLabel
            value='BUSINESS'
            control={<BpRadio />}
            label={
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 1.71,
                  letterSpacing: '-0.5px',
                }}
              >
                I’m representing a company/organisation (<span style={{ fontWeight: 600 }}>registered business</span>)
              </Typography>
            }
          />
        </RadioGroup>
      )}
    />
  );
};

export default AccountTypeControllerComponent;
