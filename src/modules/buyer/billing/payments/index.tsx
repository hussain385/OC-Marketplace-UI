import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { AppThemeBtnComponent } from '../../../../common/components/app-theme-btn.component';
import { Color } from '../../../../theme';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import getPaymentMethod from './utils';

const BillingPaymentList = () => {
  const [isPayment, setPaymentMethod] = React.useState<boolean>(false);

  const handlerPaymentMethod = useCallback(() => {
    setPaymentMethod(!isPayment);
  }, [isPayment]);

  return (
    <Box sx={{ maxWidth: '1440px', marginInline: 'auto' }}>
      <Typography sx={{ fontWeight: 700, lineHeight: '25px', letterSpacing: '-0.02em', fontSize: '18px' }}>
        Payment methods
      </Typography>

      {isPayment === true && (
        <Box>
          <Typography sx={{ fontWeight: 400, lineHeight: '19px', letterSpacing: '-0.02em', fontSize: '14px' }}>
            Securely add and manage your payment methods
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' },
              gridAutoFlows: 'column',
              mt: '24px',
            }}
          >
            {getPaymentMethod?.map((item: { icon: string; name: string; expireDate: string }, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '15px',
                  borderTop: `1px solid ${Color.line}`,
                  borderBottom: `1px solid ${Color.line}`,
                  paddingBlock: '1rem',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Box>
                    <img src={item.icon} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.expireDate}</Typography>
                  </Box>
                </Box>
                <Box>
                  <HiOutlineDotsHorizontal style={{ fontWeight: 700 }} color={Color.pureBlack} size={20} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <AppThemeBtnComponent
        customButtonStyle={{
          width: '164px',
          height: '40px',
          borderRadius: '4px',
          padding: 0,
          mt: '37px',
        }}
        hover={Color.priBlue}
        fontSize={'14px'}
        color={Color.priWhite}
        backgroundColor={Color.priBlue}
        width={'164px'}
        text={'Add payment methods'}
        onClick={handlerPaymentMethod}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <Typography sx={{ fontWeight: 400, lineHeight: '19px', letterSpacing: '-0.02em', fontSize: '14px' }}>
          Securely add and manage your payment methods
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingPaymentList;
