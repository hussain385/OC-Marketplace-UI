import React from 'react';
import { Box, Skeleton, SxProps, Typography } from '@mui/material';
import { CommonAvatar } from '@/common/components/name-avatar.component.tsx';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { EntityStatusOptions, ILogo } from '@/common/interface';

interface IEntityDetail {
  logo?: ILogo;
  name?: string;
  type?: string;
  isLoading?: boolean;
  avatarSx?: SxProps;
  headingSx?: SxProps;
  status?: EntityStatusOptions;
}

function EntityDetail({ logo, name, type, avatarSx, headingSx, isLoading, status }: IEntityDetail) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: '6px' }}>
        <Skeleton variant={'circular'} sx={{ width: '40px', height: '40px', ...avatarSx }} />
        <Box>
          <Skeleton
            variant={'text'}
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '220px',
              ...headingSx,
            }}
          />
          <Skeleton variant={'text'} sx={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 600, width: '80px' }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: '6px' }}>
      <CommonAvatar src={logo} label={name} sx={avatarSx} status={status} />
      <Box>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: '220px',
            ...headingSx,
          }}
        >
          {name}
        </Typography>
        <Typography sx={{ color: '#BFBFBF', fontSize: '12px', fontWeight: 600 }}>
          {type ? (type.includes(companyProfiles.business) ? 'Registered business' : 'Non-registered business') : ''}
        </Typography>
      </Box>
    </Box>
  );
}

export default EntityDetail;
