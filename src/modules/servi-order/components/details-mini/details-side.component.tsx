import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Color } from '@/theme';
import { OrderStatusLabel } from '../../order-management.style';
import dayjs from 'dayjs';
import { getOppositeOrderEntity, getOrderMyRole } from '../../Service/order.slice';
import { orderStatus } from '../../interface';

const OrderDetailsSide = () => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const oppositeEntity = useAppSelector(getOppositeOrderEntity);
  const myRole = useAppSelector(getOrderMyRole);
  const purchaseLabel = myRole === 'BUYER' ? 'Purchased from' : 'Purchased by';
  const deliveryDue = dayjs(selectedOrder!.currentSubOrder.startedAt).add(selectedOrder!.currentSubOrder!.deliveryDays as number, 'day');
  return (
    <Box>
      <List
        sx={{
          '& .MuiListItemText-root': { '& .MuiListItemText-primary': { fontSize: '14px' } },
          '& .MuiListItem-root': { paddingX: 0 },
        }}
      >
        <ListItem>
          <ListItemText sx={{ flex: '0.4' }}>Order status</ListItemText>
          <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
            <OrderStatusLabel className={[orderStatus.completed, orderStatus.cancelled, orderStatus.requestCancellation].includes(selectedOrder?.status as any) ? selectedOrder?.status.toLowerCase() : selectedOrder?.currentSubOrder.status.toLowerCase()}>
              {[orderStatus.completed, orderStatus.cancelled, orderStatus.requestCancellation].includes(selectedOrder?.status as any) ? selectedOrder?.status.replace('_','') : selectedOrder?.currentSubOrder.status.replace('_', ' ')}
            </OrderStatusLabel>
          </Box>
        </ListItem>
        <ListItem>
          <ListItemText sx={{ flex: '0.4' }}>{purchaseLabel}</ListItemText>
          <Typography noWrap sx={{ color: Color.priBlue, fontWeight: 700, flex: '0.6', textAlign: 'right' }}>
            {oppositeEntity?.profile.detail.name}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText sx={{ flex: '0.4' }}>Delivery due by</ListItemText>
          <Typography sx={{ color: Color.textBlack, fontWeight: 700, flex: '0.6', textAlign: 'right' }}>
            {deliveryDue ? deliveryDue.format('MMM D, YYYY') : 'N/A'}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText sx={{ flex: '0.4' }}>Order ID#</ListItemText>
          <Typography noWrap sx={{ color: Color.textBlack, fontWeight: 700, flex: '0.6', textAlign: 'right' }}>
            {selectedOrder?.id}
          </Typography>
        </ListItem>
        {/* <ListItem>
          <ListItemText sx={{ flex: '0.4' }}>Number of revision</ListItemText>
          <Typography sx={{ color: Color.textBlack, fontWeight: 700, flex: '0.6', textAlign: 'right' }}>
           {selectedOrder?.revisionCount}
          </Typography>
        </ListItem> */}
        <ListItem>
          <ListItemText sx={{ flex: '0.4' }}>Total Price</ListItemText>
          <Typography sx={{ color: Color.textBlack, fontWeight: 700, flex: '0.6', textAlign: 'right' }}>
            ${selectedOrder?.totalAmount}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default OrderDetailsSide;
