import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import MainLayout from '../../../../../common/layout/main.layout';
import { OMTabs } from '../../../../../common/components/tabs/tabs.component';
import { OnTabChangeProps } from '../../../../../common/components/tabs/tabs.interface';
import TabPanel from '../../../../../common/components/tab-panel';
import Earnings from '../earnings';
import InvoiceCenter from '../invoice-center';
import Withdrawal from '../widthdrawals';
import PayoutMethod from '../payout';

const tabs: string[] = ['Earnings', 'Withdrawals', 'Invoice centre', 'Payout method'];

export const FinancialHubDashboard = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { hash } = useLocation();
  const breadcrumb = useMemo(() => {
    if (tabIndex === 0) {
      return [{ label: 'Dashboard', path: '/account' }, { label: 'Financial hub' }];
    }

    return [
      { label: 'Dashboard', path: '/account' },
      { label: 'Financial hub', path: '#tab=earnings' },
      { label: tabs[tabIndex] },
    ];
  }, [tabIndex]);

  const onTabChangeHandle = (value: OnTabChangeProps) => {
    setTabIndex(value.index);
    window.location.replace(`#tab=${tabs[value.index].replace(/\s/g, '-').toLowerCase()}`);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [tabIndex]);

  useEffect(() => {
    if (hash.match(/#tab/)) {
      const index = hash.split('=')[1];
      switch (index) {
        case 'earnings':
          setTabIndex(0);
          break;
        case 'withdrawals':
          setTabIndex(1);
          break;
        case 'invoice-centre':
          setTabIndex(2);
          break;
        case 'payout-method':
          setTabIndex(3);
          break;
        default:
          setTabIndex(0);
          break;
      }
    }
  }, [hash]);

  // if (selectedRole?.role === UserRole.Member) {
  //   return (
  //     <MainLayout pageTitle='Financial hub' breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Financial hub' }]}>
  //       <Box sx={{ margin: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //         <NotAllowedImage width={300} height={400} />
  //         <Typography sx={{ fontWeight: 700, fontSize: '20px !important', mt: '16px' }}>
  //           We’re sorry, but you don’t have access to this page
  //         </Typography>
  //         <Typography sx={{ fontWeight: 400, color: '#7E7E7E', mt: '8px' }}>
  //           Access is limited to your account’s admin/owner only. You may reach out to them for more info.
  //         </Typography>
  //         <PrimaryButton
  //           as={LinkBehavior}
  //           sx={{ mt: '16px', padding: '8px 40px', borderRadius: '4px', lineHeight: '26px' }}
  //           href={'/account'}
  //         >
  //           Back to dashboard
  //         </PrimaryButton>
  //       </Box>
  //     </MainLayout>
  //   );
  // }

  return (
    <MainLayout pageTitle='Financial hub' breadcrumb={breadcrumb}>
      <Box sx={{ width: '100%', marginTop: '15px' }}>
        <OMTabs tabs={tabs} activeTab={tabIndex} onTabChange={onTabChangeHandle} variant={'scrollable'} />
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%', marginY: '30px' }}>
        <TabPanel value={tabIndex} index={0}>
          <Earnings />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Withdrawal />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <InvoiceCenter />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <PayoutMethod />
        </TabPanel>
      </Box>
    </MainLayout>
  );
};
