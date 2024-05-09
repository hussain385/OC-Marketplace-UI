import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Star } from '@mui/icons-material';
import { Breakpoints, Color } from '../../../../../theme';
import { ControllerRenderProps } from 'react-hook-form';
import { RenderIf } from '../../../../../common/components';

interface RatingTileInterface {
  title: string;
  subtitle?: string;
  field: ControllerRenderProps<any, any>;
}

function RatingTile({ title, subtitle, field }: RatingTileInterface) {
  return (
    <RateTile>
      <Box className={'text-container'}>
        <Typography className={'title'}>{title}</Typography>
        <RenderIf value={Boolean(subtitle)}>
          <Typography className={'subtitle1'}>{subtitle}</Typography>
        </RenderIf>
      </Box>
      <Rating className={'rating'} emptyIcon={<Star fontSize='inherit' />} {...field} />
    </RateTile>
  );
}

const RateTile = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .text-container {
    & .title {
      color: black;
      font-weight: 600;
      font-size: 14px;
    }

    & .subtitle1 {
      color: ${Color.textHint};
      font-size: 12px !important;
      font-weight: 600;
    }
  }

  & .rating {
    & .MuiRating-iconFilled {
      color: ${Color.orderStar};
    }
    & .MuiRating-iconHover {
      color: ${Color.orderStar};
    }
    & .MuiRating-iconEmpty {
      color: ${Color.bgGreyDark};
    }

    @media (max-width: ${Breakpoints.sm}px) {
      font-size: 24px;
    }
  }

  @media (max-width: ${Breakpoints.sm}px) {
    flex-direction: column-reverse;
    align-items: start;
  }
`;

export default RatingTile;
