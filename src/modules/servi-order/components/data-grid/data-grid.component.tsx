import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { Color, gridStyles } from '@/theme';
import { ReactComponent as EmptyBoxIcon } from '@/assets/order-icon/emptybox_icon.svg';
import { BoxBorder } from './data-grid.style';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import { NameLabel, OnlineBadge, Text12, Text14 } from '@/common/styles';
import { OrderStatusLabel } from '../../order-management.style';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { Order } from '../../interface';
import { getCookie } from '@/common/utils/cookie';

interface Props {
  columns: GridColDef[];
  dataSource: Order;
  emptyDataOverlay?: string | React.ReactNode;
  onResponsiveRowClick?: (params: Order) => void;
}

const OrderDataGridComponent = ({ columns, dataSource, emptyDataOverlay, onResponsiveRowClick, ...otherProps }: Props & any) => {
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  //TODO comment this as we have different design
  //const [pageSize, setPageSize] = React.useState<number>(10); //default grid page size
  const { xs, sm, mdLg } = useMediaBreakpoint();
  const userType = getCookie('x-client-key');

  function NoResultsOverlay() {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        {emptyDataOverlay ? (
          emptyDataOverlay
        ) : (
          <>
            <EmptyBoxIcon />
            <Typography sx={{ color: '#7E7E7E', fontSize: '14px' }}>You haven&apos;t placed any orders yet</Typography>
          </>
        )}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: !isEmpty(dataSource) ? 'auto' : '350px',
        position: 'relative',
        marginBottom: '80px',
      }}
    >
      <RenderIf value={mdLg}>
        <DataGrid
          sortingOrder={['desc', 'asc']}
          autoHeight={!isEmpty(dataSource)}
          rows={dataSource}
          columns={columns}
          sx={gridStyles}
          selectionModel={selectionModel}
          //pageSize={pageSize}
          //rowsPerPageOptions={[10, 20, 50, 100]}
          pagination
          components={{
            NoRowsOverlay: NoResultsOverlay,
          }}
          //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSelectionModelChange={(model) => {
            setSelectionModel(model);
          }}
          {...otherProps}
        />
      </RenderIf>
      <RenderIf value={xs || sm}>
        {dataSource.map((row: Order, index: number) => {
          const label = userType === 'buyer' ? row.seller.profile.detail.name : row.buyer.profile.detail.name;
          return (
            <BoxBorder key={index} onClick={() => onResponsiveRowClick && onResponsiveRowClick(row)}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Text12 sx={{ color: Color.textHint, fontWeight: '700' }}>Order</Text12>
                  <Text14 sx={{ fontWeight: '500' }}>{row.service.name}</Text14>
                </Box>
                <Box>
                  <Text12 sx={{ color: Color.textHint, fontWeight: '700' }}>Amount paid</Text12>
                  <Text14 sx={{ textAlign: 'right', fontWeight: { xs: '700', md: '500' } }}>
                    <RenderIf value={xs || sm}>$</RenderIf>
                    {row.paidAmount}
                  </Text14>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Box>
                  <Text12 sx={{ color: Color.textHint, fontWeight: '700' }}>Status</Text12>
                  <OrderStatusLabel className={row.currentSubOrder.status.toLowerCase()} sx={{ maxWidth: '164px' }}>
                    {row.currentSubOrder.status.replace('_', ' ')}
                  </OrderStatusLabel>
                </Box>
                <Box>
                  <Text12 sx={{ color: Color.textHint, fontWeight: '700' }}>Payment plan</Text12>
                  <Text14 sx={{ textAlign: 'right', fontWeight: '500', textTransform: 'capitalize' }}>
                    {row.paymentType.toLowerCase()}
                  </Text14>
                </Box>
              </Box>
              <Box sx={{ marginTop: '16px' }}>
                <Text12 sx={{ color: Color.textHint, fontWeight: '700' }}>
                  {userType === 'buyer' ? 'Provided by' : 'Purchased by'}
                </Text12>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', width: '40px' }}>
                    <NameOrPictureAvatar name={label} url='' />
                    <OnlineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' />
                  </Box>
                  <Box sx={{ paddingLeft: '16px' }}>
                    <NameLabel>{label}</NameLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Box>
                  <Text12 sx={{ color: Color.textHint, fontWeight: '700' }}>Order date</Text12>
                  <Text14 sx={{ fontWeight: '500' }}>{row.createdAt ? dayjs(row.createdAt).format('MMM D, YYYY') : ''}</Text14>
                </Box>
              </Box>
            </BoxBorder>
          );
        })}
        {isEmpty(dataSource) && NoResultsOverlay()}
      </RenderIf>
    </Box>
  );
};
export default OrderDataGridComponent;
