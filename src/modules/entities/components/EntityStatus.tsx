import React from 'react';
import { EntityStatusOptions } from '@/common/interface';
import { Skeleton } from '@mui/material';
import { TagStatus } from '@/common/styles/tag-status.styles.tsx';

interface IEntityStatus {
  status?: EntityStatusOptions;
}

const statusMap: Record<EntityStatusOptions, React.ReactElement> = {
  VERIFIED: (
    <TagStatus variant={'success'} sx={{ fontSize: '10px', fontWeight: 600, bgcolor: '#C8FAE8', color: '#15C887' }}>
      Verified
    </TagStatus>
  ),
  DRAFT: (
    <TagStatus variant={'error'} sx={{ fontSize: '10px', fontWeight: 600, bgcolor: '#FCDFF0', color: '#E80D8B' }}>
      Unverified
    </TagStatus>
  ),
  REJECTED: (
    <TagStatus variant={'error'} sx={{ fontSize: '10px', fontWeight: 600 }}>
      Verification failed
    </TagStatus>
  ),
  PENDING: (
    <TagStatus variant={'info'} sx={{ fontSize: '10px', fontWeight: 600 }}>
      Pending verification
    </TagStatus>
  ),
  PROCESSING: (
    <TagStatus variant={'info'} sx={{ fontSize: '10px', fontWeight: 600 }}>
      Verifying
    </TagStatus>
  ),
  INVITING: (
    <TagStatus variant={'info'} sx={{ fontSize: '10px', fontWeight: 600 }}>
      Pending invitation
    </TagStatus>
  ),
} as const;

function EntityStatus({ status }: IEntityStatus) {
  if (!status) {
    return <Skeleton variant={'rectangular'} sx={{ width: '49px', height: '23px', borderRadius: '4px' }} />;
  }

  return statusMap[status];
}

export default EntityStatus;
