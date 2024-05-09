import dayjs from 'dayjs';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { activityDateLabelStyle, ActivityIcons, ActivityLabel, activityListStyles, ActivityVerticalLine } from './activity.style';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { ReactComponent as DocumentIcon } from '@/assets/order-icon/document.svg';
import { Color } from '@/theme';
import { ActivityConversation } from '@/modules/servi-order/interface';
import { mediaUrlGenerator } from '@/common/utils';
import { useAppSelector } from '@/redux/hooks.tsx';
import { getEntityByRole } from '@/modules/servi-order/Service/order.slice.ts';

interface IActivityConverstationView {
  activity: ActivityConversation;
}

export const ActivityConverstationView = ({ activity }: IActivityConverstationView) => {
  const entity = useAppSelector((state) => getEntityByRole(state, activity.data.by));

  const __renderAttachment = () => {
    if (activity.data.attachs.length > 0) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: '10px' }}>
          <ActivityIcons className='attachment'>{<DocumentIcon />}</ActivityIcons>
          {activity.data.attachs.map((attachment, index: number) => (
            <Link
              key={index}
              href={mediaUrlGenerator(attachment)}
              target='_blank'
              sx={{ color: Color.priBlue, marginLeft: '5px', fontSize: '14px' }}
            >
              Download attachment
            </Link>
          ))}
        </Box>
      );
    }
  };

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <NameOrPictureAvatar
            url={entity?.profile.detail.logo ? mediaUrlGenerator(entity?.profile.detail.logo) : undefined}
            name={entity?.profile.detail.name}
            style={{
              width: '32px',
              height: '32px',
            }}
          />
          <ActivityLabel>
            {entity?.profile.detail.name}
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>
      <ActivityVerticalLine sx={{ paddingTop: 0 }}>
        <div dangerouslySetInnerHTML={{ __html: activity.data.message }} style={{ fontSize: '14px' }} />
        {__renderAttachment()}
      </ActivityVerticalLine>
    </Box>
  );
};
