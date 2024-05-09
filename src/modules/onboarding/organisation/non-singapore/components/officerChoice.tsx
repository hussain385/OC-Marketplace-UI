import React from 'react';
import { FormLabel } from '@/common/styles';
import { CustomWidthTooltip } from '@/common/components/tooltip.component.tsx';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Color } from '@/theme.ts';
import { ToggleButton } from '@/modules/onboarding/components/organisation-selection/organisation-selection.style.tsx';
import { Box } from '@mui/material';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface IOfficerChoice<TFieldValues extends FieldValues> {
  control: UseControllerProps<TFieldValues>;
}

function OfficerChoice<TFieldValues extends FieldValues>({ control }: IOfficerChoice<TFieldValues>) {
  const { field } = useController(control);

  return (
    <Box>
      <FormLabel sx={{ marginBottom: '0.7em', fontSize: '14px !important' }}>
        1. Are you an authorised officer of this organisation?
        <CustomWidthTooltip
          title='An authorised officer can be the owner, CEO, director, or someone holding a legal position who can represent and transact on behalf of the organisation.'
          arrow
        >
          <AiFillInfoCircle color={Color.bgGreyDark} fontSize={18} style={{ marginLeft: '8px' }} />
        </CustomWidthTooltip>
      </FormLabel>
      <ToggleButton
        onClick={() => field.onChange('NATIONAL')}
        sx={{ ml: 1, width: '10em', fontSize: { xs: '12px', md: '14px' } }}
        className={field.value !== 'NONE' ? 'active' : ''}
      >
        Yes, I am
      </ToggleButton>
      <ToggleButton
        onClick={() => field.onChange('NONE')}
        sx={{ ml: 1, width: '10em', fontSize: { xs: '12px', md: '14px' } }}
        className={field.value !== 'NONE' ? '' : 'active'}
      >
        No, I&apos;m not
      </ToggleButton>
    </Box>
  );
}

export default OfficerChoice;
