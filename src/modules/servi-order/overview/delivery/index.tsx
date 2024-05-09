import { Box } from '@mui/material';
import React from 'react';
import { ShadowBox, Heading12 } from '@/common/styles';
import { ReactComponent as DeliveryTruckIcon } from '@/assets/order-icon/delivery_truck.svg';

const Delivery = () => {
  return (
    <ShadowBox>
      <Box sx={{ width: '90%' }}>
        <NoDeliveryFound />
      </Box>
    </ShadowBox>
  );
};

const NoDeliveryFound = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <DeliveryTruckIcon />
      <Heading12>Once you make a delivery, it will appear here.</Heading12>
    </Box>
  );
};

export default Delivery;
