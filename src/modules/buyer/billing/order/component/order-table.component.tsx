/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { ComponentProps } from 'react';

import { Box, Button, Stack, styled, Typography } from '@mui/material';

import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridComparatorFn,
  GridSelectionModel,
  gridStringOrNumberComparator,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { isEmpty } from 'lodash';

import { ReactComponent as EmptyOrder } from '../../../../../assets/order-icon/order_empty.svg';

import { Color, gridStyles } from '../../../../../theme';

import { isFilterStateOrder } from '../../../../../common/utils/global_state.util';

import { IInvoiceResponse, INVOICE_STATUS, Orders } from '../types';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { StatusLabel } from '../../../../../common/styles';

const DataGridCustomStyles = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': { backgroundColor: 'transparent !important' },
}));

const DataGriMobile = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': { display: 'none' },
  '& .MuiDataGrid-virtualScroller': { marginTop: '1rem !important', overflowY: 'auto !important' },
  '& .MuiDataGrid-virtualScrollerContent': { height: '100% !important', minHeight: '480px !important' },
  '& .MuiDataGrid-renderingZone': {
    maxHeight: 'none !important',
  },
  '& .MuiDataGrid-cell': {
    lineHeight: 'unset !important',
    maxHeight: 'none !important',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    padding: '0 0 1rem 0 !important',
  },
  '& .MuiDataGrid-row': {
    padding: '0 1rem 0 0 !important',
    maxHeight: 'none !important',
    marginBottom: '1.5rem',
    overflowY: 'auto',
  },
  virtualScrollerContent: {
    width: '100% !important',
    height: '100% !important',
    overflowY: 'scroll',
  },
}));

type Props = {
  rows: IInvoiceResponse[] | Orders[];
  waitingMessage: boolean;
  onRowSelection?: (model: GridSelectionModel) => void;
};

