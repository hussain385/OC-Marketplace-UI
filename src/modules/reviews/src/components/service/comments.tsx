import React from 'react';

import { Box, Button, Divider, Typography } from '@mui/material';
import { Add, LockOutlined } from '@mui/icons-material';

import { useParams } from 'react-router-dom';
import { useSetState } from 'react-use';
import { isEmpty, isNil } from 'lodash';

import { DropDownMenuComponent } from '../../../../../common/components/dropdown-menu-component/dropdown-menu.component';
import { ServiceRating, ServiceSortBy } from '../../utils/constants';
import { LoginButton } from '@/common/components/authentication/buttons.tsx';
import CommentTile from './comment-tile';
import { useAppSelector } from '@/redux/hooks.tsx';
import { RenderIf } from '../../../../../common/components';
import { useGetReviewsQuery } from '../../service/review.api';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';
import { QuerySort } from '@nestjsx/crud-request/lib/types';

function Comments() {
  const { user, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  const { serviceId, uid } = useParams();

  const [{ sort, limit, rating }, setState] = useSetState<{ sort: QuerySort; rating?: object; limit: number }>({
    sort: {
      field: 'createdAt',
      order: 'DESC',
    } as QuerySort,
    rating: undefined,
    limit: 5,
  });

  const { data, isFetching } = useGetReviewsQuery(
    queryBuilder((builder) =>
      builder
        .search({
          $and: [
            serviceId ? { target: { $eq: 'BUYER' } } : {},
            serviceId ? { serviceId: { $eq: serviceId } } : {},
            uid ? { to: { $eq: uid } } : {},
            rating ? { averageRating: rating } : {},
          ],
        })
        .sortBy(sort)
        .setLimit(limit),
    ),
    { skip: !selectedEntity?.uid },
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          marginBottom: '10px',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '1em', md: undefined },
        }}
      >
        <DropDownMenuComponent
          onMenuItemClick={(item, label) => setState({ sort: item.object as QuerySort })}
          label={'Sort by'}
          menuItems={ServiceSortBy}
          overrideLabelStyle={{ width: { xs: '50%', md: 'auto' }, textAlign: 'start' }}
        />
        <DropDownMenuComponent
          onMenuItemClick={(item, label) => setState({ rating: item.object })}
          label={'Service rating'}
          menuItems={ServiceRating}
          overrideLabelStyle={{ width: { xs: '50%', md: 'auto' }, textAlign: 'start' }}
        />
      </Box>

      <RenderIf value={isNil(user) || isEmpty(user) || data?.data.length === 0}>
        <Box
          sx={{
            height: '142px',
            background: '#F6F6F6',
            borderRadius: 2,
            border: '0.50px #EAEAEA solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <RenderIf value={isNil(user) || isEmpty(user)}>
            <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <LockOutlined sx={{ color: '#7E7E7E', height: '24px', width: '24px' }} />
              <Typography sx={{ color: '#7E7E7E', fontSize: '14px', fontWeight: '600', wordWrap: 'break-word' }}>
                You must be logged in to see this info
              </Typography>
            </Box>

            <LoginButton
              buttonSx={{
                backgroundColor: '#F6F6F6',
              }}
              iconSx={{
                color: '#2752E7',
              }}
            />
          </RenderIf>

          <RenderIf value={data?.data.length === 0}>
            <Typography sx={{ color: '#7E7E7E', fontSize: '14px', fontWeight: '600', wordWrap: 'break-word' }}>
              No Review
            </Typography>
          </RenderIf>
        </Box>
      </RenderIf>

      <RenderIf value={!isNil(user) && !isEmpty(user)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data?.data.map((review) => <CommentTile key={review.id} review={review} />)}
          <Divider />
          <RenderIf value={limit < (data?.total ?? 0)}>
            <Button
              sx={{
                color: '#2752E7',
                alignSelf: 'end',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '-0.5px',
                textTransform: 'none',
              }}
              startIcon={<Add />}
              disabled={isFetching}
              onClick={() => setState((prevState) => ({ limit: prevState.limit + 5 }))}
            >
              See more
            </Button>
          </RenderIf>
        </Box>
      </RenderIf>
    </Box>
  );
}

export default Comments;
