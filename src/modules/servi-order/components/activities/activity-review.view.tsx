import React, { useMemo } from 'react';
import { ActivityReview } from '@/modules/servi-order/interface';
import { useAppSelector } from '@/redux/hooks.tsx';
import { Box, Typography } from '@mui/material';
import {
  activityDateLabelStyle,
  ActivityIcons,
  ActivityLabel,
  activityListStyles,
  ActivityVerticalLine,
} from '@/modules/servi-order/components/activities/activity.style.ts';
import dayjs from 'dayjs';
import { ReactComponent as StarIcon } from '@/assets/order-icon/star.svg';
import DetailCardView from '@/modules/servi-order/components/detail-card';
import { getEntityByRole } from '@/modules/servi-order/Service/order.slice.ts';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { mediaUrlGenerator } from '@/common/utils';
import { Rating } from '@/modules/reviews/src/utils/interface-validation.ts';
import { Star } from '@mui/icons-material';

interface IActivityReviewView {
  activity: ActivityReview;
}

function ActivityReviewView({ activity }: IActivityReviewView) {
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);
  const entity = useAppSelector((state) => getEntityByRole(state, activity.data.by));
  const review = useMemo(() => selectedOrder?.reviews?.find((e) => e.from === entity?.id), [entity?.id, selectedOrder?.reviews]);
  const isMe = useAppSelector((state) => state.mainState.useInfo.selectedEntity?.id === entity?.id);

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <ActivityIcons className={activity.type}>
            <StarIcon />
          </ActivityIcons>
          <ActivityLabel sx={{ fontWeight: 400 }}>
            <strong>{isMe ? 'You' : entity?.profile.detail.name}</strong> gave a <strong>{review?.averageRating} star</strong>
            {isMe ? ' for their service' : ' for your service'}
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>

      <ActivityVerticalLine sx={{ paddingTop: 0 }}>
        <DetailCardView>
          <DetailCardView.Header>Review</DetailCardView.Header>

          <DetailCardView.Content>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              <NameOrPictureAvatar
                name={entity?.profile.detail.name}
                url={entity?.profile.detail.logo ? mediaUrlGenerator(entity?.profile.detail.logo) : undefined}
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />

              <Box>
                <Typography>{review?.message}</Typography>

                <Typography sx={{ marginTop: '8px', marginBottom: '8px', fontWeight: 600 }}>Service rating breakdown</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {review?.ratings.map((e) => <RatingTile rating={e} key={e.id} />)}
                </Box>
              </Box>
            </Box>
          </DetailCardView.Content>
        </DetailCardView>
      </ActivityVerticalLine>
    </Box>
  );
}

interface IRatingTile {
  rating: Rating;
}

function RatingTile({ rating }: IRatingTile) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Star sx={{ color: '#2CAF70', marginRight: '4px' }} />
      <Typography sx={{ marginRight: '16px', fontWeight: 600 }}>{rating.point.toPrecision(2)}</Typography>
      <Typography>{rating.title}</Typography>
    </Box>
  );
}

export default ActivityReviewView;
