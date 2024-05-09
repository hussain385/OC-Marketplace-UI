import React from 'react';
import { Box, ButtonBase, FormControl, FormLabel, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { SlLock } from 'react-icons/sl';

interface IFormContainer {
  value?: string;
  label: string;
  isLock?: boolean;
  btnLabel?: string;
  onUpdate: () => void;
}

function FormContainer({ value, label, isLock = false, btnLabel = 'Update', onUpdate }: IFormContainer) {
  return (
    <FormControl sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <FormLabel
          sx={{
            display: 'flex',
            gap: '4px',
            justifyContent: isLock ? 'start' : 'space-between',
            width: '100%',
            mb: '8px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'black',
              letterSpacing: '-0.5px',
              lineHeight: '24px',
            }}
          >
            {label}
          </Typography>
          {!isLock ? (
            <ButtonBase type={'button'} onClick={onUpdate} sx={{ fontSize: '12px', fontWeight: 600, color: Color.priBlue }}>
              {btnLabel}
            </ButtonBase>
          ) : (
            <SlLock style={{ color: Color.priRed, fontSize: '14px' }} />
          )}
        </FormLabel>
        <Typography
          sx={{
            padding: '10px 16px',
            borderRadius: '2px',
            border: '1px solid var(--line, #EAEAEA)',
            background: isLock ? '#F6F6F6' : '#FFF',
            minHeight: '43px',
          }}
        >
          {value}
        </Typography>
      </Box>
    </FormControl>
  );
}

export default FormContainer;
