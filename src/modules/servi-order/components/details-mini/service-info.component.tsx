import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Color } from '@/theme';
import { mediaUrlGenerator } from '@/common/utils';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const OrderDetailsServiceInfo = () => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const serviceMedia =
    selectedOrder && selectedOrder.service && selectedOrder.service.medias && selectedOrder.service.medias.length > 0
      ? selectedOrder.service.medias[0]
      : null;
  const imageUrl = serviceMedia ? mediaUrlGenerator(serviceMedia) : undefined;
  return (
    <Box sx={{ display: 'flex', width: '100%', marginY: '16px' }}>
      <Box
        sx={{
          marginRight: '16px',
          backgroundColor: Color.bgGreyLight,
          width: '84px',
          height: '84px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {serviceMedia ? (
          <img style={{ width: '84px', height: '84px', objectFit: 'cover' }} src={imageUrl} />
        ) : (
          <ImageNotSupportedIcon sx={{ fontSize: '44px', color: Color.E3E3E3 }} />
        )}
      </Box>
      <Box>{selectedOrder ? selectedOrder.service.name : null} </Box>
    </Box>
  );
};
export default OrderDetailsServiceInfo;
