import { Color } from '@/theme';
import { Box, Typography } from '@mui/material';
import { AccountInfoBox } from '@/common/styles/dashboard.styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import { ICard } from '@/common/constants';
import { useAppSelector } from '@/redux/hooks.tsx';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { ProfileType } from '@/common/interface/entity-interface.ts';

const DashboardRenderCard = ({
  value,
  onClick,
  isIndividual,
}: {
  value: ICard<ProfileType>;
  onClick: () => void;
  isIndividual: boolean;
}) => {
  const selectedRole = useAppSelector((state) => state.mainState.useInfo.selectedRole);
  const profileType = useAppSelector(
    (state) => state.mainState.useInfo?.selectedEntity?.profile.type ?? companyProfiles.individual,
  );

  return (
    <AccountInfoBox onClick={onClick} key={value.text1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: { xs: '5px', md: '0px' } }}>
        <img style={{ width: '32px', height: '32px' }} src={value.img} alt='profile' />
        {selectedRole && value.permission && !selectedRole.metadata.permissions.includes(value.permission) && (
          <Box
            sx={{
              backgroundColor: '#F6F6F6',
              borderRadius: '5px',
              padding: '0px 10px',
              display: { xs: 'none', md: 'flex' },
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <LockOutlinedIcon sx={{ color: Color.priRed, fontSize: '14px' }} />
            <Typography sx={{ color: '#FF6A68', fontSize: '12px' }}>Restricted</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography
            sx={{
              padding: { xs: '5px', sm: '16px 0 4px', md: '16px 0 4px' },
              fontSize: { xs: '14px', sm: '16px', md: '16px' },
              lineHeight: { xs: '16px', sm: '24px', md: '24px' },
              color: Color.textBlack,
            }}
            className='BoxText1'
          >
            {value.text1}
          </Typography>
          {isIndividual && (value.text1 === 'Team management' || value.text1 === 'Seller profile') && (
            <Box
              sx={{
                backgroundColor: '#F6F6F6',
                borderRadius: '5px',
                padding: '5px 10px',
                display: { xs: 'flex', md: 'none' },
                gap: '4px',
                alignItems: 'center',
              }}
            >
              <LockOutlinedIcon sx={{ color: Color.priRed, fontSize: '14px' }} />
              <Typography sx={{ color: '#FF6A68', fontSize: '12px' }}>Organisation only</Typography>
            </Box>
          )}
        </Box>
        <Typography
          sx={{ fontSize: { xs: '12px', sm: '14px', md: '14px', lineHeight: { xs: '16px', sm: '24px', md: '24px' } } }}
          className='BoxText2'
        >
          {typeof value.text2 === 'string' ? value.text2 : value.text2[profileType]}
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none' }, padding: '15px 0' }}>
        <img src={require('@/assets/icons/arrow_right.svg').default} alt='avatar' />
      </Box>
    </AccountInfoBox>
  );
};
export default DashboardRenderCard;
