import React, { useEffect, useMemo } from 'react';

import { styled } from '@mui/system';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { Star } from '@mui/icons-material';
import { useLazyGetOverViewOfServicesQuery } from '@/redux/apis/catalogApi.ts';
import { useParams } from 'react-router-dom';
import { useSetState } from 'react-use';
import { useLazyGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';
import { getTotalReviewsCount } from '../../utils/functions';
import { BuyerRatingPoint, ICounts } from '../../utils/interface-validation';

function ReviewBar() {
  const { serviceId, uid } = useParams();
  const [Service] = useLazyGetOverViewOfServicesQuery();
  const [Entity] = useLazyGetEntityInfoQuery();
  const [{ average, name, counts }, setState] = useSetState<{
    average?: BuyerRatingPoint;
    counts?: ICounts;
    name: string;
  }>({
    name: '',
  });

  const services = useMemo(() => {
    return [
      { rate: average?.communicationLevel, text: 'Seller communication level' },
      { rate: average?.recommendToFriends, text: 'Recommend to a friend' },
      { rate: average?.serviceAsDescribed, text: 'Service as described' },
      { rate: average?.taskResponsibility, text: 'Task responsibility' },
    ];
  }, [average]);

  const reviews = useMemo(() => {
    return [
      { star: 5, count: counts?.fiveStars ?? 0 },
      { star: 4, count: counts?.fourStars ?? 0 },
      { star: 3, count: counts?.threeStars ?? 0 },
      { star: 2, count: counts?.twoStars ?? 0 },
      { star: 1, count: counts?.oneStar ?? 0 },
    ];
  }, [counts]);

  const totalCount = useMemo(() => {
    return getTotalReviewsCount(counts);
  }, [counts]);

  useEffect(() => {
    if (serviceId) {
      Service({
        code: serviceId,
        queryObject: {
          populate: [{ path: '__plans' }, { path: '__medias' }, { path: '__entity', populate: ['__logo'] }],
        },
      })
        .unwrap()
        .then((e) => setState({ name: '' }));
    } else if (uid) {
      Entity({
        entityId: uid,
        queryObject: {
          populate: [
            { path: '__services', match: { status: 'ENABLE' }, populate: ['__medias', '__plans'] },
            { path: '__awards', populate: ['__avatar'] },
            { path: '__employees', populate: ['__avatar'] },
            { path: '__logo' },
          ],
        },
      })
        .unwrap()
        .then((e) => {
          setState({
            average: e.data.__averages?.sellerProfile,
            counts: e.data.__counts?.sellerProfile,
            name: e.data.profile.detail.name,
          });
        });
    }
  }, [Entity, Service, serviceId, setState, uid]);

  return (
    <ReviewBarStyled>
      <Typography className={'head'}>Reviews</Typography>

      <Box className={'main-container'}>
        <Box>
          <Typography className={'item-head'}>
            {totalCount} reviews for {serviceId ? 'this service' : name}
          </Typography>
          <Box className={'item-list'}>
            {reviews.map((value) => (
              <Box key={value.star} className={'item-container'}>
                <Typography className={'star-text rating-text'}>
                  {value.star} star{value.star === 1 ? '' : 's'}
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={(value.count / Math.max(totalCount, 1)) * 100}
                  className={'linear-bar'}
                />
                <Typography className={'count-text'}>({value.count})</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography className={'item-head'}>Service rating breakdown</Typography>
          <Box className={'item-list'}>
            {services.map((value, index) => (
              <Box key={value.text} className={'item-container'}>
                <Star className={'star'} />
                <Typography className={'star-text'}>{(value.rate ?? 0).toPrecision(2)}</Typography>
                <Typography className={'service-text'}>{value.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ReviewBarStyled>
  );
}

const ReviewBarStyled = styled(Box)`
  & .head {
    color: #000;
    font-size: 24px !important;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 24px;
  }

  & .main-container {
    display: flex;
    column-gap: 150px;
    row-gap: 24px;
    flex-wrap: wrap;

    & .item-head {
      color: #000;
      font-size: 16px !important;
      font-style: normal;
      font-weight: 600;
      letter-spacing: -0.48px;
      margin-bottom: 19px;
    }

    & .item-list {
      display: flex;
      flex-direction: column;
      gap: 16px;

      & .item-container {
        display: flex;
        align-items: center;

        & .star {
          color: ${Color.orderStar};
          margin-right: 6px;
        }

        & .service-text {
          color: #000;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          letter-spacing: -0.42px;
        }

        & .star-text {
          color: #000;
          font-size: 14px !important;
          font-style: normal;
          font-weight: 600;
          letter-spacing: -0.42px;
          margin-right: 15px;
        }

        & .count-text {
          color: #000;
          font-size: 14px !important;
          font-style: normal;
          font-weight: 600;
          letter-spacing: -0.42px;
          padding-left: 11px;
        }

        & .linear-bar {
          background-color: #f6f6f6;
          height: 6px;
          border-radius: 3px;
          min-width: 200px;

          & .MuiLinearProgress-bar {
            background-color: ${Color.orderStar};
          }
        }

        &:last-child {
          & .rating-text {
            margin-right: 23px;
          }
        }
      }
    }
  }
`;

export default ReviewBar;
