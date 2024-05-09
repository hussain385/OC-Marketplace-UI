import React, { useCallback, useMemo } from 'react';
import { isEmpty, isUndefined, startCase } from 'lodash';
import { Avatar, Box, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { AvatarLabel } from '@/common/styles';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { Path, useNavigate } from '@/router.ts';
import useValidateUser from '@/common/utils/hooks/useValidateUser';
import { selectedEntityUpdated, selectEntityFromManage, updateTempData } from '@/redux/reducers/authReducers';
import { useGlobalLogoutState } from '@/common/utils/global_state.util';
import LogoutModalComponent from '@/common/components/logout-popup.component';
import { mediaUrlGenerator } from '@/common/utils';
import { useGetEntityListQuery } from '@/redux/apis/marketplace.ts';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { baseApi, RtkTags } from '@/redux/baseAPI.ts';
import { BsPlus } from 'react-icons/bs';
import { resetChat } from '@/modules/communication/services';
import { socketManager } from '@/modules/communication';
import { useGetMyInvitationsQuery } from '@/redux/apis/teamManagementApi.ts';

type componentPropType = {
  anchorEl: any;
  open: boolean;
  handleClose: () => void;
};

const UserNavbarMenuComponent = ({ anchorEl, open, handleClose }: componentPropType) => {
  const { user } = usePayloadUseInfo();
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutModal, setLogout] = useGlobalLogoutState();
  const { data: pendingInvites } = useGetMyInvitationsQuery({ status: 'Pending' });
  const { data: entities } = useGetEntityListQuery(
    {
      params: { filter: `uid||$in||${user?.roles.map((r) => r.entityId).join(',')}`, populate: [{ path: '__logo' }] },
    },
    { skip: !user?.roles || isEmpty(user?.roles) },
  );
  const { businessEntities, individualEntity } = useMemo(() => {
    const index = entities?.findIndex((e) => e.profile.type.includes(companyProfiles.individual));

    if (entities) {
      return {
        individualEntity: index !== undefined && index !== -1 ? entities[index] : undefined,
        businessEntities: entities.filter((e) => !e.profile.type.includes(companyProfiles.individual)),
      };
    } else {
      return { individualEntity: undefined, businessEntities: undefined };
    }
  }, [entities]);
  const isFreelancerEntity = useMemo(
    () => !isUndefined(entities?.find((e) => e.profile.type.includes(companyProfiles.freelancer))),
    [entities],
  );

  const { navigateAccountInfo } = useValidateUser();

  const onSelectEntity = useCallback(
    (entity: IEntity) => {
      dispatch(selectedEntityUpdated(entity));
      socketManager.disconnect();
      dispatch(resetChat());
      dispatch(baseApi.util?.invalidateTags([...RtkTags]));
    },
    [dispatch],
  );

  const handlerSignout = () => {
    handleClose();
    setLogout(true);
    dispatch(updateTempData({}));
  };

  const navigationVerification = () => {
    if (selectedEntity) {
      navigate('/account/entities/verify-now/freelancer');
      dispatch(selectEntityFromManage(selectedEntity as IEntity));
    }
  };

  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open && !isEmpty(user)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20.6rem',
            borderRadius: 10,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!isEmpty(user) && (
          <div>
            <MenuItem sx={{ width: '100%', fontWeight: 600 }} onClick={navigateAccountInfo}>
              Dashboard
            </MenuItem>
            {selectedEntity?.status && selectedEntity?.status === 'DRAFT' && (
              <MenuItem sx={{ width: '100%', fontWeight: 600 }} onClick={navigationVerification}>
                Verify
              </MenuItem>
            )}
          </div>
        )}
        {individualEntity && <Divider sx={{ mt: '8px' }} />}
        {individualEntity && (
          <MenuItem
            onClick={() => selectedEntity?.uid !== individualEntity.uid && onSelectEntity(individualEntity)}
            sx={{ gap: '6px' }}
          >
            <Avatar
              src={individualEntity?.__logo ? mediaUrlGenerator(individualEntity.__logo) : ''}
              style={{ width: '35px', height: '35px', border: '1px solid #EEEEEE', backgroundColor: Color.priBlue }}
            >
              <AvatarLabel>{isEmpty(user?.name) ? 'N/A' : startCase(user?.name[0])}</AvatarLabel>
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: '220px',
                }}
              >
                {individualEntity.profile?.detail?.name}
              </Typography>
              <Typography sx={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 600 }}>Me</Typography>
            </Box>
          </MenuItem>
        )}
        <Divider style={{ marginTop: 0 }} />
        {((businessEntities ?? [])?.length > 0 || (pendingInvites ?? [])?.length > 0) && (
          <MenuItem sx={{ width: '100%', fontWeight: 600 }} onClick={() => navigate('/account/entities')}>
            Manage business accounts
          </MenuItem>
        )}
        {businessEntities?.map((entity) => {
          const entityIndividualCheck =
            !!entity?.profile?.type && entity.profile?.type.includes(companyProfiles.individual) === true;
          return (
            <MenuItem key={entity.id} onClick={() => onSelectEntity(entity)} sx={{ gap: '6px' }}>
              <Avatar
                src={entity?.__logo ? mediaUrlGenerator(entity.__logo) : ''}
                style={{ width: '35px', height: '35px', border: '1px solid #EEEEEE', backgroundColor: Color.priBlue }}
              >
                <AvatarLabel>
                  {entityIndividualCheck
                    ? isEmpty(user?.name)
                      ? 'N/A'
                      : startCase(user?.name[0])
                    : startCase(
                        entity?.profile?.detail && entity.profile?.detail?.name
                          ? entity.profile?.detail?.name[0]
                          : user
                            ? user.name[0]
                            : 'N/A',
                      )}
                </AvatarLabel>
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    maxWidth: '220px',
                  }}
                >
                  {entity.profile?.detail?.name}
                </Typography>
                <Typography sx={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 600 }}>
                  {entity?.profile?.type?.includes(companyProfiles.business) ? 'Registered business' : 'Non registered business'}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
        <MenuItem
          sx={{ width: '100%', color: Color.priBlue, alignItems: 'center', fontWeight: 600 }}
          onClick={() =>
            isFreelancerEntity ? navigate('/setup-organisation?isFreelancerEntity=true' as Path) : navigate('/setup-organisation')
          }
        >
          <BsPlus size={14} /> Add more business accounts
        </MenuItem>
        <Divider />
        <MenuItem sx={{ width: '100%', fontWeight: 600 }} onClick={() => navigate('/account/profile/setting')}>
          Account settings
        </MenuItem>
        <MenuItem sx={{ width: '100%', fontWeight: 600 }} onClick={handlerSignout}>
          Log out
        </MenuItem>
      </Menu>
      {logoutModal && <LogoutModalComponent />}
    </>
  );
};

export default UserNavbarMenuComponent;
