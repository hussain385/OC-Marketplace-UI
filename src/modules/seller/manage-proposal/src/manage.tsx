// import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import MainLayout from '@/common/layout/main.layout';
import { OMTabs } from '@/common/components/tabs/tabs.component';
import { OnTabChangeProps } from '@/common/components/tabs/tabs.interface';
import TabPanel from '@/common/components/tab-panel';

import useQueryParams from '@/common/utils/hooks/useQueryParams';

import ActiveProposal from './active';
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/common/interface/User';
// import { ReactComponent as NotAllowedImage } from '../assets/not-allowed.svg';
import { PrimaryButton } from '@/common/styles';
import LinkBehavior from '@/common/components/LinkBehavior';
import { Proposal } from '../../financial-hub/src/interface/manage-proposal.interface';

const tabs: string[] = ['Active', 'Draft', 'Archieved'];

const proposals: Proposal[] = [
  {
    id: 1,
    requestTitle: 'Design a logo for startup company',
    requestStatus: 'Active', // Updated status
    offerAmount: 'SGD 220',
    deliveryTime: '2 Day Delivery',
    message: 'Thank you for getting in touch with me...',
  },
  {
    id: 2,
    requestTitle: 'Create a mobile app UI/UX design',
    requestStatus: 'Active', // Updated status
    offerAmount: 'SGD 450',
    deliveryTime: '5 Day Delivery',
    message: 'I’ve received your requirements...',
  },
  {
    id: 3,
    requestTitle: 'Develop a landing page for new product',
    requestStatus: 'Active', // Updated status
    offerAmount: 'SGD 300',
    deliveryTime: '3 Day Delivery',
    message: 'Your project has been completed!...',
  },
];

const draftProposals: Proposal[] = [
  {
    id: 4,
    requestTitle: 'Design an e-commerce website',
    requestStatus: 'Draft', // Example status
    offerAmount: 'SGD 500',
    deliveryTime: '7 Day Delivery',
    message: 'We have reviewed your project requirements...',
  },
  {
    id: 5,
    requestTitle: 'Develop a landing page for new product',
    requestStatus: 'Active', // Updated status
    offerAmount: 'SGD 300',
    deliveryTime: '3 Day Delivery',
    message: 'Your project has been completed!...',
  },
  {
    id: 6,
    requestTitle: 'Social media marketing strategy',
    requestStatus: 'Draft', // Example status
    offerAmount: 'SGD 400',
    deliveryTime: '15 Day Delivery',
    message: 'We’re pleased to inform you that...',
  },
  {
    id: 7,
    requestTitle: 'SEO Optimization for new website',
    requestStatus: 'Draft', // Example status
    offerAmount: 'SGD 350',
    deliveryTime: '10 Day Delivery',
    message: 'Our team is currently in the process...',
  },
];

const archievedProposals: Proposal[] = [
  {
    id: 7,
    requestTitle: 'Brand identity creation',
    requestStatus: 'Archived', // Example status
    offerAmount: 'SGD 600',
    deliveryTime: '12 Day Delivery',
    message: 'Thank you for considering our agency...',
  },
  {
    id: 8,
    requestTitle: 'Website content writing',
    requestStatus: 'Archived', // Example status
    offerAmount: 'SGD 250',
    deliveryTime: '4 Day Delivery',
    message: 'Content is king, and we understand...',
  },
  {
    id: 9,
    requestTitle: 'Custom CRM software development',
    requestStatus: 'Archived', // Example status
    offerAmount: 'SGD 800',
    deliveryTime: '30 Day Delivery',
    message: 'Developing a custom CRM tailored...',
  },
];

export const ManageProposalDashboard = () => {
  const [params] = useQueryParams();

  const { selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const breadcrumb = useMemo(() => {
    if (tabIndex === 0) {
      return [{ label: 'Dashboard', path: '/account' }, { label: 'Manage Proposal' }, { label: 'Active' }];
    }

    return [
      { label: 'Dashboard', path: '/account' },
      { label: 'Manage Proposal', path: '#tab=active' },
      { label: tabs[tabIndex] },
    ];
  }, [tabIndex]);

  const onTabChangeHandle = (value: OnTabChangeProps) => {
    setTabIndex(value.index);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [tabIndex]);

  useEffect(() => {
    if (params.get('tab')) {
      setTabIndex(Number(params.get('tab')));
    }
  }, [params.get('tab')]);

  if (selectedRole?.role === UserRole.Member) {
    return (
      <MainLayout pageTitle='Financial hub' breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Financial hub' }]}>
        <Box sx={{ margin: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* <NotAllowedImage width={300} height={400} /> */}
          <Typography sx={{ fontWeight: 700, fontSize: '20px !important', mt: '16px' }}>
            We’re sorry, but you don’t have access to this page
          </Typography>
          <Typography sx={{ fontWeight: 400, color: '#7E7E7E', mt: '8px' }}>
            Access is limited to your account’s admin/owner only. You may reach out to them for more info.
          </Typography>
          <PrimaryButton
            as={LinkBehavior}
            sx={{ mt: '16px', padding: '8px 40px', borderRadius: '4px', lineHeight: '26px' }}
            href={'/account'}
          >
            Back to dashboard
          </PrimaryButton>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle='Manage Proposal' breadcrumb={breadcrumb}>
      <Box sx={{ width: '100%', marginTop: '15px' }}>
        <OMTabs tabs={tabs} activeTab={tabIndex} onTabChange={onTabChangeHandle} variant={'scrollable'} />
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%', marginY: '30px' }}>
        <TabPanel value={tabIndex} index={0}>
          <ActiveProposal data={proposals} tab='Active' />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ActiveProposal data={draftProposals} tab='Draft' />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <ActiveProposal data={archievedProposals} tab='Archived' />
        </TabPanel>
      </Box>
    </MainLayout>
  );
};
