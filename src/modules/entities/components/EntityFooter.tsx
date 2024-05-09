import React, { useCallback, useMemo } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { PrimaryButton } from '@/common/styles';
import { IEntity, Member } from '@/common/interface/entity-interface.ts';
import Modal from '@/common/components/modal.component.tsx';
import { useSetState } from 'react-use';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { useNavigate } from '@/router.ts';
import { useDeleteEntityMutation } from '@/redux/apis/marketplace.ts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.tsx';
import { identityUserInfoTempDataUpdated, selectedEntityUpdated, selectEntityFromManage } from '@/redux/reducers/authReducers.ts';
import { mediaUrlGenerator, showToast, ToastTypes } from '@/common/utils';
import { find } from 'lodash';
import { ReactComponent as InviteAddIcon } from '@/assets/icons/invite_add.svg';
import InviteMemberModal from '@/modules/entities/components/InviteMember.modal.tsx';

interface IEntityFooter {
  entity?: IEntity;
  members?: Member[];
}

function EntityFooter({ entity, members = [] }: IEntityFooter) {
  const navigate = useNavigate();
  const [{ isDelete, isInviteModal }, setState] = useSetState({
    isDelete: false,
    isInviteModal: false,
  });
  const dispatch = useAppDispatch();
  const { selectedEntity, user } = useAppSelector((state) => state.mainState.useInfo);
  const isIndividual = useMemo(() => !!entity?.profile.type.includes(companyProfiles.individual), [entity?.profile.type]);
  const isFreelance = useMemo(() => !!entity?.profile.type.includes(companyProfiles.freelancer), [entity?.profile.type]);
  const [DeleteEntity, { isLoading }] = useDeleteEntityMutation();
  const myRole = useMemo(() => find(user?.roles, (role) => role.entityId === entity?.uid), [entity?.uid, user]);
  const canDelete = useMemo(() => {
    if (isIndividual || entity?.status === 'VERIFIED') {
      return false;
    }

    // When only Admin is present and rejected
    if (!members?.some((m) => m.role === 'Owner')) {
      return true;
    }

    return myRole?.role === 'Owner';
  }, [entity?.status, isIndividual, members, myRole?.role]);

  const onVerifyOrUpdate = useCallback(() => {
    dispatch(selectedEntityUpdated(entity));
    if (isIndividual || isFreelance) {
      if (entity?.status !== 'DRAFT') {
        dispatch(
          identityUserInfoTempDataUpdated({
            data: {
              documentType: entity?.identity?.type,
              identificationNumber: entity?.identity?.detail?.code,
              identificationName: entity?.profile.detail.name,
              nationality: entity?.identity?.detail?.nationality,
              uid: entity?.uid,
              mainMedia: entity?.__mainIdentityMedia ? mediaUrlGenerator(entity.__mainIdentityMedia) : undefined,
              backMedia: entity?.__backIdentityMedia ? mediaUrlGenerator(entity.__backIdentityMedia) : undefined,
              selfieMedia: entity?.__selfieIdentityMedia ? mediaUrlGenerator(entity.__selfieIdentityMedia) : undefined,
            },
          }),
        );
      }
      navigate('/account/entities/verify-now/freelancer');
    } else {
      dispatch(
        identityUserInfoTempDataUpdated({
          data: entity,
          mainMedia: entity?.__mainIdentityMedia ? mediaUrlGenerator(entity.__mainIdentityMedia) : undefined,
          backMedia: entity?.__backIdentityMedia ? mediaUrlGenerator(entity.__backIdentityMedia) : undefined,
          selfieMedia: entity?.__selfieIdentityMedia ? mediaUrlGenerator(entity.__selfieIdentityMedia) : undefined,
          certMedia: entity?.__profileCertMedia ? mediaUrlGenerator(entity.__profileCertMedia) : undefined,
          step: 2,
          isSingapore: false,
        }),
      );

      navigate('/setup-organisation');
    }
  }, [dispatch, entity, isFreelance, isIndividual, navigate]);

  const onDelete = useCallback(() => {
    if (!entity?.uid) {
      return;
    }

    if (selectedEntity?.uid === entity.uid) {
      showToast('Please select different entity first.', ToastTypes.INFO);
      return;
    }

    DeleteEntity({ entityId: entity?.uid })
      .unwrap()
      .then(() => navigate(-1));
  }, [DeleteEntity, entity?.uid, navigate, selectedEntity?.uid]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: '8px',
        alignItems: 'center',
        width: '100%',
        px: '46px',
        pb: '46px',
      }}
    >
      <Box />
      <Box sx={{ display: 'flex', gap: '18px' }}>
        {entity?.status === 'DRAFT' && (
          <ButtonBase
            onClick={() => {
              navigate('/account/entities/verify-now/freelancer');
              dispatch(selectEntityFromManage(entity));
              dispatch(selectedEntityUpdated(entity));
            }}
            sx={{ bgcolor: '#E80D8B', padding: '10px 31px', borderRadius: '4px', color: '#fff', fontWeight: 600 }}
          >
            Verify now
          </ButtonBase>
        )}

        {((!['DRAFT', 'VERIFIED'].includes(entity?.status ?? '') && entity?.identity?.type === 'NONE') ||
          entity?.status === 'REJECTED') && (
          <PrimaryButton type={'button'} sx={{ padding: '8px 24px', justifySelf: 'end' }} onClick={onVerifyOrUpdate}>
            Update
          </PrimaryButton>
        )}

        {entity?.status === 'VERIFIED' && entity?.profile.type.includes(companyProfiles.business) && (
          <ButtonBase
            sx={{
              background: '#2752E7',
              padding: '10px 22px',
              borderRadius: '4px',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
            onClick={() => setState({ isInviteModal: true })}
          >
            <InviteAddIcon />
            <Typography sx={{ color: '#fff', fontWeight: 600 }}>Invite</Typography>
          </ButtonBase>
        )}
        {canDelete && (
          <ButtonBase
            sx={{ background: '#535B71', padding: '10px 22px', borderRadius: '4px', color: '#fff', fontWeight: 600 }}
            onClick={() => setState({ isDelete: true })}
          >
            Delete account
          </ButtonBase>
        )}
      </Box>

      <Modal
        isBottomSheet
        content={
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '14px', mb: '8px' }}>Delete {entity?.profile.detail.name}?</Typography>

            <Typography sx={{ mb: '10px' }}>
              Once deleted, all users within this organisation account will immediately lose access.
            </Typography>
            <Typography>
              By clicking{' '}
              <Typography component={'span'} sx={{ fontWeight: 700 }}>
                Delete
              </Typography>
              , you agree to our{' '}
              <Typography component={'span'} sx={{ fontWeight: 700 }}>
                Terms and conditions
              </Typography>{' '}
              and{' '}
              <Typography component={'span'} sx={{ fontWeight: 700 }}>
                Privacy policy.
              </Typography>
            </Typography>
          </Box>
        }
        isOpen={isDelete}
        onCancel={() => setState({ isDelete: false })}
        okBtnLabel={'Delete'}
        isRedPriButton={true}
        isLoading={isLoading}
        onOk={onDelete}
      />

      <InviteMemberModal isOpen={isInviteModal} onClose={() => setState({ isInviteModal: false })} uid={entity?.uid ?? ''} />
    </Box>
  );
}

export default EntityFooter;
