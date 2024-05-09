import { Box, Grid } from '@mui/material';
import React from 'react';
import UserProfileInfoView from '../user-profile-info.view';
import { ATT_DISPLAY_STYLE, ALIGNMENT, AVATAR_SIZE } from '../../interfaces';
import ProfileRatingInfo from '../profile-rating-info.view';
import { ActionButtonOutlined, BorderContainer, Text14 } from '@/common/styles';
import { Awards } from '../awards.view';
import { Skills } from '../skills.view';
import { Certificates } from '../certificates.view';
import EmploymentView from '../employment.view';
import { useAppSelector } from '@/redux/hooks';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { RenderIf } from '@/common/components';

const ProfileSideView = ({ entityId }: { entityId?: string }) => {
  const navigate = useNavigate();
  const { selectedRole, selectedEntity, user } = useAppSelector((state) => state.mainState.useInfo);
  const currentYear = moment().format('YYYY');
  const yoe = parseInt(currentYear) - parseInt(selectedEntity!.profile!.detail!.professionalStartYear!);

  const isMyOwnProfile = user?.roles.some((e) => e.entityId === entityId) as boolean;

  const onUpdateBtnClick = () => {
    if (selectedRole?.entityType === companyProfiles.individual) {
      navigate(`/account/my-profile`);
    } else {
      navigate(`/account/seller-profile/${selectedRole?.entityId}`);
    }
  };
  return (
    <div>
      <BorderContainer sx={{ width: '400px' }}>
        <UserProfileInfoView
          displayStyle={ATT_DISPLAY_STYLE.vertical}
          alignment={ALIGNMENT.center}
          avatarSize={AVATAR_SIZE.medium}
        />
        <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', width: '100%', justifyContent: 'center' }}>
          <ProfileRatingInfo
            colorTheme='green'
            tooltipText='Default rating is based on last 12 months. You can toggle to show life-time ratings.'
          />
        </div>
        <Grid container justifyContent='space-between'>
          <RenderIf value={[companyProfiles.freelancer, companyProfiles.individual].includes(selectedRole!.entityType!)}>
            <Grid item xs={6}>
              <Text14>Professional Experience</Text14>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Text14>{yoe} YOE</Text14>
            </Grid>
          </RenderIf>
          <RenderIf value={selectedRole?.entityType === companyProfiles.business}>
            <Grid item xs={6}>
              <Text14>Since</Text14>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Text14>{selectedEntity?.profile.detail.operationYear}</Text14>
            </Grid>
            <Grid item xs={6}>
              <Text14>Company staff</Text14>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Text14>{selectedEntity?.profile.detail.numberEmployees}</Text14>
            </Grid>
          </RenderIf>
        </Grid>
        <Box sx={{ marginY: '15px' }}>
          <ActionButtonOutlined sx={{ width: '100%', height: '44px' }} className='green' onClick={onUpdateBtnClick}>
            {isMyOwnProfile
              ? 'Update your profile'
              : `Contact ${selectedRole?.entityType === companyProfiles.business ? 'Provider' : 'me'}`}
          </ActionButtonOutlined>
        </Box>
        <Box sx={{ marginY: '10px' }}>
          <Text14>{selectedEntity?.profile.detail.about}</Text14>
        </Box>
      </BorderContainer>
      <BorderContainer>
        <Awards />
      </BorderContainer>
      <BorderContainer>
        <Skills />
      </BorderContainer>
      <BorderContainer>
        <Certificates />
      </BorderContainer>
      <BorderContainer>
        <EmploymentView isHeading />
      </BorderContainer>
    </div>
  );
};

export default ProfileSideView;
