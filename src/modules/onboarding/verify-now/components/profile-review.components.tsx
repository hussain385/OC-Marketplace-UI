import React from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '@/theme';
import { isEmpty } from 'lodash';

import { GreyRoundedContainer } from '@/common/styles';

type componentPropType = {
  profileData?: { value: string; title: string }[];

  documents?: string;
};

const ProfileReview = ({ documents, profileData }: componentPropType) => {
  return (
    <div style={{ marginTop: '2em' }}>
      <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Identity registration info</Typography>
      <Box sx={{ marginBlock: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        {profileData?.map((identity, key) => {
          if (!isEmpty(identity.value)) {
            return (
              <div style={{ display: 'flex', gap: '1em', width: '100%', alignItems: 'center' }} key={key}>
                <Box sx={{ width: '35%' }}>
                  <Typography
                    sx={{
                      fontSize: '14px !important',
                      fontWeight: '600',
                      color: Color.bgGreyDark,
                    }}
                  >
                    {identity.title}
                  </Typography>
                </Box>
                <Box sx={{ width: '65%' }}>
                  <Typography
                    sx={{
                      fontSize: '14px !important',
                      fontWeight: '600',
                      wordWrap: 'break-word',
                    }}
                  >
                    {identity.value}
                  </Typography>
                </Box>
              </div>
            );
          }
        })}
      </Box>

      <Typography sx={{ fontSize: '16px', fontWeight: 600, marginBottom: '1em', marginTop: '2em' }}>
        Registration Certificate/other documents
      </Typography>
      <GreyRoundedContainer sx={{ justifyContent: 'flex-start', gap: '12px', marginTop: '1em' }}>
        <img alt={'file'} src={require('@/assets/icons/file.svg').default} />
        <Typography>{isEmpty(documents) ? 'No file uploaded' : documents}</Typography>
      </GreyRoundedContainer>
    </div>
  );
};

export default ProfileReview;
