import { Avatar, Box, ListItemText, Typography } from '@mui/material';
import React from 'react';

export function BankTileSteps({ steps }: { steps: string[] }) {
  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', mt: '8px' }}>
      {steps.map((step, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > .MuiTypography-root': {
              fontSize: '12px !important',
              '& > span': {
                fontSize: '12px !important',
                color: '#2752E7',
              },
            },
            '& > .MuiAvatar-root': {
              width: '12px',
              height: '12px',
              color: '#2752E7',
              background: 'transparent',
              fontSize: '8px',
              border: '1.5px solid #2752E7',
              display: 'inline-flex',
              marginRight: '4px',
              padding: '5px',
            },
          }}
        >
          <Avatar>{index + 1}</Avatar>
          <Typography>
            {step} {index + 1 < steps.length && <Typography component={'span'}>{'>'}</Typography>}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export function BankTileList({ children, bankName }: { children: React.ReactNode; bankName: string }) {
  return (
    <Box component={'ul'} sx={{ paddingLeft: '14px', '& > li': { padding: '0px 8px' } }}>
      <li>
        <ListItemText
          sx={{
            '& .MuiTypography-root': {
              fontSize: '12px !important',
            },
          }}
        >
          {children}
        </ListItemText>
      </li>
      <li>
        <ListItemText
          sx={{
            '& .MuiTypography-root': {
              fontSize: '12px !important',
            },
          }}
        >
          {bankName} may charge{' '}
          <Typography component={'span'} fontWeight={700}>
            additional fees
          </Typography>{' '}
          for withdrawing funds
        </ListItemText>
      </li>
    </Box>
  );
}
