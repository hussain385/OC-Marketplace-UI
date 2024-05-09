import { SxProps } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';

import { useAppDispatch } from '../../../../redux/hooks';

import {
  ExploreHeading,
  MarketPlaceBoxContainer,
  MarketPlaceGridContainer,
  MarketPlaceGridItem,
  MarketPlaceHeading,
  MarketPlaceIndicatorBox,
  MarketPlaceIndicatorBoxItem,
  TextAlignment,
} from '../../styles/marketplace-box.styles';
import { categoryUpdateAction } from '../../../../redux/reducers/catalogReducer';

export type MarketPlaceItem = {
  id: string | number;
  icon: string;
  text: string;
  description?: string;
};

type MarketPlaceProps = {
  headline?: string;
  customStyles?: React.CSSProperties | SxProps;
  subheading?: React.ReactNode;
  boxCustomStyles?: React.CSSProperties | SxProps;
  customHeadlineStyles?: React.CSSProperties | SxProps;
  customWrapperStyles?: React.CSSProperties | SxProps;
  customFontHeaderStyles?: React.CSSProperties | SxProps;
  customFontDescriptionStyles?: React.CSSProperties | SxProps;
  indicator?: boolean;
  data: MarketPlaceItem[];
  scrollRef?: React.MutableRefObject<HTMLDivElement>;
};

const MarketplaceBox = ({
  headline,
  customStyles,
  subheading,
  boxCustomStyles,
  customHeadlineStyles,
  customWrapperStyles,
  customFontHeaderStyles,
  customFontDescriptionStyles,
  data,
  indicator,
  scrollRef,
}: MarketPlaceProps) => {
  const { xs } = useMediaBreakpoint();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickHandler = (category: string, id: string | number) => {
    dispatch(categoryUpdateAction({ name: category, id: id as string }));
    navigate('/catalog/category');
  };

  return (
    <MarketPlaceBoxContainer sx={customWrapperStyles}>
      <RenderIf value={!xs}>
        <MarketPlaceHeading sx={customHeadlineStyles}>{headline ? headline : 'Explore the marketplace'}</MarketPlaceHeading>
      </RenderIf>
      <RenderIf value={xs && isUndefined(indicator)}>
        <MarketPlaceHeading sx={customHeadlineStyles}>{headline ? headline : 'Explore the marketplace'}</MarketPlaceHeading>
      </RenderIf>
      <RenderIf value={xs && !isUndefined(indicator)}>
        <MarketPlaceHeading sx={customHeadlineStyles}>{headline ? headline : 'Explore'}</MarketPlaceHeading>
        <MarketPlaceHeading sx={customHeadlineStyles}>{headline ? headline : 'the marketplace'}</MarketPlaceHeading>
      </RenderIf>
      {subheading}
      <MarketPlaceGridContainer sx={customStyles} ref={scrollRef}>
        {data.map((item) => (
          <MarketPlaceGridItem
            onClick={() => {
              if (indicator === true) {
                onClickHandler(item?.text, item?.id);
              }
            }}
            key={item.id}
            sx={boxCustomStyles}
          >
            <img src={item.icon} alt='dropwdown-menu' />

            <ExploreHeading sx={customFontHeaderStyles}>{item.text}</ExploreHeading>
            {!isUndefined(indicator) && indicator === true && (
              <MarketPlaceIndicatorBox>
                <MarketPlaceIndicatorBoxItem />
              </MarketPlaceIndicatorBox>
            )}
            {!isUndefined(item.description) && <TextAlignment sx={customFontDescriptionStyles}>{item.description}</TextAlignment>}
          </MarketPlaceGridItem>
        ))}
      </MarketPlaceGridContainer>
    </MarketPlaceBoxContainer>
  );
};

export default MarketplaceBox;
