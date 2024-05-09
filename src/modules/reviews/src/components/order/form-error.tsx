import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

interface IFormModalError {
  onClear: () => void;
  isBuyer: boolean;
}

function FormModalError({ onClear, isBuyer }: IFormModalError) {
  return (
    <Box
      sx={{
        background: '#FFE9E8',
        borderRadius: '4px',
        padding: '8px',
        border: '0.50px #FF6A68 solid',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <InfoIcon sx={{ color: '#EC4C60', height: '18px', weight: '18px' }} />
        <Typography sx={{ color: '#ED4C2F', fontSize: '12px' }}>
          {isBuyer ? 'Rating the seller’s service using stars is required' : 'Rating the buyer using stars is required'}
        </Typography>
      </Box>
      <CloseIcon sx={{ color: '#7E7E7E', height: '20px', weight: '20px' }} onClick={() => onClear()} />
    </Box>
  );
}

export default FormModalError;
