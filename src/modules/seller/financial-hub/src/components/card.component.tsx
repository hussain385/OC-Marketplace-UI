import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { Card, CurrenyLabel, SubHeading } from '../styles';
import { ReactComponent as Banner } from '../assets/man-using-laptop.svg';
import { PrimaryButton, TextHint } from '../../../../../common/styles';
import { IMenuItems } from '../../../../../common/interface';
import { DropDownMenuComponent } from '../../../../../common/components/dropdown-menu-component/dropdown-menu.component';
import { RenderIf } from '../../../../../common/components';
import DateRangeDropdown from '../../../../../common/components/daterange.component';
import { Link, useNavigate } from 'react-router-dom';
import WithdrawModal from './withdraw.modal';
import { Color } from '../../../../../theme';
import { useGetPayoutInfoQuery } from '../services/payout.api';

/**
 * Available Funds
 * @returns JSX Element
 */
type Props = {
  balance: number;
  pending: number;
  total: number;
  title: string;
  subtext: string;
  hint: string;
  note: string;
  onMenuItemClick?: (value: string) => void;
};
export const AvailableFunds = ({ balance, subtext, hint, title }: Partial<Props>) => {
  const [isModal, setIsModal] = useState(false);
  const { data } = useGetPayoutInfoQuery({});
  const navigation = useNavigate();

  return (
    <Box>
      <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
        {title ? title : 'Available funds'}
      </Typography>
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '20px' }}>
          <Box sx={{ minWidth: '158px' }}>
            <SubHeading>{subtext}</SubHeading>
            <Box sx={{ display: 'flex', marginTop: '24px', marginBottom: '8px' }}>
              <CurrenyLabel>S$</CurrenyLabel>
              <NumericFormat
                value={balance}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                displayType={'text'}
                style={{ fontSize: '24px', fontWeight: '700', color: Color.textBlack }}
              />
            </Box>
            <PrimaryButton
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: Color.priBlue,
                  opacity: 0.3,
                },
              }}
              onClick={() => {
                if (!data?.data || data?.data.length === 0) {
                  navigation('/account/financial-hub?setup=true#tab=payout-method');
                  return;
                }
                setIsModal(true);
              }}
              disabled={!balance || balance <= 0}
            >
              Withdraw now
            </PrimaryButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <Banner style={{ maxWidth: '240px', width: '100%', height: 'auto' }} />
          </Box>
        </Box>
        <Box>
          <TextHint>{hint}</TextHint>
        </Box>
        <Box>
          <Link to={'/account/financial-hub#tab=payout-method'}>Manage payout methods</Link>
        </Box>
      </Card>
      <WithdrawModal isOpen={isModal} onClose={() => setIsModal(false)} balance={balance ?? 0} />
    </Box>
  );
};

/**
 * Upcoming Earings
 * @returns JSX ELement
 */
export const UpcomingEarnings = ({ pending, subtext, hint, title, note }: Partial<Props>) => {
  return (
    <Box>
      <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
        {title ? title : 'Upcoming earnings'}
      </Typography>
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '20px' }}>
          <Box sx={{ flex: 1 }}>
            <SubHeading>{subtext}</SubHeading>
            <Box sx={{ display: 'flex', marginTop: '24px', marginBottom: '8px' }}>
              <CurrenyLabel>S$</CurrenyLabel>
              <NumericFormat
                value={pending}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                displayType={'text'}
                style={{ fontSize: '24px', fontWeight: '700', color: Color.textBlack }}
              />
            </Box>
            <TextHint sx={{ fontWeight: '600' }}>{note}</TextHint>
          </Box>
        </Box>
        <Box>
          <TextHint>* {hint}</TextHint>
        </Box>
      </Card>
    </Box>
  );
};

/**
 * Total Earning Card
 * @returns JSX Element
 */

export const TotalEarnings = ({ total, subtext, hint, title, note, onMenuItemClick }: Partial<Props>) => {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const filterItems: IMenuItems[] = [
    { name: 'All-time', value: 'all-time' },
    { name: 'This week', value: 'this-week' },
    { name: 'This month', value: 'this-month' },
    { name: 'This year', value: 'this-year' },
    //{ name: 'Custom', value: 'custom' },
  ];

  const onFilterMenuItemClick = (item: IMenuItems) => {
    if (item.value === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
    onMenuItemClick && onMenuItemClick(item.value);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '44px' }}>
        <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: '600' }}>
          {title ? title : 'Total earnings'}
        </Typography>
        <RenderIf value={!isCustom}>
          <DropDownMenuComponent
            menuItems={filterItems}
            onMenuItemClick={onFilterMenuItemClick}
            buttonOverrideStyle={{ border: 0 }}
          />
        </RenderIf>
        <RenderIf value={isCustom}>
          <DateRangeDropdown
            label='Custom'
            onClear={() => {
              setIsCustom(false);
            }}
          />
        </RenderIf>
      </Box>
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '20px' }}>
          <Box sx={{ flex: 1 }}>
            <SubHeading>{subtext}</SubHeading>
            <Box sx={{ display: 'flex', marginTop: '24px', marginBottom: '8px' }}>
              <CurrenyLabel>S$</CurrenyLabel>
              <NumericFormat
                value={total}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                displayType={'text'}
                style={{ fontSize: '24px', fontWeight: '700', color: Color.textBlack }}
              />
            </Box>
            <TextHint sx={{ fontWeight: '600' }}>{note}</TextHint>
          </Box>
        </Box>
        <Box>
          <TextHint>{hint}</TextHint>
        </Box>
      </Card>
    </Box>
  );
};
