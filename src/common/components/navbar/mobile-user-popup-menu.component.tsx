import React, { useMemo } from 'react';
import AvatarComponent from '@/common/components/navbar/avatar.component';
import { isEmpty, startCase } from 'lodash';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { mediaUrlGenerator } from '@/common/utils';
import { Color } from '@/theme';
import { AvatarLabel } from '@/common/styles';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';
import { useAppSelector } from '@/redux/hooks';
import { useGetEntityListQuery } from '@/redux/apis/marketplace';
import { useNavigate } from '@/router';
import { IEntity } from '@/common/interface/entity-interface';
import { styled as muiStyled } from '@mui/system';
import { BsPlus } from 'react-icons/bs';

type propType = {
  handlerSignOut: () => void;
  navigateAccountInfo: () => void;
  navigationVerification: () => void;
  onSelectEntity: (entity: IEntity) => void;
};

export const MuiButton = muiStyled(Button)(({ theme }) => ({
  width: '100%',
  color: 'black',
  justifyContent: 'flex-start',
}));

const MobileUserPopupMenuComponent = ({
  handlerSignOut,
  navigateAccountInfo,
  navigationVerification,
  onSelectEntity,
}: propType) => {
  const { user } = usePayloadUseInfo();
  const navigate = useNavigate();
  const { selectedEntity, selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const { data: entities } = useGetEntityListQuery(
    {
      params: { filter: `uid||$in||${user?.roles.map((r) => r.entityId).join(',')}`, populate: [{ path: '__logo' }] },
    },
    { skip: !user?.roles || isEmpty(user?.roles) },
  );

  const isIndividual = useMemo(
    () => !!selectedEntity?.profile?.type && selectedEntity.profile?.type.includes(companyProfiles.individual) === true,
    [selectedEntity],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <AvatarComponent />
        <Box>
          <Typography
            sx={{
              width: '100%',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'capitalize',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: '210px',
            }}
          >
            {selectedRole?.entityName}
          </Typography>
          <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: '12px',
                color: '#2CAF70',
              }}
            >
              {isIndividual ? 'Individual' : `Organisation`}
            </Typography>
            {!isIndividual && (
              <>
                <Box sx={{ width: '1px', background: '#EAEAEA', height: '12px' }} />
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '12px',
                    color: '#2CAF70',
                  }}
                >
                  {selectedRole?.role}
                </Typography>
              </>
            )}
          </Box>
          {!isIndividual && (
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '12px',
              }}
            >
              {user?.name}
            </Typography>
          )}
        </Box>
      </Box>
      <Divider sx={{ marginBlock: '8px' }} />
      {!isEmpty(user) && (
        <div>
          <MuiButton onClick={navigateAccountInfo}>Dashboard</MuiButton>
          {selectedEntity?.status && selectedEntity?.status === 'DRAFT' && (
            <>
              <Divider />
              <MuiButton onClick={navigationVerification}>Verify</MuiButton>
            </>
          )}
        </div>
      )}
      <Divider />
      <MuiButton sx={{ width: '100%' }} onClick={() => navigate('/account/entities')}>
        Manage business accounts
      </MuiButton>
      <Divider />
      {entities
        ?.filter((e) => e.uid !== selectedEntity?.uid)
        .map((entity) => {
          const entityIndividualCheck =
            !!entity?.profile?.type && entity.profile?.type.includes(companyProfiles.individual) === true;
          return (
            <MuiButton key={entity.id} onClick={() => onSelectEntity(entity)} sx={{ gap: '6px' }}>
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
                <Typography sx={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 600, width: 'fit-content' }}>
                  {entity?.profile?.type?.includes(companyProfiles.business) ? 'Organisation' : 'Individual'}
                </Typography>
              </Box>
            </MuiButton>
          );
        })}
      <MuiButton
        sx={{ width: '100%', color: Color.priBlue, alignItems: 'center' }}
        onClick={() => navigate('/setup-organisation')}
      >
        <BsPlus size={14} /> Add more business accounts
      </MuiButton>
      <Divider />
      <MuiButton sx={{ width: '100%' }} onClick={() => navigate('/account/profile/setting')}>
        Account settings
      </MuiButton>
      <Button sx={{ width: '100%', backgroundColor: '#F6F6F6', marginTop: '2em', color: 'black' }} onClick={handlerSignOut}>
        Log out
      </Button>
    </Box>
  );
};

export default MobileUserPopupMenuComponent;
