import React, { useMemo } from 'react';
import MainLayout from '@/common/layout/main.layout.tsx';
import { Box, Typography } from '@mui/material';
import { useParams } from '@/router.ts';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';
import EntityDetail from '@/modules/entities/components/EntityDetail.tsx';
import EntityStatus from '@/modules/entities/components/EntityStatus.tsx';
import EntityInfo from '@/modules/entities/components/EntityInfo.tsx';
import EntityDataInfo from '@/modules/entities/components/EntityDataInfo.tsx';
import { RenderIf } from '@/common/components';
import InfoIcon from '@mui/icons-material/Info';
import { ReactComponent as PendingIcon } from '@/assets/icons/data-processing.svg';
import EntityFooter from '@/modules/entities/components/EntityFooter.tsx';
import { find } from 'lodash';
import { useAppSelector } from '@/redux/hooks.tsx';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { useGetFunctionalEmployeeQuery } from '@/redux/apis/teamManagementApi.ts';

function EntityDetailPage() {
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  const { uid } = useParams('/account/entities/:uid');
  const { data, isLoading } = useGetEntityInfoQuery({
    entityId: uid,
    queryObject: {
      populate: ['__logo', '__mainIdentityMedia', '__backIdentityMedia', '__selfieIdentityMedia', '__profileCertMedia'],
    },
  });
  const entity = useMemo(() => data?.data, [data?.data]);
  const { data: invitations } = useGetFunctionalEmployeeQuery({ xClientId: entity?.id }, { skip: !entity });
  const myRole = useMemo(() => find(user?.roles, (role) => role.entityId === entity?.uid), [entity?.uid, user]);

  return (
    <MainLayout
      pageTitle='Business account details'
      breadcrumb={[
        { label: 'Dashboard', path: '/account' },
        { label: 'Manage business accounts', path: '/account/entities' },
        { label: 'Business account details' },
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          width: '100%',
          justifyContent: 'center',
          mt: { xs: '8px', md: '32px' },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'start',
          paddingY: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            maxWidth: '807px',
            // padding: { xs: '32px 16px', md: '40px 56px' },
            flexDirection: 'column',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #EAEAEA',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'start',
              padding: '24px 46px',
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            <EntityDetail
              logo={entity?.__logo}
              type={entity?.profile.type}
              name={entity?.profile.detail.name}
              isLoading={isLoading}
              status={entity?.status}
            />

            {/* Status */}
            <Box sx={{ display: 'flex', gap: '6px' }}>
              {entity?.profile.type.includes(companyProfiles.business) ? (
                <Box
                  sx={{
                    bgcolor: '#D3E9FF',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#2E96FC',
                  }}
                >
                  Organisation
                </Box>
              ) : (
                <Box
                  sx={{
                    bgcolor: '#ECECEC',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#000',
                  }}
                >
                  Self
                </Box>
              )}
              <EntityStatus status={entity?.status} />
            </Box>
          </Box>

          <Box sx={{ px: '46px', py: '24px' }}>
            {/* Info Messages */}
            <RenderIf value={entity?.status === 'DRAFT'}>
              <Box
                sx={{
                  padding: '5px 16px',
                  display: 'flex',
                  gap: '4px',
                  borderRadius: '4px',
                  background: '#FFE9E8',
                  alignItems: 'center',
                  mb: '8px',
                }}
              >
                <InfoIcon sx={{ color: '#EC4C60', fontSize: '24px' }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'black', letterSpacing: '-0.5px' }}>
                  This account isn&apos;t verified yet. Kindly complete the necessary steps.
                </Typography>
              </Box>
            </RenderIf>
            <RenderIf value={entity?.status === 'PENDING'}>
              <Box
                sx={{
                  padding: '5px 16px',
                  display: 'flex',
                  gap: '4px',
                  borderRadius: '4px',
                  background: '#FFF6D1',
                  alignItems: 'center',
                  mb: '8px',
                }}
              >
                <PendingIcon style={{ fontSize: '24px' }} />
                <Typography sx={{ fontSize: '12px', fontWeight: 400, color: 'black', letterSpacing: '-0.5px' }}>
                  We’ll verify the info you provided within one working day and notify you via email once it’s done.
                </Typography>
              </Box>
            </RenderIf>
            <RenderIf value={entity?.status === 'REJECTED'}>
              <Box
                sx={{
                  padding: '5px 16px',
                  display: 'flex',
                  gap: '4px',
                  borderRadius: '4px',
                  background: '#FFE9E8',
                  alignItems: 'center',
                  mb: '8px',
                }}
              >
                <InfoIcon sx={{ color: '#EC4C60', fontSize: '24px' }} />
                <Typography sx={{ fontSize: '12px', fontWeight: 400, color: 'black', letterSpacing: '-0.5px' }}>
                  We hit a snag while verifying your entity; please review the details and resubmit.
                </Typography>
              </Box>
            </RenderIf>

            <EntityDataInfo entity={entity} />
          </Box>
          <RenderIf value={['Owner', 'Admin'].includes(myRole?.role ?? '')}>
            <EntityFooter entity={entity} members={invitations?.data} />
          </RenderIf>
        </Box>

        {/* Info Container */}
        <EntityInfo isFreelancerEntity={false} />
      </Box>
    </MainLayout>
  );
}

export default EntityDetailPage;
