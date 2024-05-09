import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import ModalValidation from '@/common/components/modal-validation.component.tsx';
import { Color } from '@/theme.ts';
import SelfieModalPopUp from '@/common/components/selfie-modal-popup.component.tsx';

interface IInfoModal {
  heading: string;
}

export function FrontInfoModal({ heading }: IInfoModal) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Typography
        variant='body2'
        sx={{
          color: Color.textBlack,
          mb: '8px',
          fontWeight: 600,
          fontSize: '14px',
          display: 'flex',
          marginTop: { xs: '16px', sm: '16px' },
        }}
      >
        {heading} &nbsp;
        <Box
          sx={{
            '&:hover': {
              cursor: 'help',
            },
          }}
          onClick={() => setIsOpen(true)}
          component={'span'}
        >
          <img src={require('@/assets/icons/ic-info.svg').default} alt={heading} />
        </Box>
      </Typography>
      <ModalValidation onCloseHandle={() => setIsOpen(false)} modalOpen={isOpen} />
    </Box>
  );
}

export function SelfieInfoModal({ heading }: IInfoModal) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Typography
        variant='body2'
        sx={{
          color: Color.textBlack,
          mb: '8px',
          fontWeight: 600,
          fontSize: '14px',
          display: 'flex',
          marginTop: { xs: '16px', sm: '16px' },
        }}
      >
        {heading} &nbsp;
        <Box
          sx={{
            '&:hover': {
              cursor: 'help',
            },
          }}
          onClick={() => setIsOpen(true)}
          component={'span'}
        >
          <img src={require('@/assets/icons/ic-info.svg').default} alt={heading} />
        </Box>
      </Typography>
      <SelfieModalPopUp onCloseHandle={() => setIsOpen(false)} modalOpen={isOpen} />
    </Box>
  );
}
