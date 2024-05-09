import React from 'react';
import { ActionButtonOutlined, ShadowBox } from '@/common/styles';
import { Color } from '@/theme';
import { Box } from '@mui/material';
import UserProfileInfoView from './user-profile-info.view';
import ProfileRatingInfo from './profile-rating-info.view';
import { ALIGNMENT, ATT_DISPLAY_STYLE } from '../interfaces';
import { SkillTags } from './skills.view';
import { IEntity } from '@/common/interface/entity-interface';

interface Props {
  data: IEntity | undefined;
}

const ProfileDetailCard = ({ data }: Props) => {
  return (
    <ShadowBox
      sx={{
        width: '283px',
        height: `${data!.skills.length > 0 ? '380px' : 'auto'}`,
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <UserProfileInfoView entity={data} displayStyle={ATT_DISPLAY_STYLE.vertical} alignment={ALIGNMENT.center} />
      {/**
       * Rating info
       */}
      <ProfileRatingInfo colorTheme='yellow' />
      <Box sx={{ marginY: '24px' }}>
        <ActionButtonOutlined sx={{ height: '44px' }}>View Profile</ActionButtonOutlined>
      </Box>
      <Box sx={{ borderTop: `1px solid ${Color.bgLine}`, paddingTop: '16px' }}>
        <SkillTags isStatic tags={data && data.skills} />
      </Box>
    </ShadowBox>
  );
};

export default ProfileDetailCard;
