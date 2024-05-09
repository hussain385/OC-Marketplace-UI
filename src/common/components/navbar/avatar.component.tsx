import React, { useMemo } from 'react';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';
import { useAppSelector } from '@/redux/hooks';
import { mediaUrlGenerator } from '@/common/utils';
import { isEmpty, startCase } from 'lodash';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { Color } from '@/theme';
import { AvatarLabel } from '@/common/styles';
import { FaCircleExclamation } from 'react-icons/fa6';
import { Avatar, Badge, Box } from '@mui/material';
import { BiSolidCheckShield } from 'react-icons/bi';

const AvatarComponent = ({
  doNotShowBadge,
  src,
  avatarName,
}: {
  doNotShowBadge?: boolean;
  src?: string;
  avatarName?: string;
}) => {
  const { user } = usePayloadUseInfo();
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  const serviceImageUrl = useMemo(() => {
    if (selectedEntity?.__logo) {
      return mediaUrlGenerator(selectedEntity?.__logo);
    }
    return '';
  }, [selectedEntity?.__logo]);

  const isIndividual = useMemo(
    () => !!selectedEntity?.profile?.type.includes(companyProfiles.individual),
    [selectedEntity?.profile?.type],
  );

  return (
    <Badge
      overlap='circular'
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      badgeContent={
        selectedEntity?.status !== 'VERIFIED' ? (
          <Box sx={{ background: 'white', borderRadius: '30px', display: doNotShowBadge ? 'none' : undefined }}>
            <FaCircleExclamation color={'#FF6A68'} size={12} />
          </Box>
        ) : (
          <Box sx={{ background: 'white', borderRadius: '30px', display: doNotShowBadge ? 'none' : undefined }}>
            <BiSolidCheckShield size={12} color={'#15C887'} />
          </Box>
        )
      }
    >
      {!isEmpty(serviceImageUrl) || !isEmpty(src) ? (
        <Avatar
          src={!isEmpty(src) ? src : serviceImageUrl}
          style={{ width: '2em', height: '2em', border: '1px solid #EEEEEE' }}
        />
      ) : (
        <Avatar style={{ width: '2em', height: '2em', border: '1px solid #EEEEEE', backgroundColor: Color.priBlue }}>
          <AvatarLabel>
            {avatarName
              ? avatarName
              : isIndividual
              ? isEmpty(user?.name)
                ? 'N/A'
                : startCase(user?.name[0])
              : startCase(
                  selectedEntity?.profile.detail.name ? selectedEntity?.profile.detail.name[0] : user ? user.name[0] : 'N/A',
                )}
          </AvatarLabel>
        </Avatar>
      )}
    </Badge>
  );
};

export default AvatarComponent;
