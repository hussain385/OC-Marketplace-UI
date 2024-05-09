import { useNavigate } from '@/router.ts';
import { Box, ButtonBase, Popover, Typography } from '@mui/material';
import EntityDetail from '@/modules/entities/components/EntityDetail.tsx';
import EntityStatus from '@/modules/entities/components/EntityStatus.tsx';
import React, { useMemo } from 'react';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { ReactComponent as IcInfoIcon } from '@/assets/icons/ic-info.svg';
import { ReactComponent as InviteAddIcon } from '@/assets/icons/invite_add.svg';
import { useSetState } from 'react-use';
import InviteMemberModal from '@/modules/entities/components/InviteMember.modal.tsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectedEntityUpdated, selectEntityFromManage } from '@/redux/reducers/authReducers';

interface IEntityTile {
  entity?: IEntity;
}

function EntityTile({ entity }: IEntityTile) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [{ isInviteModal, anchorEl }, setState] = useSetState({
    isInviteModal: false,
    anchorEl: null as SVGSVGElement | null,
  });
  const coords = useMemo(() => anchorEl?.getBoundingClientRect(), [anchorEl]);
  const user = useAppSelector((state) => state.mainState?.useInfo.user);
  const currentRole = useMemo(() => user?.roles.find((r) => r.entityId === entity?.uid), [entity?.uid, user?.roles]);
  const selectedEntity = useAppSelector((state) => state.mainState?.useInfo.selectedEntity);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '22px 24px',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid #EAEAEA',
        gap: '4px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
        {entity ? (
          <>
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
            <Box sx={{ display: 'flex', gap: '6px', alignItems: 'start', flexDirection: { xs: 'column', sm: 'row' } }}>
              {entity.profile.type.includes(companyProfiles.business) ? (
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
              <EntityStatus status={entity.status} />
              {entity.id === selectedEntity?.id && (
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
                  Current
                </Box>
              )}

              {entity.status === 'PENDING' && (
                <Box sx={{ mt: '-8px' }}>
                  <IcInfoIcon
                    ria-describedby={`verify-info-${entity.id}`}
                    style={{ cursor: 'pointer' }}
                    onClick={(event) => setState({ anchorEl: event.currentTarget })}
                  />
                  <Popover
                    anchorReference='anchorPosition'
                    id={`verify-info-${entity.id}`}
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={() => setState({ anchorEl: null })}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    anchorPosition={{
                      top: (coords?.top ?? 0) - 10,
                      left: (coords?.left ?? 0) + 80,
                    }}
                    PaperProps={{
                      sx: {
                        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.16) !important',
                        overflow: 'visible',
                        '&::before': {
                          backgroundColor: 'white',
                          content: '""',
                          display: { xs: 'none', md: 'block' },
                          position: 'absolute',
                          width: 12,
                          height: 12,
                          bottom: -6,
                          transform: 'rotate(45deg)',
                          left: 'calc(50% - 76px)',
                        },
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '12px', p: '10px 13px', maxWidth: '272px' }}>
                      Awaiting approval from your legal representative. Once approved, verification takes 24 hours.
                    </Typography>
                  </Popover>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <>
            <EntityDetail isLoading />

            {/* Status */}
            <Box sx={{ display: 'flex', gap: '6px' }}>
              <EntityStatus />
            </Box>
          </>
        )}
      </Box>

      {((entity?.status === 'DRAFT' && ['Admin', 'Owner'].includes(currentRole?.role ?? '')) ||
        entity?.status === 'INVITING') && (
        <ButtonBase
          onClick={() => {
            navigate(
              entity?.profile.type.includes(companyProfiles.business)
                ? '/account/entities/verify-now/company'
                : '/account/entities/verify-now/freelancer',
            );
            if (entity) {
              dispatch(selectEntityFromManage(entity));
              dispatch(selectedEntityUpdated(entity));
            }
          }}
          sx={{
            bgcolor: '#E80D8B',
            padding: { xs: '10px 20px', sm: '10px 31px' },
            borderRadius: '4px',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          Verify now
        </ButtonBase>
      )}

      {entity?.status === 'VERIFIED' &&
        ['Admin', 'Owner'].includes(currentRole?.role ?? '') &&
        entity?.profile.type.includes(companyProfiles.business) && (
          <ButtonBase
            sx={{
              background: '#2752E7',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              gap: '6px',
            }}
            onClick={() => setState({ isInviteModal: true })}
          >
            <InviteAddIcon />
            <Typography component={'span'} sx={{ color: '#fff', fontWeight: 600 }}>
              Invite member
            </Typography>
          </ButtonBase>
        )}

      <InviteMemberModal isOpen={isInviteModal} onClose={() => setState({ isInviteModal: false })} uid={entity?.uid ?? ''} />
    </Box>
  );
}

export default EntityTile;
