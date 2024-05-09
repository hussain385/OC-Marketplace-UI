import { isEmpty, isNil, isUndefined } from 'lodash';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Divider, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MainLayout from '../../../../../common/layout/main.layout';
import {
  BoxContainer,
  StatusLabel,
  StyledTableCell,
  StyledTableRow,
  Text14,
  Text20,
  TextHint,
} from '../../../../../common/styles';
import { AmountLabel, FHStatusLabel } from '../styles';
import { Color } from '../../../../../theme';
import { RenderIf } from '../../../../../common/components';
import Loader from '../../../../../common/components/loader.component';
import { EARNING_STATUS } from '../utils/constants';
import { IEarningResponse } from '../interface/earning.interface';
import { useGetEarningsQuery } from '../services/earning.api';
import { displayCategorySubcateogry, onExportButtonClick, onPrintClickHandle } from '../utils/functions';
import { ReactComponent as PrintIcon } from '../../../../../assets/invoice/print-icon.svg';
import { ReactComponent as FileDownloadIcon } from '../assets/file-download.svg';
import { IDetailsQueryReturnType } from '../interface';
import { NumericFormat } from 'react-number-format';
import useMediaBreakpoint from '../../../../../common/components/breakpoint.tsx';

const Message: { [key: string]: React.ReactNode } = {
  3000: (
    <Box sx={{ bgcolor: '#EFE9FF', padding: '8px 16px', borderRadius: '2px', mt: '24px' }}>
      <Typography sx={{ fontWeight: 500 }}>
        Great news! Your earnings are on the way and will be available for withdrawal within{' '}
        <Typography component={'span'} sx={{ fontWeight: 700 }}>
          47 hours and 10 minutes.
        </Typography>
      </Typography>
    </Box>
  ),
  3002: (
    <Box sx={{ bgcolor: '#F1E0EA', padding: '8px 16px', borderRadius: '2px', mt: '24px' }}>
      <Typography sx={{ fontWeight: 500 }}>
        We&apos;re reviewing a dispute for this order, and your earnings from it are temporarily on hold. We&apos;ll keep you
        posted.
      </Typography>
    </Box>
  ),
  3003: (
    <Box sx={{ bgcolor: '#E9E9E9', padding: '8px 16px', borderRadius: '2px', mt: '24px' }}>
      <Typography sx={{ fontWeight: 500 }}>
        We&apos;re sorry, this order has been voided. As a result, your earnings from it have been reversed.
      </Typography>
    </Box>
  ),
};

