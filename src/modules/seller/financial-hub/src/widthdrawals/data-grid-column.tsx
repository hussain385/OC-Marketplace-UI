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
import { IWithdrawalResponse } from '../interface/withdrawal.interface';
import { WITHDRAWAL_STATUS } from '../utils/constants';
import { onExportButtonClick } from '../utils/functions';
import { sortComparator } from '../../../../../common/utils';
//import { getCookie } from "../../../../../common/utils/cookie";

export const GridColumns = (navigate?: NavigateFunction, user?: any) => {
  //const userType = getCookie('x-client-type');
  const columns: GridColDef[] = [
    {
      field: 'requested_date',
      headerName: 'Requested date',
      width: 110,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.createdAt,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => (
        <Typography>{params.row.createdAt ? dayjs(params.row.createdAt).format('MMM D, YYYY') : ''}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'withdrawal_id',
      headerName: 'Withdrawal ID',
      width: 180,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.id,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => (
        <Box
          sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate && navigate(`/account/financial-hub/withdrawal-details/${params.row.id}`)}
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
      field: 'bank_account',
      headerName: 'Bank account',
      width: 110,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.bankAccount.accountNumber,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => (
        <Typography>
          ****{params.row.bankAccount.accountNumber.substr(params.row.bankAccount.accountNumber.length - 4)}
        </Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'status',
      headerName: 'Withdrawal status',
      width: 130,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.status,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => (
        <FHStatusLabel className={WITHDRAWAL_STATUS[params.row.status]}>{WITHDRAWAL_STATUS[params.row.status]}</FHStatusLabel>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'requested_by',
      headerName: 'Requested by',
      width: 224,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.createdBy,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => <Typography>{params.row.createdBy}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: 'amount',
      headerName: 'Actual',
      width: 168,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.grossAmount,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => <Typography>{params.row.grossAmount}</Typography>,
      sortComparator: sortComparator,
    },
    {
      field: 'fee',
      headerName: 'Fee',
      width: 168,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.feeAmount,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => (
        <Typography>{params.row.feeAmount ? params.row.feeAmount : 'N/A'}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'net',
      headerName: 'Net',
      width: 168,
      valueGetter: (params: GridValueGetterParams<any, IWithdrawalResponse>) => ({
        name: params.row.netAmount,
      }),
      renderCell: (params: GridCellParams<any, IWithdrawalResponse>) => (
        <Typography>{params.row.netAmount ? params.row.netAmount : 'N/A'}</Typography>
      ),
      sortComparator: sortComparator,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <TextButton
          onClick={() =>
            onExportButtonClick({
              url: `/withdrawals`,
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
