import dayjs from 'dayjs';
import { GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Color } from '../../../../../theme';
import { ReactComponent as DownloadIcon } from '../assets/download_icon.svg';
import { TextButton } from '../../../../../common/styles';
import { IInvoiceCenterResponse } from '../interface/invoice-center-interface';
import { onExportButtonClick } from '../utils/functions';
import { EARNING_INVOICE_TYPE } from '../utils/constants';
import { sortComparator } from '../../../../../common/utils';
//import { getCookie } from "../../../../../common/utils/cookie";

export const GridColumns = (navigate?: NavigateFunction) => {
  //const userType = getCookie('x-client-type');
  const columns: GridColDef[] = [
    {
      field: 'date_issued',
      headerName: 'Date issued',
      width: 150,
      valueGetter: (params: GridValueGetterParams<any, IInvoiceCenterResponse>) => ({
        name: params.row.createdAt,
      }),
      renderCell: (params: GridCellParams<any, IInvoiceCenterResponse>) => (
        <Typography>{params.row.createdAt ? dayjs(params.row.createdAt).format('MMM D, YYYY') : ''}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'type',
      headerName: 'Invoice type',
      width: 224,
      valueGetter: (params: GridValueGetterParams<any, IInvoiceCenterResponse>) => ({
        name: EARNING_INVOICE_TYPE[params.row.type],
      }),
      renderCell: (params: GridCellParams<any, IInvoiceCenterResponse>) => (
        <Typography>{EARNING_INVOICE_TYPE[params.row.type]}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'invoie_number',
      headerName: 'Invoice number',
      width: 220,
      valueGetter: (params: GridValueGetterParams<any, IInvoiceCenterResponse>) => ({
        name: params.row.id,
      }),
      renderCell: (params: GridCellParams<any, IInvoiceCenterResponse>) => (
        <Box
          sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate && navigate(`/account/financial-hub/invoice-details/${params.row.id}`)}
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
      field: 'transaction_id',
      headerName: 'Transaction ID',
      width: 224,
      valueGetter: (params: GridValueGetterParams<any, IInvoiceCenterResponse>) => ({
        name: params.row.earning ? params.row.earning?.id : params.row.withdrawal ? params.row.withdrawal.id : 'N/A',
      }),
      renderCell: (params: GridCellParams<any, IInvoiceCenterResponse>) => (
        <Typography>
          {params.row.earning ? params.row.earning?.id : params.row.withdrawal ? params.row.withdrawal.id : 'N/A'}
        </Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'amount',
      headerName: 'Actual amount',
      width: 100,
      align: 'right',
      valueGetter: (params: GridValueGetterParams<any, IInvoiceCenterResponse>) => ({
        name: params.row.totalAmount,
      }),
      renderCell: (params: GridCellParams<any, IInvoiceCenterResponse>) => <Typography>S${params.row.totalAmount}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      width: 50,
      renderCell: (params: GridCellParams) => (
        <TextButton>
          <DownloadIcon
            className='cursor'
            onClick={() => {
              onExportButtonClick({
                url: `/earning-invoices`,
                defaultParams: { join: 'items', filter: `id||$eq||${params.row.id}` },
                newParams: {},
                exportType: 'pdf',
              });
            }}
          />
        </TextButton>
      ),
    },
  ];
  return columns;
};
