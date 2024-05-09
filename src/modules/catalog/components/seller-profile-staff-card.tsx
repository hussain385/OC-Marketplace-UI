// @flow
import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import moment from 'moment';
import { isNull, isUndefined } from 'lodash';
import { mediaUrlGenerator } from '../../../common/utils';

type StaffPropType = {
  staffDetail: any;
};

export const SellerProfileStaffCard = ({ staffDetail }: StaffPropType) => {
  let staffAvatarUrl = '';
  if (!isUndefined(staffDetail['__avatar']) && !isNull(staffDetail['__avatar'])) {
    staffAvatarUrl = mediaUrlGenerator(staffDetail['__avatar']);
  }
  return (
    <Box
      sx={{
        border: '1px solid #EAEAEA',
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        marginTop: '0.5em',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar src={staffAvatarUrl} style={{ width: '50px', height: '50px' }} />
        <Box sx={{ marginLeft: '16px' }}>
          <Typography sx={{ fontWeight: '700', fontSize: '16px', wordBreak: 'break-all' }}>{staffDetail.fullname}</Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '14px', color: '#7E7E7E', wordBreak: 'break-all' }}>
            {Number(moment().format('YYYY')) - Number(staffDetail.careerStartYear)} years of experience
          </Typography>
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '14px',
              wordBreak: 'break-all',
            }}
          >
            {staffDetail.title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
