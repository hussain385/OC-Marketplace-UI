import React, { useMemo } from 'react';
import MainLayout from '@/common/layout/main.layout.tsx';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks.tsx';
import EntityInfo from '@/modules/entities/components/EntityInfo.tsx';
import EntityTile from '@/modules/entities/components/EntityTile';
import { useGetEntityListQuery } from '@/redux/apis/marketplace.ts';
import { isEmpty, isUndefined } from 'lodash';
import EntityTileInvitation from '@/modules/entities/components/EntityTileInvitation.tsx';
import { useGetMyInvitationsQuery } from '@/redux/apis/teamManagementApi.ts';
import EmptyImage from '@/assets/common-images/empty.webp';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

function ManageEntitiesPage() {
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  const { data: pendingInvites } = useGetMyInvitationsQuery({ status: 'Pending' });
  const { data: entities } = useGetEntityListQuery(
    {
      params: {
        filter: `uid||$in||${user?.roles.map((r) => r.entityId).join(',')}`,
        populate: [
          { path: '__logo' },
          { path: '__mainIdentityMedia' },
          { path: '__backIdentityMedia' },
          { path: '__selfieIdentityMedia' },
          { path: '__proofOfResidenceMedias' },
        ],
      },
    },
    { skip: !user?.roles || isEmpty(user?.roles) },
  );
  const { data: pendingEntities } = useGetEntityListQuery(
    {
      params: {
        filter: `uid||$in||${pendingInvites?.map((r) => r.entityId).join(',')}`,
        populate: [
          { path: '__logo' },
          { path: '__mainIdentityMedia' },
          { path: '__backIdentityMedia' },
          { path: '__selfieIdentityMedia' },
          { path: '__proofOfResidenceMedias' },
        ],
      },
    },
    { skip: !user?.roles || isEmpty(pendingInvites) },
  );
  const filteredEntities = useMemo(
    () => entities?.filter((e) => !e.profile.type.includes(companyProfiles.individual)),
    [entities],
  );
  const isFreelancerEntity = useMemo(
    () => !isUndefined(entities?.find((e) => e.profile.type.includes(companyProfiles.freelancer))),
    [entities],
  );

  return (
    <MainLayout
      pageTitle='Manage business accounts'
      breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Manage business accounts' }]}
    >
      <Box sx={{ display: 'flex', gap: '30px', width: '100%', flexDirection: { xs: 'column', md: 'row' }, mt: '32px' }}>
        <Box sx={{ flex: 1 }}>
          {!isEmpty(pendingInvites) && pendingEntities && !isEmpty(pendingEntities) && (
            <Box sx={{ mb: '46px' }}>
              <Typography sx={{ alignSelf: 'start', fontSize: '14px', fontWeight: 400 }}>
                You’ve been invited to join the following:
              </Typography>
              <Box sx={{ mt: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pendingEntities.map((e) => (
                    <EntityTileInvitation entity={e} key={e.id} invitation={pendingInvites?.find((p) => p.entityId === e.uid)} />
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          <Typography sx={{ alignSelf: 'start', fontSize: '14px', fontWeight: 400 }}>Your existing account(s)</Typography>
          <Box sx={{ mt: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Entity Tile */}
              {entities ? (
                (filteredEntities?.length ?? 0) > 0 ? (
                  filteredEntities?.map((e) => <EntityTile key={e.id} entity={e} />)
                ) : (
                  <Box
                    sx={{ mx: 'auto', mt: '70px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}
                  >
                    <img src={EmptyImage} alt={'empty'} style={{ width: '66px', height: '66px' }} />
                    <Typography sx={{ color: '#BFBFBF', fontWeight: 600 }}>You have no business accounts yet</Typography>
                  </Box>
                )
              ) : (
                <>
                  <EntityTile />
                  <EntityTile />
                  <EntityTile />
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: '40px' }}>
          <EntityInfo isFreelancerEntity={isFreelancerEntity} />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default ManageEntitiesPage;
