import { Box, styled, Tab, Theme, Typography } from '@mui/material';
import React from 'react';

import { Color } from '../../../../theme';

// import UserFooter from '../../../common/components/user-footer.component';
import { TabPanelProps } from '../../../../common/interface';

import MainLayout from '../../../../common/layout/main.layout';

import BillingOrderList from './component/order-list.component';
import BillingPaymentList from '../payments';

type ThemeProps = {
  theme: Theme;
};

export const OrderStyledTab = styled(Tab)(({ theme }: ThemeProps) => ({
  textTransform: 'capitalize',
  fontSize: '14px',
  maxWidth: 'auto',
  letterSpacing: ' -0.5px',
  textAlign: 'left',
  '&.Mui-selected': {
    color: `${Color.priBlue} !important`,
    fontWeight: '700',
    fontSize: '14px',
    letterSpacing: '0',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    '&.Mui-selected': {
      fontSize: '14px',
      letterSpacing: '-1.12px',
    },
  },
  [theme.breakpoints.down(321)]: {
    fontSize: '12px',
    '&.Mui-selected': {
      fontSize: '12px',
    },
  },
}));

const BillingOrders = () => {
  const [value] = React.useState(0);
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <Box
        sx={{ width: { xs: '100%', sm: 'auto', md: 'auto' }, margin: '0 auto' }}
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
      </Box>
    );
  };

  /*
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  */

  return (
    <>
      <MainLayout
        headingShown
        pageTitle='Billing management'
        breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Billing management' }]}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '33px', letterSpacing: '-0.02em' }}>
            Billing management
          </Typography>
        </Box>

        <Box sx={{ width: '100%', mt: '16px' }}>
          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: Color.priBlue,
                  height: '4px',
                },
              }}
            >
              <OrderStyledTab label='Order management' />
            </Tabs>
          </Box> */}
          <Box>
            <TabPanel value={value} index={0}>
              <BillingOrderList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BillingPaymentList />
            </TabPanel>
          </Box>
        </Box>
      </MainLayout>
      {/* {value === 0 && (
        <Box sx={{ postion: 'relative' }}>
          <UserFooter customStyle={{ position: 'relative', bottom: '0' }} />
        </Box>
      )} */}
    </>
  );
};

export default BillingOrders;
