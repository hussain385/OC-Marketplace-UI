import React from 'react';
import { ActivityActionCancellation, activityType } from '@/modules/servi-order/interface';
import { Box, Typography } from '@mui/material';
import {
  activityDateLabelStyle,
  ActivityLabel,
  activityListStyles,
  ActivityVerticalLine,
} from '@/modules/servi-order/components/activities/activity.style.ts';
import dayjs from 'dayjs';
import { useAppSelector } from '@/redux/hooks.tsx';
import { getEntityByRole } from '@/modules/servi-order/Service/order.slice.ts';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { mediaUrlGenerator } from '@/common/utils';
import { Color } from '@/theme.ts';

interface IActivityCancellationView {
  activity: ActivityActionCancellation;
}

const _text: Record<ActivityActionCancellation['type'], string> = {
  [activityType.approveCancellation]: 'approved cancellation request from you',
  [activityType.rejectCancellation]: 'request was declined',
  [activityType.withdrawCancellation]: 'request has been withdrawn',
};

function ActivityCancellationView({ activity }: IActivityCancellationView) {
  const entity = useAppSelector((state) => getEntityByRole(state, activity.data.by));

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <NameOrPictureAvatar
            name={entity?.profile.detail.name}
            url={entity?.profile.detail.logo ? mediaUrlGenerator(entity?.profile.detail.logo) : undefined}
            style={{
              width: '32px',
              height: '32px',
            }}
          />

          <ActivityLabel>
            <Typography component={'span'} sx={{ color: Color.priBlue, fontSize: 'inherit', fontWeight: 'inherit' }}>
              {entity?.profile.detail.name}
            </Typography>{' '}
            {_text[activity.type]}
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>
      <ActivityVerticalLine sx={{ paddingTop: 0 }} />
    </Box>
  );
}

export default ActivityCancellationView;
