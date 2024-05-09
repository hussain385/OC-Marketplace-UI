import moment from 'moment';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { Text12, Text16 } from '@/common/styles';
import { RenderIf } from '@/common/components';
import { mediaUrlGenerator } from '@/common/utils';
import { ProfileStatus } from '../styles';
import { ATT_DISPLAY_STYLE, TAlignment, TAvatarSize, TAttributeDisplayType } from '../interfaces';
import { useAppSelector } from '@/redux/hooks';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { Color } from '@/theme';
import { IEntity } from '@/common/interface/entity-interface';

type Props = {
  displayStyle: TAttributeDisplayType;
  alignment: TAlignment;
  avatarSize: TAvatarSize;
  showJoiningDate?: boolean;
  entity?: IEntity;
  showTypeBadge?: boolean;
};

const UserProfileInfoView = ({
  displayStyle,
  alignment,
  avatarSize = 80,
  showJoiningDate = false,
  entity,
  showTypeBadge = true,
}: Partial<Props>) => {
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const data = useMemo(() => {
    const entityData = entity ? entity : selectedEntity;
    return {
      entity: entityData,
      pictureUrl: entityData!.profile.detail.logo ? mediaUrlGenerator(entityData!.profile.detail.logo) : undefined,
      entityType: entityData?.profile.type === companyProfiles.business ? 'Agency' : 'Freelancer',
      joiningDate: entityData?.createdAt ? moment(entityData?.createdAt).format('MMMM YYYY') : 'N/A',
    };
  }, [entity, selectedEntity]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: displayStyle === ATT_DISPLAY_STYLE.horizontal ? 'row' : 'column',
        alignItems: alignment,
      }}
    >
      <NameOrPictureAvatar
        name={selectedEntity?.profile!.detail.name}
        url={data.pictureUrl}
        style={{
          width: avatarSize,
          height: avatarSize,
          color: Color.priWhite,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          marginTop: '8px',
          flexDirection: 'column',
          marginLeft: displayStyle === ATT_DISPLAY_STYLE.horizontal ? '16px' : '',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Text16>{data?.entity?.profile!.detail.name}</Text16>
          <RenderIf value={!!data?.entity?.profile.type && showTypeBadge}>
            <ProfileStatus sx={{ marginLeft: '6px' }}>{data.entityType}</ProfileStatus>
          </RenderIf>
        </Box>
        <RenderIf value={!!showJoiningDate}>
          <Text12 sx={{ color: Color.textGray7E }}>Joined {data.joiningDate}</Text12>
        </RenderIf>
      </Box>
    </Box>
  );
};
export default UserProfileInfoView;
