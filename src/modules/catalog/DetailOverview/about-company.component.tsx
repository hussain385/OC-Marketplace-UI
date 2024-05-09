// @flow
import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { AboutCompanyLoading } from '../components/about-company-loading';
import UserProfileInfoView from '@/modules/servi-profile/components/user-profile-info.view';
import { IEntity } from '@/common/interface/entity-interface';
import { ALIGNMENT, ATT_DISPLAY_STYLE, AVATAR_SIZE } from '@/modules/servi-profile/interfaces';
import ProfileRatingInfo from '@/modules/servi-profile/components/profile-rating-info.view';
import { IoLockClosedOutline } from 'react-icons/io5';
import { Text14 } from '@/common/styles';
import { Color } from '@/theme';

type AboutCompanyComponentType = {
  entity: IEntity | undefined;
  serviceId: string;
};

export const AboutCompanyComponent = ({ entity, serviceId }: AboutCompanyComponentType) => {
  const navigate = useNavigate();
  // const { data } = useGetEntityInfoQuery(
  //   {
  //     entityId: companyInfo?.id ?? '',
  //     queryObject: {
  //       populate: [
  //         { path: '__services', match: { status: 'ENABLE' }, populate: ['__medias', '__plans'] },
  //         { path: '__awards', populate: ['__avatar'] },
  //         { path: '__employees', populate: ['__avatar'] },
  //         { path: '__logo' },
  //       ],
  //     },
  //   },
  //   { skip: !companyInfo?.id },
  // );

  if (!isUndefined(entity)) {
    return (
      <Box
        onClick={() => navigate(`/account/seller-profile/${entity?.id}?serviceId=${serviceId}`, { state: { id: entity?.id } })}
        id='about-company'
        sx={{ marginBlock: '2em', cursor: 'pointer' }}
      >
        <UserProfileInfoView
          displayStyle={ATT_DISPLAY_STYLE.horizontal}
          alignment={ALIGNMENT.left}
          avatarSize={AVATAR_SIZE.medium}
          entity={entity}
          showTypeBadge={false}
          showJoiningDate
        />
        <div style={{ marginTop: '5px', marginBottom: '5px' }}>
          <ProfileRatingInfo
            colorTheme='green'
            tooltipText='Default rating is based on last 12 months. You can toggle to show life-time ratings.'
            entity={entity}
          />
        </div>
        <Divider style={{ marginTop: '1.5em', marginBottom: '1.5em' }} />
        <Typography sx={{ wordWrap: 'break-word' }}>{entity?.profile.detail.about}</Typography>
        <Box sx={{ marginTop: '30px' }}>
          <IoLockClosedOutline style={{ width: '13px', height: '13px', color: Color.lightRed, display: 'inline-block' }} />
          <Text14 sx={{ color: Color.textGray7E, display: 'inline-block', marginLeft: '5px' }}>
            Your security is important to us. To protect your payment, transact only within the OPNCORP website
          </Text14>
        </Box>
      </Box>
    );
  }
  return <AboutCompanyLoading />;
};
