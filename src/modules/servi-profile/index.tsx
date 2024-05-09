import { Box } from '@mui/material';
import React, { useState } from 'react';
import ProfileDetailCard from './components/profile-detail-card';
import ProfileDetailsMini from './components/profile-details-mini';
import MainLayout from '@/common/layout/main.layout';
import { Heading50, Text25 } from '@/common/styles';
import DropDownMenu from '@/common/components/dropdown-menu-component';
import './styles/find-talent.custom.style.css';
import { useGetEntityListQuery } from '@/redux/apis/marketplace';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { IMenuItems } from '@/common/interface';

const FindTalent = () => {
  const [entityType, setEntityType] = useState<string>(companyProfiles.freelancer);
  const { data: entities, isFetching } = useGetEntityListQuery({
    params: { s: JSON.stringify({ $and: [{ 'profile.type': { $eq: entityType } }, { status: { $eq: 'VERIFIED' } }] }), limit: 4 },
  });
  return (
    <MainLayout>
      {/* Heading */}
      <Box sx={{ textAlign: 'center' }}>
        <Heading50 variant='h3'>Hire top-tier talents</Heading50>
        <Text25>Tap into a pool of experts and professionals who can bring your ideas to life.</Text25>
      </Box>
      {/** Listing */}
      <Box>
        <Box sx={{ paddingY: '50px', width: '100%' }}>
          {/** Filter Dropdown */}
          <DropDownMenu
            label='Filter by'
            menuItems={[
              { name: 'Freelancer', value: companyProfiles.freelancer },
              { name: 'Agencies', value: companyProfiles.business },
              { name: 'Freelancer & Agencies', value: '' },
            ]}
            noTick
            onMenuItemClick={(e: IMenuItems) => setEntityType(e.value)}
          />
          {/** Listing */}
          <Box sx={{ marginTop: '18px', display: 'flex', gap: 5 }}>
            {!entities && isFetching
              ? 'Loading...'
              : entities && entities.map((entity) => <ProfileDetailCard key={entity.id} data={entity} />)}
            {!isFetching && entities?.length === 0 && 'No profile found'}
          </Box>

          {/**
           * Profile Details Mini
           */}
          <ProfileDetailsMini />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default FindTalent;
