import { isEmpty, isNull, isUndefined } from 'lodash';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Divider, Grid, Stack, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MainLayout from '../../../../../common/layout/main.layout';
import { BoxContainer, Heading32, StyledTableCell, StyledTableRow, Text14, TextHint } from '../../../../../common/styles';
import { Color } from '../../../../../theme';
import { ReactComponent as PrintIcon } from '../../../../../assets/invoice/print-icon.svg';
import { ReactComponent as FileDownloadIcon } from '../assets/file-download.svg';
import { useGetEarningInvoicesQuery } from '../services/invoice-center.api';
import { IInvoiceCenterResponse, Item } from '../interface/invoice-center-interface';
import { IDetailsQueryReturnType } from '../interface';
import RenderIf from '../../../../../common/components/render-if.component';
import Loader from '../../../../../common/components/loader.component';
import { onExportButtonClick, onPrintClickHandle } from '../utils/functions';
import { NumericFormat } from 'react-number-format';

function ItemTileMobile({ item, index }: { item: Item; index: number }) {
  return (
    <Box sx={{ padding: '16px', borderTop: index !== 0 ? '1px solid var(--line, #EAEAEA)' : undefined }}>
      <Typography sx={{ fontWeight: 700, mb: '16px' }}>
        {item.no}. {item.description}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>Qty</Typography>
          <NumericFormat
            value={item.quantity}
            thousandSeparator
            decimalScale={1}
            fixedDecimalScale
            displayType={'text'}
            style={{ fontSize: '12px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>Price(S$)</Typography>
          <NumericFormat
            value={item.price}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            displayType={'text'}
            style={{ fontSize: '12px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>Amount(S$)</Typography>
          <NumericFormat
            value={item.amount}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            displayType={'text'}
            style={{ fontSize: '12px' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function StatTileMobile({
  title,
  amount,
  prefix,
  sx,
}: {
  title: string;
  amount: string | number;
  prefix?: string;
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        borderTop: '1px solid var(--line, #EAEAEA)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
        ...sx,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>{title}</Typography>
      <NumericFormat value={amount} thousandSeparator decimalScale={2} fixedDecimalScale displayType={'text'} prefix={prefix} />
    </Box>
  );
}

const InvoiceDetails = () => {
  const params = useParams();
  const { data, error, isFetching } = useGetEarningInvoicesQuery<IDetailsQueryReturnType<IInvoiceCenterResponse>>({
    params: { join: 'items' },
    id: params.id,
  });

  const items = data && !isEmpty(data?.items) ? [...data.items] : [];

  const renderContent = () => {
    return (
      <>
        <Box
          className='print-hide'
          sx={{
            display: 'flex',
            justifyContent: { xs: 'start', sm: 'end' },
            width: '100%',
            alignItems: 'center',
            padding: { xs: '16px', sm: 'unset' },
          }}
        >
          <PrintIcon onClick={onPrintClickHandle} className='clickable' />
          <Divider orientation='vertical' variant='middle' sx={{ marginX: '16px', height: '24px', background: Color.line }} />
          <FileDownloadIcon
            className='clickable'
            onClick={() =>
              onExportButtonClick({
                url: `/earning-invoices`,
                defaultParams: { join: 'items', filter: `id||$eq||${params.id}` },
                newParams: {},
                exportType: 'pdf',
              })
            }
          />
        </Box>

        <BoxContainer className='print'>
          {/** Header */}
          <Box sx={{ mx: { xs: '16px', sm: 'unset' } }}>
            <Heading32>Invoice</Heading32>
            <Box sx={{ displahy: 'flex', flex: 1 }}>
              <Grid container columnSpacing={4} sx={{ marginY: '8px' }} direction={'column'}>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>Invoice number </TextHint>
                    <Text14 className='text-w700 padding-left-10'>{params.id}</Text14>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>Date of issue </TextHint>
                    <Text14 className='text-w700 padding-left-10'>{dayjs(data?.createdAt).format('MMM DD, YYYY')}</Text14>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>
                      {!isNull(data?.earning) ? 'Earning ID' : !isNull(data?.withdrawal) ? 'Withdrawal ID' : ''}{' '}
                    </TextHint>
                    <RenderIf value={!isNull(data?.earning)}>
                      <Link
                        to={`/account/financial-hub/earning/details/${data?.earning?.id}`}
                        className='text-w700 padding-left-10'
                      >
                        {data?.earning?.id}
                      </Link>
                    </RenderIf>
                    <RenderIf value={!isNull(data?.withdrawal)}>
                      <Link
                        to={`/account/financial-hub/withdrawal-details/${data?.withdrawal?.id}`}
                        className='text-w700 padding-left-10'
                      >
                        {data?.withdrawal?.id}
                      </Link>
                    </RenderIf>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/** Seller Info */}
          <Box
            sx={{
              mt: '24px',
              display: 'flex',
              mx: { xs: '16px', sm: 'unset' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: '16px', sm: 'unset' },
            }}
          >
            <Box sx={{ minWidth: 400 }}>
              <Stack spacing={1}>
                <TextHint className='text14 text-w700'>From</TextHint>
                <Text14 className='text-w700'>{data?.fromName}</Text14>
                <Text14>{data?.fromAddress}</Text14>
                <Text14>{data?.fromMobile}</Text14>
                <Link
                  to={`mailto:${data?.fromEmail}?subject=Enquiry for ${data?.id}`}
                  target='_blank'
                  style={{ fontWeight: 600 }}
                >
                  {data?.fromEmail}
                </Link>
              </Stack>
            </Box>
            <Box sx={{ minWidth: 400 }}>
              <Stack spacing={1}>
                <TextHint className='text14 text-w700'>To</TextHint>
                <Text14 className='text-w700'>{data?.toName}</Text14>
                <Text14>{data?.toAddress}</Text14>
                <Text14>{data?.toMobile}</Text14>
                <Link to={`mailto:${data?.toEmail}`} target='_blank' style={{ fontWeight: 600 }}>
                  {data?.toEmail}
                </Link>
              </Stack>
            </Box>
          </Box>
          {/** Table */}
          <Box sx={{ marginTop: '40px', display: { xs: 'none', sm: 'block' } }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <StyledTableRow className='no-background no-border border-top'>
                    <StyledTableCell>S/No</StyledTableCell>
                    <StyledTableCell align='left'>Description</StyledTableCell>
                    <StyledTableCell align='right'>Qty</StyledTableCell>
                    <StyledTableCell align='right'>Price (S$)</StyledTableCell>
                    <StyledTableCell align='right'>Amount (S$)</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(items)
                    ? items
                        .sort((a, b) => a.no - b.no)
                        .map((item) => (
                          <StyledTableRow className='no-border' key={item.id}>
                            <StyledTableCell component='th' scope='row'>
                              {item.no}
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                              <Text14>{item.description}</Text14>
                            </StyledTableCell>
                            <StyledTableCell align='right'>{item.quantity}</StyledTableCell>
                            <StyledTableCell align='right'>{item.price}</StyledTableCell>
                            <StyledTableCell align='right'>{item.amount}</StyledTableCell>
                          </StyledTableRow>
                        ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ width: '50%', marginLeft: 'auto' }}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <StyledTableRow className='no-border border-top'>
                      <StyledTableCell>
                        <Text14 className='text-w700'>Subtotal</Text14>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Text14>S${data?.subTotalAmount}</Text14>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow className='no-border border-top'>
                      <StyledTableCell>
                        <Text14 className='text-w700'>Discount </Text14>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Text14>-S${data?.discountAmount}</Text14>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow className='footer no-border border-top'>
                      <StyledTableCell>
                        <Text14 className='text-w700'>Total</Text14>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Text14 className='text-w700'>S${data?.totalAmount}</Text14>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <Box
            className={'print-hide'}
            sx={{
              marginTop: '40px',
              display: { xs: 'block', sm: 'none' },
              border: '1px solid var(--line, #EAEAEA)',
              borderRadius: '4px',
              mx: '16px',
            }}
          >
            {items &&
              items.sort((a, b) => a.no - b.no).map((item, index) => <ItemTileMobile key={item.no} item={item} index={index} />)}

            <StatTileMobile title={'Subtotal'} amount={data?.subTotalAmount} prefix={'S$'} />
            <StatTileMobile title={'Discount'} amount={data?.discountAmount} prefix={'- S$'} />
            <StatTileMobile
              title={'Total'}
              amount={data?.totalAmount}
              prefix={'S$'}
              sx={{ background: '#E9EEFD', '& span': { fontWeight: 700 } }}
            />
          </Box>
        </BoxContainer>
        <Box sx={{ width: '100%', mt: '24px' }}>
          <TableContainer>
            <Table>
              <TableBody>
                <StyledTableRow className='no-border border-top'>
                  <StyledTableCell>
                    <TextHint>
                      Invoice - {params.id} Issued {dayjs(data?.createdAt).format('MMM DD, YYYY')}
                    </TextHint>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <TextHint>Page 1 - 1</TextHint>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };

  const renderErrorMsg = () => {
    return <Text14 className='text-w700'>Earning invoice details not found against {params.id}.</Text14>;
  };

  return (
    <MainLayout
      pageTitle={params.id}
      breadcrumb={[
        { label: 'Dashboard', path: '/account' },
        { label: 'Financial hub', path: '/account/financial-hub' },
        { label: 'Invoice centre', path: '/account/financial-hub#tab=invoice-centre' },
        { label: 'Invoice details' },
      ]}
    >
      <RenderIf value={isFetching}>
        <Loader isLoading />
        Loading...
      </RenderIf>
      <RenderIf value={!isFetching && !isUndefined(data)}>{renderContent()}</RenderIf>
      <RenderIf value={error && isUndefined(data)}>{renderErrorMsg()}</RenderIf>
    </MainLayout>
  );
};

export default InvoiceDetails;
