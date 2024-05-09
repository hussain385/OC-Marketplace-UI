// @flow
import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { isNull, isUndefined } from 'lodash';
import { mediaUrlGenerator } from '../../../common/utils';

type SellerAwardPropType = {
  awardDetail: any;
};

export const SellerProfileAwardCard = ({ awardDetail }: SellerAwardPropType) => {
  let awardAvatarUrl = '';
  if (!isUndefined(awardDetail['__avatar']) && !isNull(awardDetail['__avatar'])) {
    awardAvatarUrl = mediaUrlGenerator(awardDetail['__avatar']);
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
        <Avatar src={awardAvatarUrl} style={{ width: '50px', height: '50px' }} />
        <Box sx={{ marginLeft: '16px' }}>
          <Typography sx={{ fontWeight: '700', fontSize: '16px', wordBreak: 'break-all' }}>
            {awardDetail.name} <span style={{ fontWeight: '400' }}>- {awardDetail.year}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '14px', color: '#7E7E7E', wordBreak: 'break-all' }}>
            {awardDetail.issuer}
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '14px', wordBreak: 'break-all' }}>{awardDetail.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
