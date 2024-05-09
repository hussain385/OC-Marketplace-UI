import React, { useCallback } from 'react';
import { Box, ButtonBase, Divider } from '@mui/material';
import EntityDetail from '@/modules/entities/components/EntityDetail.tsx';
import EntityStatus from '@/modules/entities/components/EntityStatus.tsx';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { useAcceptInvitationMutation } from '@/redux/apis/teamManagementApi.ts';
import { Role } from '@/common/interface/User.ts';
import { useNavigate } from '@/router.ts';

interface IEntityTileInvitation {
  entity: IEntity;
  invitation?: Role;
}

function EntityTileInvitation({ entity, invitation }: IEntityTileInvitation) {
  const [AcceptInvitation, { isLoading }] = useAcceptInvitationMutation();
  const navigate = useNavigate();

  const onAction = useCallback(
    (isAccept: boolean) => {
      AcceptInvitation({ invitationToken: invitation?.id ?? '', isAccept });
    },
    [AcceptInvitation, invitation?.id],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '22px 24px',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid #2752E7',
        backgroundColor: '#F4F7FF',
      }}
    >
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (entity) navigate('/account/entities/:uid', { params: { uid: entity.uid } });
          }}
        >
          <EntityDetail
            name={entity.profile.detail.name}
            type={entity.profile?.type}
            logo={entity?.__logo}
            status={entity.status}
          />
        </Box>

        {/* Status */}
        <Box sx={{ display: 'flex', gap: '6px' }}>
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
          <EntityStatus status={entity.status} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <ButtonBase
          sx={{
            background: '#2752E7',
            display: 'inline-flex',
            padding: '10px 27.5px',
            borderRadius: '4px',
            color: 'white',
            fontWeight: 600,
          }}
          disabled={isLoading}
          onClick={() => onAction(true)}
        >
          Accept
        </ButtonBase>
        <Divider orientation={'horizontal'} sx={{ borderWidth: '1px', borderColor: '#BBB', height: '17px' }} />
        <ButtonBase sx={{ color: '#2752E7', fontWeight: 600 }} disabled={isLoading} onClick={() => onAction(false)}>
          Reject
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default EntityTileInvitation;
