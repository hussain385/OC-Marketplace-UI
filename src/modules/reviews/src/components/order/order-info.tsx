import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { mediaUrlGenerator } from '@/common/utils';
import { useAppSelector } from '@/redux/hooks.tsx';
import { Color } from '@/theme.ts';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';

interface IOrderInfo {
  isSeller?: boolean;
}

function OrderInfo({ isSeller = false }: IOrderInfo) {
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);

  return (
    <Grid container spacing={'17px'}>
      <Grid item xs={6}>
        <Typography variant={'subText'}>{isSeller ? 'Customer name' : 'Service Provider'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant={'subText'}>{isSeller ? 'Service purchased' : 'Service name'}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ placeSelf: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isSeller ? (
            <NameOrPictureAvatar
              url={
                selectedOrder?.seller.profile.detail.logo == null
                  ? undefined
                  : mediaUrlGenerator(selectedOrder?.seller.profile.detail.logo)
              }
              name={selectedOrder?.seller.profile.detail.name}
            />
          ) : (
            <NameOrPictureAvatar
              url={
                selectedOrder?.buyer.profile.detail.logo == null
                  ? undefined
                  : mediaUrlGenerator(selectedOrder?.buyer.profile.detail.logo)
              }
              name={selectedOrder?.buyer.profile.detail.name}
            />
          )}
          <Typography variant={'subHeading'} sx={{ color: Color.priBlue, fontWeight: 600 }}>
            {isSeller ? selectedOrder?.buyer.profile.detail.name : selectedOrder?.seller.profile.detail.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ placeSelf: 'center' }}>
        <Typography variant={'subHeading'} sx={{ color: 'black', fontWeight: 400 }}>
          {selectedOrder?.service.name}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Divider />
      </Grid>
    </Grid>
  );
}

export default OrderInfo;