const OrderTableRow = ({ rows, waitingMessage, onRowSelection }: Props) => {
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const [isActiveState] = isFilterStateOrder();

  const navigate = useNavigate();

  const sortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
    return gridStringOrNumberComparator((v1 as any).name, (v2 as any).name, param1, param2);
  };

  const columns: GridColDef[] = [
    {
      field: 'order_date',
      headerName: 'Date',
      width: 100,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.createdAt,
      }),
      renderCell: (params: GridCellParams) => {
        return (
          <Label value={!isEmpty(params.row.createdAt) ? moment(params.row.createdAt).format('DD MMM YYYY').toString() : ''} />
        );
      },
      sortComparator: sortComparator,
    },
    {
      field: 'transaction_id',
      headerName: 'Transaction',
      width: 240,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.id,
      }),
      renderCell: (params: GridCellParams) => (
        <Label
          // eslint-disable-next-line no-console
          onClick={() => navigate(`/account/billing/invoice?id=${params.row.id}`)}
          customFontStyle={{
            color: Color.priBlue,
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '-0.5px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          value={params.row.id}
        />
      ),

      sortComparator: sortComparator,
    },
    {
      field: 'service_name',
      headerName: 'Service name',
      width: 360,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.order.sellerEntityName,
      }),
      renderCell: (params: GridCellParams) => (
        <Box>
          <Typography
            variant='h4'
            sx={{ color: '#1D2130', fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px', fontWeight: 600 }}
          >
            {params.row.order.metadata.service.name}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#7e7e7e', fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px', fontWeight: 600 }}
          >
            {params.row.order.metadata.categories.map((category: any, index: number) => {
              const separator = index + 1 !== params.row.order.metadata.categories.length ? ', ' : '';
              return `${category.name}${separator}`;
            })}
          </Typography>
        </Box>
      ),

      sortComparator: sortComparator,
    },
    {
      field: 'service_provider',
      headerName: 'Service provider',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.order.sellerEntityName,
      }),
      renderCell: (params: GridCellParams) => (
        <Label customStyle={{ overflow: 'auto', whiteSpace: 'pre-wrap' }} value={params.row.order.sellerEntityName} />
      ),

      sortComparator: sortComparator,
    },
    {
      field: 'order_status',
      headerName: 'Status',
      width: 100,
      valueGetter: (params: GridValueGetterParams) => ({
        name: INVOICE_STATUS[params.row.status],
      }),
      renderCell: (params: GridCellParams) => (
        <StatusLabel className={INVOICE_STATUS[params.row.status]}>{INVOICE_STATUS[params.row.status]}</StatusLabel>
      ),

      sortComparator: sortComparator,
    },
    {
      field: 'amount_due',
      headerName: 'Amount paid',
      width: 100,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.totalAmount,
      }),
      renderCell: (params: GridCellParams) => <Label value={'$'.concat(Math.floor(params.row.totalAmount).toString())} />,

      sortComparator: sortComparator,
    },
  ];

  const Label = ({
    value,
    customStyle,
    customFontStyle,
    children,
    ...props
  }: {
    value: string;
    customStyle?: React.CSSProperties;
    customFontStyle?: React.CSSProperties;
    children?: React.ReactNode;
  } & ComponentProps<typeof Box>) => {
    return (
      <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', ...customStyle }} {...props}>
        <Typography sx={{ ...customFontStyle }}>{value}</Typography>
        {children}
      </Box>
    );
  };

  const isOrder = waitingMessage ? 'Please wait' : <EmptyOrder />;

  function NoResultsOverlay() {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        {isActiveState === true ? 'No results found' : isOrder}
      </Stack>
    );
  }

  // const handlerSearch = (e: any) => {
  //   const arrData: any[] = [];
  //   if (e.target.value !== '') {
  //     rowData.filter((value) => value.orderId.indexOf(e.target.value) >= 0).map((value: any) => arrData.push(value));

  //     setRows(arrData);
  //   } else {
  //     setRows(rowData);
  //   }
  // };

  // mobile column
  const mobileColumn: GridColDef[] = [
    {
      field: 'order_value',
      headerName: '',
      width: 350,
      renderCell: (params: GridCellParams) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                padding: '0.5rem 0.9rem',
                background: '#f6f6f6',
                fontWeight: 600,
                letterSpacing: '-0.5px',
                fontSize: '0.75rem',
                color: Color.priBlue,
                borderRadius: '8px',
              }}
            >
              {params.row.order}
            </Box>
            <StatusLabel className={params.row.paymentStatus.toLowerCase()}>{params.row.paymentStatus}</StatusLabel>
            <Typography
              sx={{
                letterSpacing: '-0.5px',
                fontSize: '0.75rem',
                color: Color.textHint,
              }}
            >
              {!isEmpty(params.row.paymentDate)
                ? moment(params.row.paymentDate).format('DD MMM YYYY').toString()
                : 'Date not set'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '0.75rem', lineHeight: '24px' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, letterSpacing: '-0.5px', fontSize: '0.75rem', color: Color.textBlack }}>
                Service name
              </Typography>
              <Typography sx={{ fontWeight: 400, letterSpacing: '-0.5px', fontSize: '0.875rem', color: Color.textBlack }}>
                {params.row.serviceName}
              </Typography>
              <Typography sx={{ fontWeight: 600, letterSpacing: '-0.5px', fontSize: '0.875rem', color: Color.textHint }}>
                {params.row.serviceTitle}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 600, letterSpacing: '-0.5px', fontSize: '0.75rem', color: Color.textBlack }}>
                Service provider
              </Typography>
              <Typography sx={{ fontWeight: 600, letterSpacing: '-0.5px', fontSize: '0.75rem', color: Color.textBlack }}>
                Amount due
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 400, letterSpacing: '-0.5px', fontSize: '0.875rem', color: Color.textBlack }}>
                {params.row.serviceProvider}
              </Typography>
              <Typography sx={{ fontWeight: 600, letterSpacing: '-0.5px', fontSize: '0.875rem', color: Color.textBlack }}>
                ${Math.floor(params.row.dueAmount).toString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '1rem', gap: '10px' }}>
              <Button
                sx={{
                  background: Color.priBlue,
                  color: Color.priWhite,
                  flex: '1',
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  fontSize: '0.875rem',
                }}
              >
                Order Details
              </Button>
              <Button
                sx={{
                  background: '#f6f6f6',
                  color: Color.priBlue,
                  flex: '1',
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  fontSize: '0.875rem',
                }}
              >
                Export invoice
              </Button>
            </Box>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: '100%', height: !isEmpty(rows) ? 'auto' : '350px', position: 'relative' }}>
        {/* <input type='search' onChange={handlerSearch} /> */}
        <DataGridCustomStyles
          sortingOrder={['desc', 'asc']}
          autoHeight={!isEmpty(rows)}
          rowHeight={60}
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          disableSelectionOnClick
          checkboxSelection
          sx={gridStyles}
          onSelectionModelChange={(model) => {
            setSelectionModel(model);
            onRowSelection && onRowSelection(model);
          }}
          selectionModel={selectionModel}
          components={{
            NoRowsOverlay: NoResultsOverlay,
            Footer: () => null,
          }}
        />
        {/* <RoundedPagination /> */}
      </Box>
      {/*<Box sx={{ width: '100%', height: '100%', position: 'relative' }}>*/}
      {/*  <RenderIf value={xs}>*/}
      {/*    <DataGriMobile*/}
      {/*      sortingOrder={['desc', 'asc']}*/}
      {/*      autoHeight={!isEmpty(rows)}*/}
      {/*      rowHeight={60}*/}
      {/*      rows={rows}*/}
      {/*      columns={columns}*/}
      {/*      disableColumnFilter*/}
      {/*      disableColumnMenu*/}
      {/*      disableSelectionOnClick*/}
      {/*      checkboxSelection*/}
      {/*      sx={gridStyles}*/}
      {/*      onSelectionModelChange={(model) => {*/}
      {/*        setSelectionModel(model);*/}
      {/*        onRowSelection && onRowSelection(model);*/}
      {/*      }}*/}
      {/*      selectionModel={selectionModel}*/}
      {/*      components={{*/}
      {/*        NoRowsOverlay: NoResultsOverlay,*/}
      {/*        Footer: () => null,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </RenderIf>*/}
      {/*</Box>*/}
    </>
  );
};

export default OrderTableRow;

// https://codesandbox.io/s/jolly-roman-tw20g?file=/src/App.js:1323-1421
