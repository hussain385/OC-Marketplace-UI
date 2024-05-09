import { Box, IconButton, Skeleton } from '@mui/material';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import AddPaymentMethod from './components/addPaymentMethod';
import CardPaymentMethod from './components/CardPaymentMethod';
import { useGetPayoutInfoQuery } from '../services/payout.api';
import { AddMainContainer } from './components/addPaymentMethod.styles';

function PayoutMethod() {
  const { data, isLoading } = useGetPayoutInfoQuery({});

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AddMainContainer sx={{ flexDirection: 'column', alignItems: 'start', padding: { xs: '24px 16px', sm: '40px 56px' } }}>
          <div>
            <Skeleton variant={'text'} className={'head'} height={24} width={150} />
            <Skeleton variant={'text'} className={'sub'} height={24} width={260} sx={{ mb: '0 !important' }} />
          </div>

          <Box className={'card-box'} sx={{ padding: { xs: '16px', sm: '24px 40px' } }}>
            <Skeleton variant={'rectangular'} height={56} width={56} />

            <div className={'text-container'}>
              <div className={'container-h'}>
                <div className={'head-container'}>
                  <Skeleton variant={'text'} className={'head-bank'} height={24} width={200} />
                  <Skeleton variant={'text'} className={'subHeading'} height={24} width={100} />
                </div>
                <Skeleton variant={'rectangular'} sx={{ borderRadius: '4px' }} height={20} width={68} />
              </div>

              <IconButton className={'menu-btn'}>
                <BsThreeDots />
              </IconButton>
            </div>
          </Box>
        </AddMainContainer>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!(data?.data?.length ?? 0 >= 1) ? <AddPaymentMethod /> : <CardPaymentMethod />}
    </Box>
  );
}

export default PayoutMethod;
