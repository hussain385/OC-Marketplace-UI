import React from 'react';
import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import { Controller, FieldPath, FieldPathValue, SetValueConfig } from 'react-hook-form';
import { Color } from '@/theme';
import BpRadio from '@/common/components/bp-radio.component';

type Props = {
  control: any;
  setValue: (name: FieldPath<any>, value: FieldPathValue<any, FieldPath<any>>, options?: SetValueConfig) => void;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
};

const IdentificationOptionsComponent = (props: Props) => {
  return (
    <Box
      sx={{
        display: { xs: 'column', md: 'flex' },
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '25px',
        mb: '10px',
        marginTop: '10px',
      }}
    >
      <Typography
        variant='body2'
        sx={{
          fontSize: '14px !important',
          fontWeight: '600',
          color: Color.bgGreyDark,
        }}
      >
        Identification type:
      </Typography>
      <Controller
        name='identificationType'
        control={props.control}
        render={({ field }) => {
          return (
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={field.value}
              onChange={(event) => {
                props.setValue('frontIDPic', undefined);
                props.setValue('backIDPic', undefined);
                props.setValue('selfieVerification', undefined);
                props.setDocumentType((event.target as HTMLInputElement).value);
                field.onChange(event);
              }}
            >
              <FormControlLabel
                value='NATIONAL'
                disabled={props.isSubmitting}
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
                    National ID
                  </Typography>
                }
              />
              <FormControlLabel
                value='PASSPORT'
                disabled={props.isSubmitting}
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
                    Passport
                  </Typography>
                }
              />
            </RadioGroup>
          );
        }}
      />
    </Box>
  );
};

export default IdentificationOptionsComponent;
