import React from 'react';
import { IInvoiceCenterResponse } from '@/modules/seller/financial-hub/src/interface/invoice-center-interface.ts';
import { Box, Checkbox, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { onExportButtonClick } from '@/modules/seller/financial-hub/src/utils/functions.ts';
import { ReactComponent as DownloadIcon } from '../assets/download_icon.svg';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';
import { EARNING_INVOICE_TYPE } from '@/modules/seller/financial-hub/src/utils/constants.ts';
import { useNavigate } from '@/router.ts';

interface IInvoiceTileMobile {
  invoice: IInvoiceCenterResponse;
  isSelected?: boolean;
  onChange?: (select: boolean) => void;
}

function InvoiceTileMobile({ invoice, onChange, isSelected = false }: IInvoiceTileMobile) {
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
            onClick={() => navigate('/account/financial-hub/invoice-details/:id', { params: { id: invoice.id } })}
          >
            {invoice.id}
          </Typography>
        </Box>

        <DownloadIcon
          className='cursor'
          onClick={() => {
            onExportButtonClick({
              url: `/earning-invoices`,
              defaultParams: { join: 'items', filter: `id||$eq||${invoice.id}` },
              newParams: {},
              exportType: 'pdf',
            });
          }}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Date issued</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Amount</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '4px' }}>
          <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>{dayjs(invoice.createdAt).format('MMM D, YYYY')}</Typography>
          <NumericFormat
            value={invoice.totalAmount}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            displayType={'text'}
            style={{ fontSize: '14px', fontWeight: '700' }}
            prefix={'S$'}
          />
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Invoice type</Typography>
        <Typography>{EARNING_INVOICE_TYPE[invoice.type]}</Typography>
      </Box>

      <Box>
        <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Transaction ID</Typography>
        <Typography>{invoice.earning ? invoice.earning?.id : invoice.withdrawal ? invoice.withdrawal.id : 'N/A'}</Typography>
      </Box>
    </Box>
  );
}

export default InvoiceTileMobile;
