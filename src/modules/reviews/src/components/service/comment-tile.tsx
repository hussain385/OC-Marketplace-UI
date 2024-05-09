import React from 'react';

import { Avatar, Box, ButtonBase, styled, Typography } from '@mui/material';

import { Color } from '@/theme.ts';
// import { useCreateReviewReactionMutation, useUpdateReviewReactionMutation } from '../../service/review.api';
// import { useAppSelector } from '../../../../../redux/hooks';
import { Review } from '../../utils/interface-validation';
import { AvatarLabel } from '@/common/styles';
import { Star } from '@mui/icons-material';
import moment from 'moment/moment';

interface ICommentTile {
  review: Review;
}

function CommentTile({ review }: ICommentTile) {
  // const [Helpful, { isLoading }] = useCreateReviewReactionMutation();
  // const [UpdateHelpful, { isLoading: isLoadingUpdate }] = useUpdateReviewReactionMutation();
  // const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  // function CommentHelpful(type: 'HELPFUL' | 'NOT_HELPFUL') {
  //   const body = {
  //     orderReviewId: review.id,
  //     data: {
  //       type,
  //       entityId: selectedEntity?.uid ?? '',
  //     },
  //   };
  //
  //   if (isNil(review.__reactionOfTargetingEntity)) {
  //     Helpful(body);
  //   } else {
  //     UpdateHelpful({ ...body, reactionId: review.__reactionOfTargetingEntity?.uid ?? '' });
  //   }
  // }

  return (
    <CommentTileStyled>
      <Avatar>
        <AvatarLabel>Entity name</AvatarLabel>
      </Avatar>
      <Box className={'comment-container'}>
        <Box className={'head-container'}>
          <Typography className={'head-text'}>WIP</Typography>
          <Box>
            <Star />
            <Typography>{review.averageRating.toPrecision(2)}</Typography>
            <Typography className={'vertical-divider'}>|</Typography>
            <Typography>{moment(review.createdAt).fromNow()}</Typography>
          </Box>
        </Box>

        <Typography className={'sub-text'}>Service Name</Typography>

        <Typography className={'comment-text'}>{review.message}</Typography>

        <Box className={'helpful-container'}>
          <Typography className={'helpful-text'}>Helpful?</Typography>

          <Box>
            <ButtonBase
            // sx={{
            //   color: review.__reactionOfTargetingEntity?.type === 'HELPFUL' ? Color.priBlue : undefined,
            // }}
            // onClick={() => CommentHelpful('HELPFUL')}
            // disabled={isLoading || isLoadingUpdate}
            >
              Yes
            </ButtonBase>
            <Typography className={'vertical-divider'}>|</Typography>
            <ButtonBase
            // sx={{
            //   color: review.__reactionOfTargetingEntity?.type === 'NOT_HELPFUL' ? Color.priBlue : undefined,
            // }}
            // onClick={() => CommentHelpful('NOT_HELPFUL')}
            // disabled={isLoading || isLoadingUpdate}
            >
              No
            </ButtonBase>
          </Box>

          {/*    <RenderIf value={isLoading || isLoadingUpdate}>*/}
          {/*      <CircularProgress size={12} />*/}
          {/*    </RenderIf>*/}

          {/*    <RenderIf*/}
          {/*      value={*/}
          {/*        !isLoading &&*/}
          {/*        !isLoadingUpdate &&*/}
          {/*        !isNil(review.__reactionOfTargetingEntity) &&*/}
          {/*        review.__reactionOfTargetingEntity?.type === 'HELPFUL'*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Typography className={'helpful-react'}>This review helpful.</Typography>*/}
          {/*    </RenderIf>*/}
        </Box>
      </Box>
    </CommentTileStyled>
  );
}

const CommentTileStyled = styled('div')`
  display: flex;
  gap: 18px;

  & .MuiAvatar-root {
    background-color: ${Color.priBlue};
    height: 35px;
    width: 35px;
  }

  & .comment-container {
    width: 100%;

    & .vertical-divider {
      color: #eaeaea;
      margin: 0 5px;
    }

    & .head-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .head-text {
        color: ${Color.textBlack};
        font-size: 14px !important;
        font-style: normal;
        font-weight: 700;
        letter-spacing: -0.5px;
      }

      & .MuiBox-root {
        display: flex;
        align-items: center;

        & .MuiSvgIcon-root {
          color: ${Color.orderStar};
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }

        & .MuiTypography-root {
          font-size: 12px !important;
          font-weight: 600;
        }

        & :nth-child(2) {
          color: ${Color.orderStar};
        }
      }
    }

    & .sub-text {
      color: #7e7e7e;
      font-size: 10px !important;
      font-style: normal;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }

    & .comment-text {
      color: ${Color.textBlack};
      font-size: 14px !important;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      word-break: break-word;
    }

    & .helpful-container {
      display: flex;
      gap: 16px;
      align-items: center;

      & .helpful-text {
        color: ${Color.textBlack};
        font-size: 12px !important;
        font-style: normal;
        font-weight: 600;
        letter-spacing: -0.36px;
      }

      & .MuiCircularProgress-root {
        color: ${Color.priBlue};
      }

      & .helpful-react {
        color: #7e7e7e;
        font-size: 12px !important;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        letter-spacing: -0.36px;
      }

      & .MuiBox-root {
        display: flex;

        & .MuiButtonBase-root {
          padding: 0;
          margin: 0;
          text-transform: inherit;
          min-width: 10px;
          font-size: 12px !important;
          font-style: normal;
          font-weight: 600;
          letter-spacing: -0.36px;
        }
      }
    }
  }
`;

export default CommentTile;
