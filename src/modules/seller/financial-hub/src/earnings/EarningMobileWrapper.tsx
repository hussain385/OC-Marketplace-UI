import React, { useEffect } from 'react';
import { IEarningResponse } from '@/modules/seller/financial-hub/src/interface/earning.interface.ts';
import { useList } from 'react-use';
import { Color } from '@/theme.ts';
import { Box, Checkbox, Typography } from '@mui/material';
import { ReactComponent as DownloadIcon } from '../assets/download_icon.svg';
import { useNavigate } from '@/router.ts';
import dayjs from 'dayjs';
import { FHStatusLabel } from '@/modules/seller/financial-hub/src/styles';
import { EARNING_STATUS } from '@/modules/seller/financial-hub/src/utils/constants.ts';
import { NumericFormat } from 'react-number-format';

interface IEarningMobileWrapper {
  earnings: IEarningResponse[];
  onSelectionChange: (selection: string[]) => void;
}

interface IEarningMobileTile {
  earning: IEarningResponse;
  onChange?: (select: boolean) => void;
  isSelected?: boolean;
}

function EarningMobileTile({ earning, onChange, isSelected }: IEarningMobileTile) {
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
            onClick={() => navigate('/account/financial-hub/earning/details/:id', { params: { id: earning.id } })}
          >
            {earning.id}
          </Typography>
        </Box>

        <DownloadIcon
          className='cursor'
          // onClick={() =>
          //   onExportButtonClick({
          //     url: `/withdrawals`,
          //     defaultParams: { join: 'items', filter: `id||$eq||${withdrawal.id}` },
          //     newParams: {},
          //     exportType: 'pdf',
          //   })
          // }
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Delivery date</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Earnings status</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '4px' }}>
          <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>{dayjs(earning.completedAt).format('MMM D, YYYY')}</Typography>
          <FHStatusLabel className={EARNING_STATUS[earning.status]}>{EARNING_STATUS[earning.status]}</FHStatusLabel>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: '4px' }}>Order</Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '14px', mb: '2px' }}>{earning.order.name}</Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#7E7E7E' }}>
          {earning.order.metadata.categories.map((c) => c.name).join(', ')}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: '4px' }}>Purchased by</Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{earning.order.buyerEntityName}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Actual amount</Typography>
        <NumericFormat
          value={earning.grossAmount}
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

function EarningMobileWrapper({ onSelectionChange, earnings }: IEarningMobileWrapper) {
  const [selected, { push, removeAt }] = useList<string>();

  useEffect(() => {
    onSelectionChange(selected);
  }, [onSelectionChange, selected]);

  return (
    <>
      {earnings.map((e, index) => (
        <EarningMobileTile
          key={e.id}
          earning={e}
          onChange={(s) => {
            if (s) {
              push(e.id);
            } else {
              removeAt(index);
            }
          }}
        />
      ))}
    </>
  );
}

export default EarningMobileWrapper;
