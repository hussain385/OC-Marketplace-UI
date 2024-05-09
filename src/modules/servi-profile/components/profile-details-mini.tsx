import { Box } from '@mui/material';
import React from 'react';
import UserProfileInfoView from './user-profile-info.view';
import { ALIGNMENT, AVATAR_SIZE, ATT_DISPLAY_STYLE } from '../interfaces';
import { SkillTags } from './skills.view';
import ProfileRatingInfo from './profile-rating-info.view';
import { CertificateTags } from './certificates.view';
import { AwardTags } from './awards.view';
import { Text14 } from '@/common/styles';
import { Color } from '@/theme';
import { IoLockClosedOutline } from 'react-icons/io5';

const ProfileDetailsMini = () => {
  return (
    <Box sx={{ marginY: '20px' }}>
      <UserProfileInfoView
        displayStyle={ATT_DISPLAY_STYLE.horizontal}
        alignment={ALIGNMENT.center}
        avatarSize={AVATAR_SIZE.medium}
        showJoiningDate
      />
      <div style={{ marginTop: '5px', marginBottom: '5px' }}>
        <ProfileRatingInfo
          colorTheme='green'
          tooltipText='Default rating is based on last 12 months. You can toggle to show life-time ratings.'
        />
      </div>
      <SkillTags style='plain' showHeading />
      <CertificateTags style='plain' showHeading />
      <AwardTags style='plain' showHeading />
      <Box sx={{ marginTop: '30px' }}>
        <IoLockClosedOutline style={{ width: '13px', height: '13px', color: Color.lightRed, display: 'inline-block' }} />
        <Text14 sx={{ color: Color.textGray7E, display: 'inline-block', marginLeft: '5px' }}>
          Your security is important to us. To protect your payment, transact only within the OPNCORP website
        </Text14>
      </Box>
    </Box>
  );
};
export default ProfileDetailsMini;