function EarningDetailMobileView({ earning }: { earning: IEarningResponse }) {
  return (
    <Box
      className='print'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: { xs: '16px', sm: 'unset' },
        width: { xs: '100%', sm: '70%' },
        alignSelf: 'flex-start',
      }}
    >
      <Box className='print-hide' sx={{ display: 'flex', justifyContent: 'end', width: '100%', alignItems: 'center' }}>
        <PrintIcon onClick={onPrintClickHandle} className='clickable' />
        <Divider orientation='vertical' variant='middle' sx={{ marginX: '16px', height: '24px', background: Color.line }} />
        <FileDownloadIcon
          className='clickable'
          onClick={() =>
            onExportButtonClick({
              url: `/earnings`,
              defaultParams: { join: 'items', filter: `id||$eq||${earning.id}` },
              newParams: {},
              exportType: 'pdf',
            })
          }
        />
      </Box>

      <Text20 sx={{ fontSize: '16px', mb: '24px' }}>
        {displayCategorySubcateogry(earning.order.metadata.categories, ' - ')}
      </Text20>

      <NumericFormat
        value={earning.netAmount}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        displayType={'text'}
        style={{ fontSize: '24px', fontWeight: '700' }}
        prefix={'S$'}
      />
      <Box sx={{ mt: '8px', display: 'flex', gap: '6px', mb: '16px' }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#7E7E7E' }}>Earning status:</Typography>
        <FHStatusLabel className={EARNING_STATUS[earning.status as string]}>
          {EARNING_STATUS[earning.status as string]}
        </FHStatusLabel>
      </Box>

      <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', mb: '24px' }}>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#7E7E7E' }}>Order ID:</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{earning.order.id}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#7E7E7E' }}>Order date:</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
            {dayjs(earning.order.createdAt).format('MMM DD, YYYY')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#7E7E7E' }}>Delivery date:</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
            {dayjs(earning.order.deliveryAt).format('MMM DD, YYYY')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#7E7E7E' }}>Release date:</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
            {earning.releasedAt ? dayjs(earning.releasedAt).format('MMM DD, YYYY') : 'NULL'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#7E7E7E' }}>Purchased by:</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{earning.order.buyerEntityName}</Typography>
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #EAEAEA', p: '16px', display: 'flex', gap: '16px' }}>
        {earning.items.map((item, index) => (
          <Box key={item?.id} sx={{ borderBottom: earning.items.length === index + 1 ? '' : '1px solid #EAEAEA' }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 600, mb: '4px', color: '#7E7E7E' }}>
              {displayCategorySubcateogry(earning.order.metadata.categories, ' - ')}
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: '8px' }}>
              {earning.order.metadata.plan.title} - {earning.order.metadata.service.name}
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 400, mb: '16px' }}>
              {earning.order.metadata.service.description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mb: '24px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Duration</Typography>
                <Typography>1 - {earning.order.metadata.plan.duration_max} days</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Unit code(S$)</Typography>
                <NumericFormat value={item?.price} thousandSeparator displayType={'text'} decimalScale={2} fixedDecimalScale />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Qty</Typography>
                <NumericFormat value={item?.quantity} thousandSeparator displayType={'text'} decimalScale={1} fixedDecimalScale />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Amount(S$)</Typography>
                <NumericFormat
                  value={item?.amount}
                  thousandSeparator
                  displayType={'text'}
                  decimalScale={2}
                  fixedDecimalScale
                  style={{ fontWeight: 700 }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          p: '16px',
          border: '1px solid #EAEAEA',
          borderTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>Gross earnings</Typography>
        <NumericFormat
          value={earning.grossAmount}
          thousandSeparator
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale
          style={{ fontWeight: 700 }}
          prefix={'S$'}
        />
      </Box>

      <Box
        sx={{
          p: '16px',
          border: '1px solid #EAEAEA',
          borderTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Service fee (
          {earning.serviceFee === 0 ? (
            <StatusLabel className='green' sx={{ marginLeft: '8px' }}>
              FREE
            </StatusLabel>
          ) : (
            <Typography component={'span'} sx={{ fontWeight: 'inherit' }}>
              {earning.serviceFeeRate * 100}%
            </Typography>
          )}
          )
        </Typography>

        <NumericFormat
          value={earning.serviceFee}
          thousandSeparator
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale
          style={{ fontWeight: 700 }}
          prefix={'-S$'}
        />
      </Box>

      <Box
        sx={{
          p: '16px',
          border: '1px solid #EAEAEA',
          borderTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Payment fee (
          {earning.paymentFee === 0 ? (
            <StatusLabel className='green' sx={{ marginLeft: '8px' }}>
              FREE
            </StatusLabel>
          ) : (
            <Typography component={'span'} sx={{ fontWeight: 'inherit' }}>
              {earning.paymentFeeRate * 100}%
            </Typography>
          )}
          )
        </Typography>

        <NumericFormat
          value={earning.paymentFee}
          thousandSeparator
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale
          style={{ fontWeight: 700 }}
          prefix={'-S$'}
        />
      </Box>

      <Box
        sx={{
          p: '16px',
          border: '1px solid #EAEAEA',
          borderTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#E9EEFD',
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>Net earnings</Typography>
        <NumericFormat
          value={earning.netAmount}
          thousandSeparator
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale
          style={{ fontWeight: 700 }}
          prefix={'S$'}
        />
      </Box>

      {!!earning.invoice && (
        <Box sx={{ marginTop: '24px', textAlign: 'right', fontSize: '14px' }}>
          <TextHint sx={{ display: 'inline' }}>*** An invoice for fee is issued here</TextHint>{' '}
          <Link to={`/account/financial-hub/invoice-details/${earning.invoice.id}`}>#{earning.invoice.id}</Link>
        </Box>
      )}
    </Box>
  );
}

const EarningDetails = () => {
  const params = useParams();
  const { xs } = useMediaBreakpoint();
  const { data, error, isFetching } = useGetEarningsQuery<IDetailsQueryReturnType<IEarningResponse>>({
    params: { join: ['invoice', 'items'] },
    id: params.id,
  });

  const renderContent = () => {
    return (
      <>
        <Box className='print-hide' sx={{ display: 'flex', justifyContent: 'end', width: '100%', alignItems: 'center' }}>
          <PrintIcon onClick={onPrintClickHandle} className='clickable' />
          <Divider orientation='vertical' variant='middle' sx={{ marginX: '16px', height: '24px', background: Color.line }} />
          <FileDownloadIcon
            className='clickable'
            onClick={() =>
              onExportButtonClick({
                url: `/earnings`,
                defaultParams: { join: 'items', filter: `id||$eq||${params.id}` },
                newParams: {},
                exportType: 'pdf',
              })
            }
          />
        </Box>
        <BoxContainer className='print'>
          {/** Header */}
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ displahy: 'flex', flex: 1 }}>
              <Text20>{displayCategorySubcateogry(data?.order.metadata.categories, ' - ')}</Text20>

              <Grid container columnSpacing={4} sx={{ marginY: '8px' }}>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>Order ID:</TextHint>
                    <Text14 className='text-w700'>#{data?.order.id}</Text14>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>Order date:</TextHint>
                    <Text14 className='text-w700'>{dayjs(data?.order.createdAt).format('MMM DD, YYYY')}</Text14>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>Delivery date:</TextHint>
                    <Text14 className='text-w700'>{dayjs(data?.order.deliveryAt).format('MMM DD, YYYY')}</Text14>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextHint className='text14 text-w700'>Purchased By:</TextHint>
                    <Text14 className='text-w700'>{data?.order.buyerEntityName}</Text14>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', flex: 0.3, flexDirection: 'column', alignItems: 'end' }}>
              <AmountLabel
                sx={{
                  letterSpacing: '-0.48px;',
                  color: EARNING_STATUS[data?.status as string] === 'Released' ? Color.price : '#000',
                  fontWeight: '700',
                }}
              >
                <NumericFormat
                  value={data?.netAmount}
                  thousandSeparator
                  displayType={'text'}
                  decimalScale={2}
                  fixedDecimalScale
                  prefix={'S$'}
                />
              </AmountLabel>
              <Box sx={{ display: 'flex' }}>
                <TextHint className='text14 text-w700'>Earning Status:</TextHint>
                <FHStatusLabel className={EARNING_STATUS[data?.status as string]}>
                  {EARNING_STATUS[data?.status as string]}
                </FHStatusLabel>
              </Box>
            </Box>
          </Box>

          {Message[data?.status as string]}

          {/** Table */}
          <Box sx={{ marginTop: '40px' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>S/No</StyledTableCell>
                    <StyledTableCell align='left'>Service name</StyledTableCell>
                    <StyledTableCell align='right'>Duration</StyledTableCell>
                    <StyledTableCell align='right'>Unit code(S$)</StyledTableCell>
                    <StyledTableCell align='right'>Qty</StyledTableCell>
                    <StyledTableCell align='right'>Amount (S$)</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(data?.items)
                    ? data?.items.map((item) => (
                        <StyledTableRow key={item?.id}>
                          <StyledTableCell component='th' scope='row'>
                            1
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            {data?.order.metadata.service.uid === item?.serviceId ? (
                              <>
                                <TextHint>{displayCategorySubcateogry(data?.order.metadata.categories, ' - ')}</TextHint>
                                <Text14 className='text-w700'>
                                  {data?.order.metadata.plan.title} - {data?.order.metadata.service.name}
                                </Text14>
                                {data?.order.metadata.service.description}
                              </>
                            ) : (
                              ''
                            )}
                          </StyledTableCell>
                          <StyledTableCell align='right'>1 - {data?.order.metadata.plan.duration_max} days</StyledTableCell>
                          <StyledTableCell align='right'>
                            <NumericFormat
                              value={item?.price}
                              thousandSeparator
                              displayType={'text'}
                              decimalScale={2}
                              fixedDecimalScale
                            />
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            <NumericFormat
                              value={item?.quantity}
                              thousandSeparator
                              displayType={'text'}
                              decimalScale={1}
                              fixedDecimalScale
                            />
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            <NumericFormat
                              value={item?.amount}
                              thousandSeparator
                              displayType={'text'}
                              decimalScale={2}
                              fixedDecimalScale
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : null}

                  <StyledTableRow>
                    <StyledTableCell align='right' colSpan={5}>
                      <Text14 className='text-w700'>Gross earning</Text14>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Text14 className='text-w700'>
                        <NumericFormat
                          value={data?.grossAmount}
                          thousandSeparator
                          displayType={'text'}
                          decimalScale={2}
                          fixedDecimalScale
                          prefix={'S$'}
                        />
                      </Text14>
                    </StyledTableCell>
                  </StyledTableRow>
                  <RenderIf value={EARNING_STATUS[data?.status as string] !== 'Voided'}>
                    <StyledTableRow>
                      <StyledTableCell align='right' colSpan={5}>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Text14 className='text-w700'>Service fee </Text14>
                          {data?.serviceFee === 0 ? (
                            <StatusLabel className='green' sx={{ marginLeft: '8px' }}>
                              FREE
                            </StatusLabel>
                          ) : (
                            <Text14 className='text-w700'>({data?.serviceFeeRate * 100}%)</Text14>
                          )}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Text14 className='text-w700'>
                          <NumericFormat
                            value={data?.serviceFee}
                            thousandSeparator
                            displayType={'text'}
                            decimalScale={2}
                            fixedDecimalScale
                            prefix={'-S$'}
                          />
                        </Text14>
                      </StyledTableCell>
                    </StyledTableRow>
                  </RenderIf>
                  <RenderIf value={EARNING_STATUS[data?.status as string] !== 'Voided'}>
                    <StyledTableRow>
                      <StyledTableCell align='right' colSpan={5}>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Text14 className='text-w700'>Payment fee </Text14>
                          {data?.paymentFee === 0 ? (
                            <StatusLabel className='green' sx={{ marginLeft: '8px' }}>
                              FREE
                            </StatusLabel>
                          ) : (
                            <Text14 className='text-w700'>({data?.paymentFeeRate * 100}%)</Text14>
                          )}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Text14 className='text-w700'>
                          <NumericFormat
                            value={data?.paymentFee}
                            thousandSeparator
                            displayType={'text'}
                            decimalScale={2}
                            fixedDecimalScale
                            prefix={'-S$'}
                          />
                        </Text14>
                      </StyledTableCell>
                    </StyledTableRow>
                  </RenderIf>
                  <RenderIf value={EARNING_STATUS[data?.status as string] === 'Voided'}>
                    <StyledTableRow>
                      <StyledTableCell align='right' colSpan={5}>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Text14 className='text-w700'>Voided amount </Text14>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Text14 className='text-w700'>
                          <NumericFormat
                            value={data?.grossAmount}
                            thousandSeparator
                            displayType={'text'}
                            decimalScale={2}
                            fixedDecimalScale
                            prefix={'-S$'}
                          />
                        </Text14>
                      </StyledTableCell>
                    </StyledTableRow>
                  </RenderIf>
                  <StyledTableRow className='footer'>
                    <StyledTableCell align='right' colSpan={5}>
                      <Text14 className='text-w700'>Net earnings</Text14>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Text14 className='text-w700'>
                        <NumericFormat
                          value={data?.netAmount}
                          thousandSeparator
                          displayType={'text'}
                          decimalScale={2}
                          fixedDecimalScale
                          prefix={'S$'}
                        />
                      </Text14>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <RenderIf value={!isNil(data?.invoice)}>
            <Box sx={{ marginTop: '24px', textAlign: 'right', fontSize: '14px' }}>
              <TextHint sx={{ display: 'inline' }}>*** An invoice for fee is issued here</TextHint>{' '}
              <Link to={`/account/financial-hub/invoice-details/${data?.invoice?.id}`}>#EIV-OP-00000008</Link>
            </Box>
          </RenderIf>
        </BoxContainer>
      </>
    );
  };

  const renderErrorMsg = () => {
    return <Text14 className='text-w700'>Earning details not found against {params.id}.</Text14>;
  };

  return (
    <MainLayout
      pageTitle={params.id}
      breadcrumb={[
        { label: 'Dashboard', path: '/account' },
        { label: 'Financial hub', path: '/account/financial-hub' },
        { label: 'Earning details' },
      ]}
    >
      <RenderIf value={isFetching}>
        <Loader isLoading />
        Loading...
      </RenderIf>
      <RenderIf value={!isFetching && !isUndefined(data)}>
        {xs ? <EarningDetailMobileView earning={data} /> : renderContent()}
      </RenderIf>
      <RenderIf value={error && isUndefined(data)}>{renderErrorMsg()}</RenderIf>
    </MainLayout>
  );
};

export default EarningDetails;
