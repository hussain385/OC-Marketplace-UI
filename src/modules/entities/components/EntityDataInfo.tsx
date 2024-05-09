import React, { useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

interface IEntityDataInfo {
  entity?: IEntity;
}

function EntityDataInfo({ entity }: IEntityDataInfo) {
  const isIndividual = useMemo(() => entity?.profile.type.includes(companyProfiles.individual), [entity?.profile.type]);
  const isFreelance = useMemo(() => entity?.profile.type.includes(companyProfiles.freelancer), [entity?.profile.type]);

  if (isIndividual || isFreelance) {
    return (
      <Box>
        <Typography sx={{ mb: '8px', fontWeight: 600, letterSpacing: '-0.56px', fontSize: '14px' }}>Registration info</Typography>
        <Grid container>
          <Tile label={'Full name'} value={entity?.profile.detail.name} />
          <Tile label={'Nationality'} value={entity?.identity?.detail?.nationality} />
          <Tile label={'ID number'} value={entity?.identity?.detail?.code} />
          <Tile label={'Street address'} value={entity?.identity?.detail?.address} />
          <Tile label={'Country'} value={entity?.identity?.detail?.country} />
          <Tile label={'State/Province'} value={entity?.identity?.detail?.state} />
          <Tile label={'City'} value={entity?.identity?.detail?.city} />
          <Tile label={'Postal code'} value={entity?.identity?.detail?.postalCode} />
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{ mb: '8px', fontWeight: 600, letterSpacing: '-0.56px', fontSize: '14px' }}>Registration info</Typography>
      <Grid container sx={{ mb: '16px' }}>
        <Tile label={'UEN'} value={entity?.profile.detail.registrationId} />
        <Tile label={'Entity name'} value={entity?.profile.detail.name} />
        <Tile label={'Entity type'} value={entity?.profile.detail.type} />
        <Tile label={'Entity address'} value={entity?.profile.detail?.address} />
        <Tile label={'UEN status'} value={entity?.status} />
      </Grid>

      {entity?.identity && (
        <>
          <Typography sx={{ mb: '8px', fontWeight: 600, letterSpacing: '-0.56px', fontSize: '14px' }}>
            Authorised officer’s info
          </Typography>
          <Grid container>
            <Tile label={'Full name'} value={entity?.identity?.detail?.fullname ?? entity?.identity?.detail?.ownerName} />
            <Tile label={'Nationality'} value={entity?.identity?.detail?.nationality} />
            <Tile label={'ID number'} value={entity?.identity?.detail?.code} />
            <Tile label={'Street address'} value={entity?.identity?.detail?.address} />
            <Tile label={'Country'} value={entity?.identity?.detail?.country} />
            <Tile label={'State/Province'} value={entity?.identity?.detail?.state} />
            <Tile label={'City'} value={entity?.identity?.detail?.city} />
            <Tile label={'Postal code'} value={entity?.identity?.detail?.postalCode} />
          </Grid>
        </>
      )}
    </Box>
  );
}

function Tile({ label, value }: { label: string; value?: string | number }) {
  if (!value) {
    return null;
  }

  return (
    <>
      <Grid
        item
        xs={3}
        sx={{ fontWeight: 700, fontSize: '12px', color: '#7E7E7E', letterSpacing: '-0.48px', lineHeight: '24px' }}
      >
        {label}
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          fontWeight: 700,
          fontSize: '12px',
          color: '#1D2130',
          letterSpacing: '-0.48px',
          lineHeight: '24px',
          wordBreak: 'break-word',
        }}
      >
        {value ?? '---'}
      </Grid>
    </>
  );
}

export default EntityDataInfo;
