import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridComparatorFn,
  gridStringOrNumberComparator,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { OrderStatusLabel } from '../../order-management.style';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { ActionButtonOutlined, NameLabel } from '@/common/styles';
import { Color } from '@/theme';
import { mediaUrlGenerator } from '@/common/utils';
import { orderStatus, subOrderStatus } from '../../interface';
import { RenderIf } from '@/common/components';

export const sortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
  return gridStringOrNumberComparator((v1 as any).name, (v2 as any).name, param1, param2);
};

export const orderGridColumns = (myRole: string, navigate: any) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Order',
      width: 380,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.service.name,
      }),
      renderCell: (params: GridCellParams) => <Typography>{params.row.service.name}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: 'createdAt',
      headerName: 'Order date',
      width: 110,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.createdAt,
      }),
      renderCell: (params: GridCellParams) => <Typography>{dayjs(params.row.createdAt).format('MMM D, YYYY')}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: 'paymentPlan',
      headerName: 'Payment plan',
      width: 110,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.paymentType,
      }),
      renderCell: (params: GridCellParams) => (
        <Typography sx={{ textTransform: 'capitalize' }}>{params.row.paymentType.toLowerCase()}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.currentSubOrder.status,
      }),
      renderCell: (params: GridCellParams) => (
        <OrderStatusLabel
          className={
            [orderStatus.requestCancellation, orderStatus.completed, orderStatus.cancelled].includes(params.row.status as any)
              ? params.row.status.toLowerCase()
              : params.row.currentSubOrder.status.toLowerCase()
          }
        >
          <Typography>
            {[orderStatus.requestCancellation, orderStatus.completed, orderStatus.cancelled].includes(params.row.status as any)
              ? params.row.status.replace('_', ' ')
              : params.row.currentSubOrder.status.replace('_', ' ')}
          </Typography>
        </OrderStatusLabel>
      ),

      sortComparator: sortComparator,
    },
    {
      field: 'paidAmount',
      headerName: 'Amount paid',
      width: 106,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.paidAmount,
      }),
      renderCell: (params: GridCellParams) => <Typography>{params.row.paidAmount}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: myRole === 'BUYER' ? 'buyerEntityName' : 'sellerEntityName',
      headerName: myRole === 'BUYER' ? 'Provided by' : 'Purchased by',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => ({
        name: myRole === 'BUYER' ? params.row.seller.profile.detail.name : params.row.buyer.profile.detail.name,
      }),
      renderCell: (params: GridCellParams) => {
        const label = myRole === 'BUYER' ? params.row.seller.profile.detail.name : params.row.buyer.profile.detail.name;
        const logo = myRole === 'BUYER' ? params.row.seller.profile.detail.logo : params.row.buyer.profile.detail.logo;
        const logoUrl = logo ? mediaUrlGenerator(logo) : undefined;
        if (isEmpty(label)) {
          return <></>;
        } else {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <NameOrPictureAvatar name={label} url={logoUrl} />
                {/* <OnlineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' /> */}
              </Box>
              <Box sx={{ paddingLeft: '15px' }}>
                <NameLabel sx={{ color: Color.textGray }}>{label}</NameLabel>
              </Box>
            </Box>
          );
        }
      },
      sortComparator: sortComparator,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params: GridCellParams) => (
        <Box>
          <RenderIf
            value={
              params.row.status !== orderStatus.requestCancellation &&
              params.row.currentSubOrder.status === subOrderStatus.waitingPayment &&
              myRole === 'BUYER'
            }
          >
            <ActionButtonOutlined
              sx={{ padding: '4px 20px 4px 20px' }}
              variant='outlined'
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  { pathname: `/checkout/:id`, search: `orderId=${params.row.id}` },
                  { params: { id: params.row.pkg.id as string } },
                );
              }}
            >
              {params.row.paymentType === 'SUBSCRIPTION' ? 'Pay now' : 'Fund milestone'}
            </ActionButtonOutlined>
          </RenderIf>
          <RenderIf
            value={
              params.row.status !== orderStatus.requestCancellation &&
              params.row.currentSubOrder.status === subOrderStatus.waitingRequirement &&
              myRole === 'BUYER'
            }
          >
            <ActionButtonOutlined
              variant='outlined'
              onClick={() => {
                //redirection to order detail page and open requirement tab
              }}
            >
              Submit now
            </ActionButtonOutlined>
          </RenderIf>
        </Box>
      ),
    },
  ];
  return columns;
};
