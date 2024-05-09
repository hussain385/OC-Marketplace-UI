import React from 'react';
import { Color } from '@/theme';
import { Box, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';

const InitialPaymentInput = ({
  showInitialDeposit,
  setInitialDeposit,
  initialDeposit,
}: {
  showInitialDeposit: boolean;
  setInitialDeposit: (value: number) => void;
  initialDeposit: number;
}) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        height: showInitialDeposit ? '18em' : '12em',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: Color.darkGrey,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'fit-content',
          padding: '17.769px 35.538px',
        }}
      >
        <p style={{ fontSize: '17px', color: '#fff', fontWeight: '800', marginBottom: 0 }}>Start</p>
      </Box>
      <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey, minHeight: '2em' }} />
      {showInitialDeposit && (
        <Box
          sx={{
            border: '1px solid #EAEAEA',
            padding: '10px',
            paddingBottom: '1.5em',
            backgroundColor: 'white',
            borderRadius: '11px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '254px',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
          <Box sx={{ width: '78%' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '15px' }}>Initial payment</Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #EAEAEA',
              display: 'flex',
              gap: '0.5em',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '11px',
              borderRadius: '5px',
              width: '80%',
            }}
          >
            <NumericFormat
              value={initialDeposit}
              thousandSeparator
              decimalScale={0}
              fixedDecimalScale
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: Color.textBlack,
                border: 'none',
                width: '100%',
                outline: 'none',
              }}
              prefix={'S$ '}
              onValueChange={(e) => setInitialDeposit(Number(e.value))}
            />
          </Box>
        </Box>
      )}
      <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey, minHeight: '2em' }} />
    </Box>
  );
};

export default InitialPaymentInput;
