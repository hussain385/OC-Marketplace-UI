import React, { useMemo, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { isEmpty, isNull, isUndefined } from 'lodash';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';
import { useAppSelector } from '@/redux/hooks';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import UserNavbarMenuComponent from '@/common/components/navbar/user-navbar-menu.component';
import { loginBtnStyles } from '@/common/styles/navbar.styles';
import { BiChevronDown } from 'react-icons/bi';
import AvatarComponent from '@/common/components/navbar/avatar.component';

const UserInfoDropdownComponent = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const { user } = usePayloadUseInfo();
  const { selectedRole, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  const isIndividual = useMemo(
    () =>
      !isUndefined(selectedRole) &&
      !isEmpty(selectedRole) &&
      selectedRole?.entityType !== null &&
      selectedRole?.entityType?.includes(companyProfiles.individual) === true,
    [selectedRole],
  );

  return (
    <>
      <Button
        onClick={(event: any) => setAnchorEl(event.currentTarget)}
        sx={{
          ...loginBtnStyles,
          color: '#2C3131',
          border: 'none',
        }}
      >
        <AvatarComponent />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '5px' }}>
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textTransform: 'none',
              fontSize: {
                xs: '12px',
                sm: '12px',
                md: '14px',
                fontWeight: 700,
              },
            }}
          >
            {isIndividual || isNull(selectedRole?.entityType)
              ? user
                ? user.name
                : ''
              : selectedEntity
              ? selectedEntity?.profile.detail.name
              : ''}
          </Typography>
          {!isNull(selectedRole?.entityType) && (
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textTransform: 'none',
                color: '#7E7E7E',
                fontSize: {
                  xs: '9px',
                  sm: '9px',
                  md: '10px',
                  fontWeight: 600,
                },
              }}
            >
              {isIndividual ? 'Me' : user ? user.name : ''}
            </Typography>
          )}
        </div>
        <BiChevronDown style={{ fontSize: '1.5em' }} />
      </Button>
      <UserNavbarMenuComponent handleClose={() => setAnchorEl(null)} open={open} anchorEl={anchorEl} />
    </>
  );
};

export default UserInfoDropdownComponent;
