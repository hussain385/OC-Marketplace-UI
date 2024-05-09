/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Color } from '../../../../../theme';
import { FHStatusLabel } from '../styles';
import { ReactComponent as DownloadIcon } from '../assets/download_icon.svg';
import { TextButton } from '../../../../../common/styles';
import { EARNING_STATUS } from '../utils/constants';
import { IEarningResponse } from '../interface/earning.interface';
import { displayCategorySubcateogry, onExportButtonClick } from '../utils/functions';
import { sortComparator } from '../../../../../common/utils';
//import { getCookie } from "../../../../../common/utils/cookie";

export const GridColumns = (navigate?: NavigateFunction) => {
  //const userType = getCookie('x-client-type');
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Order',
      width: 330,
      valueGetter: (params: GridValueGetterParams<any, IEarningResponse>) => ({
        name: params.row.order ? params.row.order.metadata.service.name : '',
      }),
      renderCell: (params: GridCellParams<any, IEarningResponse>) => (
        <Box>
          <Typography
            variant='h4'
            sx={{ color: '#1D2130', fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px', fontWeight: 600 }}
          >
            {params.row.order && params.row.order.metadata ? params.row.order.metadata.service.name : 'N/A'}
          </Typography>
          <Typography
            variant='body1'
            noWrap
            sx={{
              color: '#7e7e7e',
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '-0.5px',
              fontWeight: 600,
              textOverflow: 'ellipsis',
              maxWidth: '300px',
            }}
          >
            {displayCategorySubcateogry(params.row.order.metadata.categories)}
          </Typography>
        </Box>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'delivery_date',
      headerName: 'Delivery date',
      width: 110,
      valueGetter: (params: GridValueGetterParams<any, IEarningResponse>) => ({
        name: params.row.completedAt,
      }),
      renderCell: (params: GridCellParams<any, IEarningResponse>) => (
        <Typography>{params.row.completedAt ? dayjs(params.row.completedAt).format('MMM D, YYYY') : ''}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'earning_id',
      headerName: 'Earning ID',
      width: 220,
      valueGetter: (params: GridValueGetterParams<any, IEarningResponse>) => ({
        name: params.row.id,
      }),
      renderCell: (params: GridCellParams<any, IEarningResponse>) => (
        <Box
          sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate && navigate(`/account/financial-hub/earning/details/${params.row.id}`)}
        >
          <Typography
            sx={{
              color: Color.priBlue,
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '-0.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {params.row.id}
          </Typography>
        </Box>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'status',
      headerName: 'Earning status',
      width: 130,
      valueGetter: (params: GridValueGetterParams<any, IEarningResponse>) => ({
        name: params.row.status,
      }),
      renderCell: (params: GridCellParams<any, IEarningResponse>) => (
        <FHStatusLabel className={EARNING_STATUS[params.row.status]}>{EARNING_STATUS[params.row.status]}</FHStatusLabel>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'purchaseEntity',
      headerName: 'Purchased by',
      width: 224,
      valueGetter: (params: GridValueGetterParams<any, IEarningResponse>) => ({
        name: params.row.order.buyerEntityName,
      }),
      renderCell: (params: GridCellParams<any, IEarningResponse>) => <Typography>{params.row.order.buyerEntityName}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: 'amount',
      headerName: 'Actual amount',
      align: 'right',
      valueGetter: (params: GridValueGetterParams<any, IEarningResponse>) => ({
        name: params.row.grossAmount,
      }),
      renderCell: (params: GridCellParams<any, IEarningResponse>) => (
        <Typography
          sx={{
            textAlign: 'right',
            fontWeight: 600,
            color: EARNING_STATUS[params.row.status] === 'Released' ? Color.price : 'inherit',
          }}
        >
          S${params.row.grossAmount}
        </Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      align: 'right',
      renderCell: (params: GridCellParams) => (
        <TextButton
          onClick={() =>
            onExportButtonClick({
              url: `/earnings`,
              defaultParams: { join: 'items', filter: `id||$eq||${params.row.id}` },
              newParams: {},
              exportType: 'pdf',
            })
          }
        >
          <DownloadIcon />
        </TextButton>
      ),
    },
  ];
  return columns;
};
