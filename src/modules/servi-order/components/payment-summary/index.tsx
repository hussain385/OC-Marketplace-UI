import React from 'react';
import { Box } from '@mui/material';
import { BorderLinearProgress, Text12, Text14 } from '@/common/styles';
import { Color } from '@/theme';

type Props = {
  totalAmount: number;
  paidAmount: number;
};

const PaymentSummary = ({ totalAmount, paidAmount }: Props) => {
  const balanceAmount = totalAmount - paidAmount;
  const percentage = (paidAmount / totalAmount) * 100;
  return (
    <Box sx={{ width: '320px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text14 sx={{ flex: 1, fontWeight: '800' }}>Summary</Text14>
        <Text12 sx={{ flex: 0.2, textAlign: 'right' }}>$ {totalAmount}</Text12>
      </Box>
      <Box sx={{ width: '100%' }}>
        <BorderLinearProgress variant='determinate' value={percentage} sx={{ height: '6px' }} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <span
            style={{
              width: '6px',
              height: '6px',
              background: Color.green2,
              display: 'inline-block',
              borderRadius: '8px',
              margin: '0px 5px',
            }}
          ></span>
          <Text12 sx={{ marginRight: '5px', textTransform: 'uppercase', fontWeight: '700' }}>Paid</Text12>
          <Text12 sx={{ color: Color.textGray, fontWeight: '500' }}>$ {paidAmount}</Text12>
        </Box>
        <Box>
          <span
            style={{
              width: '6px',
              height: '6px',
              background: Color.lightGrey,
              display: 'inline-block',
              borderRadius: '8px',
              margin: '0px 5px',
            }}
          ></span>
          <Text12 sx={{ marginRight: '5px', textTransform: 'uppercase', fontWeight: '700' }}>Balance</Text12>
          <Text12 sx={{ color: Color.textGray, fontWeight: '500' }}>$ {balanceAmount}</Text12>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentSummary;
