/* eslint-disable no-unused-vars */
import { isUndefined } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import MainLayout from '../../../../../common/layout/main.layout';
import { BorderdBoxContainer, StyledTableCell, StyledTableRow, Text14, TextHint } from '../../../../../common/styles';
import { AmountLabel, FHStatusLabel, WithdrawStatusInfo } from '../styles';
import { Color } from '../../../../../theme';
import { ReactComponent as PrintIcon } from '../../../../../assets/invoice/print-icon.svg';
import { ReactComponent as FileDownloadIcon } from '../assets/file-download.svg';
import { RenderIf } from '../../../../../common/components';
import { IWithdrawalResponse } from '../interface/withdrawal.interface';
import { useGetWithdrawalsQuery } from '../services/withdrawal.api';
import Loader from '../../../../../common/components/loader.component';
import { WITHDRAWAL_METHOD, WITHDRAWAL_STATUS } from '../utils/constants';
import { onExportButtonClick, onPrintClickHandle } from '../utils/functions';
import { NumericFormat } from 'react-number-format';

type DetailsQueryReturnType = { data: IWithdrawalResponse; error: FetchBaseQueryError; isFetching: boolean };

const WithdrawalDetails = () => {
  const params = useParams();
  const [detail, setDetail] = useState<IWithdrawalResponse | undefined>(undefined);
  const {
    data: response,
    isFetching,
    error,
  } = useGetWithdrawalsQuery<DetailsQueryReturnType>({ params: { join: 'items' }, id: params.id });

  useEffect(() => {
    if (isUndefined(detail) && !isUndefined(response)) {
      setDetail(response);
    }
  }, [detail, response]);

  const renderContent = () => {
    return (
      <Box
        className='print'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: { xs: '16px', sm: 'unset' },
          width: { xs: '100%', sm: '70%' },
          alignSelf: 'flex-start',
          marginTop: '40px',
        }}
      >
        <BorderdBoxContainer sx={{ borderRadius: 0, margin: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flex: 0.3, flexDirection: 'column' }}>
              <AmountLabel sx={{ letterSpacing: '-0.48px;', color: Color.price, fontWeight: '700' }}>
                S${detail?.netAmount}
              </AmountLabel>
              <Box sx={{ display: 'flex', width: '250px' }}>
                <TextHint className='text14 text-w700' sx={{ paddingRight: '8px' }}>
                  Withdrawal Status
                </TextHint>
                <FHStatusLabel className={WITHDRAWAL_STATUS[detail?.status as string]}>
                  {WITHDRAWAL_STATUS[detail?.status as string]}
                </FHStatusLabel>
              </Box>
            </Box>
            {/** Print and Download buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center' }} className='print-hide'>
              <PrintIcon onClick={onPrintClickHandle} className='clickable' />
              <Divider orientation='vertical' variant='middle' sx={{ marginX: '16px', height: '24px', background: Color.line }} />
              <FileDownloadIcon
                className='clickable'
                onClick={() =>
                  onExportButtonClick({
                    url: `/withdrawals`,
                    defaultParams: { join: 'items', filter: `id||$eq||${params.id}` },
                    newParams: {},
                    exportType: 'pdf',
                  })
                }
              />
            </Box>
          </Box>
          {/** Status info */}
        </BorderdBoxContainer>
        <RenderIf value={WITHDRAWAL_STATUS[detail?.status as string] === 'Requested'}>
          <WithdrawStatusInfo>
            Your withdrawal request is currently being reviewed and will be processed shortly.
          </WithdrawStatusInfo>
        </RenderIf>
        <RenderIf value={WITHDRAWAL_STATUS[detail?.status as string] === 'Processing'}>
          <WithdrawStatusInfo className={'processing'}>
            Your withdrawal request is now being processed and will be completed{' '}
            <Typography component={'span'}>within 7 business days.</Typography>
          </WithdrawStatusInfo>
        </RenderIf>
        {/** Table */}
        <TableContainer>
          <Table sx={{ minWidth: { xs: '50%', sm: 650 } }} aria-label='simple table'>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component='th' scope='row'>
                  <Text14 className='text-w700'>Withdrawal ID</Text14>
                </StyledTableCell>
                <StyledTableCell>{detail?.id}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component='th' scope='row'>
                  <Text14 className='text-w700'>Request time</Text14>
                </StyledTableCell>
                <StyledTableCell>
                  {dayjs(detail?.createdAt).format('hh:mm')} (UTC {dayjs(detail?.createdAt).format('Z')})
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Text14 className='text-w700'>Request date</Text14>
                </StyledTableCell>
                <StyledTableCell>{dayjs(detail?.createdAt).format('MMM DD, YYYY')}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Text14 className='text-w700'>Withdrawal method</Text14>
                </StyledTableCell>
                <StyledTableCell>{WITHDRAWAL_METHOD[detail?.withdrawMethod as string]}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Text14 className='text-w700'>Requested by</Text14>
                </StyledTableCell>
                <StyledTableCell>{detail?.createdBy}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Text14 className='text-w700'>Recipient details</Text14>
                </StyledTableCell>
                <StyledTableCell>
                  {detail?.bankAccount.accountName} <br /> {detail?.bankAccount.bankName}
                  <br /> {detail?.bankAccount.bankCode} <br /> {detail?.bankAccount.accountNumber}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Text14 className='text-w700'>Amount requested to withdraw</Text14>
                </StyledTableCell>
                <StyledTableCell>
                  <NumericFormat
                    value={detail?.grossAmount}
                    prefix={'S$'}
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    displayType={'text'}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Text14 className='text-w700'>Withdrawal fee</Text14>
                </StyledTableCell>
                <StyledTableCell>
                  <NumericFormat
                    value={detail?.feeAmount}
                    prefix={'-S$'}
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    displayType={'text'}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow className='footer'>
                <StyledTableCell>
                  <Text14 className='text-w700'>Net earnings</Text14>
                </StyledTableCell>
                <StyledTableCell>
                  <Text14 className='text-w700'>
                    <NumericFormat
                      value={detail?.netAmount}
                      prefix={'S$'}
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      displayType={'text'}
                    />
                  </Text14>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  const renderErrorMsg = () => {
    return <Text14 className='text-w700'>Withdrawal details not found against {params.id}.</Text14>;
  };

  return (
    <MainLayout
      pageTitle={params.id}
      breadcrumb={[
        { label: 'Dashboard', path: '/account' },
        { label: 'Financial hub', path: '/account/financial-hub' },
        { label: 'Withdrawal', path: '/account/financial-hub#tab=withdrawals' },
        { label: 'Withdrawal details' },
      ]}
    >
      <RenderIf value={isFetching}>
        <Loader isLoading />
        Loading...
      </RenderIf>
      <RenderIf value={!isFetching}>{renderContent()}</RenderIf>
      <RenderIf value={error && isUndefined(detail)}>{renderErrorMsg()}</RenderIf>
    </MainLayout>
  );
};

export default WithdrawalDetails;
