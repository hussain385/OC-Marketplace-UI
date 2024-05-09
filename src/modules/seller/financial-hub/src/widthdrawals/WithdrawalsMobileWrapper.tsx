import React, { useEffect } from 'react';
import { IWithdrawalResponse } from '@/modules/seller/financial-hub/src/interface/withdrawal.interface.ts';
import { Box, Checkbox, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { useList } from 'react-use';
import { useNavigate } from '@/router.ts';
import { onExportButtonClick } from '@/modules/seller/financial-hub/src/utils/functions.ts';
import { ReactComponent as DownloadIcon } from '../assets/download_icon.svg';
import { WITHDRAWAL_STATUS } from '@/modules/seller/financial-hub/src/utils/constants.ts';
import dayjs from 'dayjs';
import { FHStatusLabel } from '@/modules/seller/financial-hub/src/styles';
import { NumericFormat } from 'react-number-format';

interface IWithdrawalsMobileWrapper {
  withdrawals: IWithdrawalResponse[];
  onSelectionChange: (selection: string[]) => void;
}

interface IWithdrawalTile {
  withdrawal: IWithdrawalResponse;
  onChange?: (select: boolean) => void;
  isSelected?: boolean;
}

function WithdrawalTile({ withdrawal, onChange, isSelected }: IWithdrawalTile) {
  const navigate = useNavigate();

  return (
    <Box sx={{ borderTop: `1px solid ${Color.bgLine}`, padding: '16px', display: 'flex', gap: '12px', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Checkbox sx={{ p: 0 }} value={isSelected} onChange={(e) => onChange && onChange(e.target.checked)} />
          <Typography
            sx={{
              color: Color.priBlue,
              fontSize: '14px',
              fontWeight: 700,
            }}
            onClick={() => navigate('/account/financial-hub/withdrawal-details/:id', { params: { id: withdrawal.id } })}
          >
            {withdrawal.id}
          </Typography>
        </Box>

        <DownloadIcon
          className='cursor'
          onClick={() =>
            onExportButtonClick({
              url: `/withdrawals`,
              defaultParams: { join: 'items', filter: `id||$eq||${withdrawal.id}` },
              newParams: {},
              exportType: 'pdf',
            })
          }
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Request date</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Withdrawal status</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '4px' }}>
          <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>{dayjs(withdrawal.createdAt).format('MMM D, YYYY')}</Typography>
          <FHStatusLabel className={WITHDRAWAL_STATUS[withdrawal.status]}>{WITHDRAWAL_STATUS[withdrawal.status]}</FHStatusLabel>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: '4px' }}>Requested by</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>{withdrawal.createdBy}</Typography>
        </Box>

        <Box sx={{ textAlign: 'end' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: '4px' }}>Bank account</Typography>
          <Typography>****{withdrawal.bankAccount.accountNumber.slice(-4)}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: '4px' }}>Actual</Typography>
          <NumericFormat
            value={withdrawal.grossAmount}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            displayType={'text'}
            style={{ fontSize: '14px', fontWeight: '400' }}
            prefix={'S$'}
          />
        </Box>

        <Box sx={{ textAlign: 'end' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: '4px' }}>Fee</Typography>
          <NumericFormat
            value={withdrawal.feeAmount}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            displayType={'text'}
            style={{ fontSize: '14px', fontWeight: '400' }}
            prefix={'S$'}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Net</Typography>
        <NumericFormat
          value={withdrawal.netAmount}
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
          displayType={'text'}
          style={{ fontSize: '14px', fontWeight: '700', color: '#008144' }}
          prefix={'S$'}
        />
      </Box>
    </Box>
  );
}

function WithdrawalsMobileWrapper({ withdrawals, onSelectionChange }: IWithdrawalsMobileWrapper) {
  const [selected, { push, removeAt }] = useList<string>();

  useEffect(() => {
    onSelectionChange(selected);
  }, [onSelectionChange, selected]);

  return (
    <>
      {withdrawals.map((w, index) => (
        <WithdrawalTile
          key={w.id}
          withdrawal={w}
          onChange={(s) => {
            if (s) {
              push(w.id);
            } else {
              removeAt(index);
            }
          }}
        />
      ))}
    </>
  );
}

export default WithdrawalsMobileWrapper;
