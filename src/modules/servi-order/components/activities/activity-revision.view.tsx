import dayjs from 'dayjs';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import DetailCardView from '../detail-card';
import { ReactComponent as RevisionRequestedIcon } from '@/assets/order-icon/request_revision.svg';
import { activityDateLabelStyle, ActivityIcons, ActivityLabel, activityListStyles, ActivityVerticalLine } from './activity.style';
import { ReactComponent as DocumentIcon } from '@/assets/order-icon/document.svg';
import { Color } from '@/theme';
import { mediaUrlGenerator } from '@/common/utils';
import { useAppSelector } from '@/redux/hooks';
import { ActivityRequestRevision } from '@/modules/servi-order/interface';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';

interface IActivityRevisionView {
  activity: ActivityRequestRevision;
}

export const ActivityRevisionView = ({ activity }: IActivityRevisionView) => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);

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
              sx={{ color: Color.priBlue, marginLeft: '5px' }}
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
          <ActivityIcons className='request-revision'>{<RevisionRequestedIcon />}</ActivityIcons>
          <ActivityLabel>
            Revision requested
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>
      <ActivityVerticalLine>
        <DetailCardView>
          <DetailCardView.Header>
            Revision request #{activity.data.sequence}.{activity.data.subSequence}
          </DetailCardView.Header>
          <DetailCardView.Content>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <NameOrPictureAvatar
                style={{ height: '24px', width: '24px' }}
                name={selectedOrder?.buyer.profile.detail.name}
                url={selectedOrder?.buyer.profile.detail.logo ? mediaUrlGenerator(selectedOrder?.buyer.profile.detail.logo) : ''}
              />
              <Box sx={{ pt: '4px' }}>
                {activity.data.message} {__renderAttachment()}
              </Box>
            </Box>
          </DetailCardView.Content>
        </DetailCardView>
      </ActivityVerticalLine>
    </Box>
  );
};
