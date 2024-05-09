import { Box } from '@mui/material';
import { isUndefined } from 'lodash';
import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import { IoIosInformationCircle } from 'react-icons/io';
import { ReactComponent as SheildIcon } from '@/assets/icons/shield-tick.svg';
import { ReactComponent as Star } from '@/assets/icons/yellow-star.svg';
import { TextLabel } from '@/common/styles';
import { Color } from '@/theme';
import { RenderIf } from '@/common/components';
import DropDownMenu from '@/common/components/dropdown-menu-component';
import { IMenuItems } from '@/common/interface';
import { useAppSelector } from '@/redux/hooks';
import { IEntity } from '@/common/interface/entity-interface';

type Props = {
  colorTheme: 'green' | 'yellow';
  tooltipText?: string;
  dropdownMenuItems?: IMenuItems[];
  entity?: IEntity | undefined;
  onDropdownItemClick?: (item: IMenuItems) => void;
};

const ProfileRatingInfo = ({ colorTheme = 'yellow', tooltipText, onDropdownItemClick, dropdownMenuItems, entity }: Props) => {
  const rating = 0; //TODO when backend provides rating it will be fetch from api
  const overAllRating = 0; //TODO same as above
  const ratingSum = overAllRating && overAllRating > 999 ? overAllRating / 1000 + 'k+' : overAllRating;
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const entityData = useMemo(() => {
    return entity ? entity : selectedEntity;
  }, [entity, selectedEntity]);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
      <RenderIf value={entityData!.status === 'VERIFIED'}>
        <SheildIcon />
      </RenderIf>
      <RenderIf value={!!entityData}>
        <TextLabel
          sx={{
            color: entityData!.status === 'VERIFIED' ? Color.orderStatus.paid : Color.lightRed,
            fontWeight: '600',
            paddingLeft: '5px',
            fontSize: '12px',
          }}
        >
          {entityData?.status === 'VERIFIED' ? 'Verified' : 'Not verified'}
        </TextLabel>
      </RenderIf>
      <Box
        sx={{
          display: rating > 0 ? 'block' : 'none',
          width: '2px',
          background: Color.borderGray2,
          height: '14px',
          marginX: '10px',
        }}
      ></Box>
      <Box sx={{ display: rating > 0 ? 'flex' : 'none', alignItems: 'center' }} className=''>
        <Star className={`star ${colorTheme}`} />
        <TextLabel
          className={`label-${colorTheme}`}
          sx={{
            fontWeight: '700',
            fontSize: '14px',
          }}
        >
          {rating}
        </TextLabel>
        <TextLabel
          sx={{
            color: colorTheme === 'green' ? Color.litegreen : Color.textGray7E,
            fontWeight: '500',
            fontSize: '14px',
            marginLeft: '5px',
          }}
        >
          ({ratingSum})
        </TextLabel>
        {/**
         * Filter dropdown
         */}
        <RenderIf value={!!dropdownMenuItems && dropdownMenuItems.length > 0}>
          <Box sx={{ marginLeft: '5px' }}>
            <DropDownMenu
              customClassName='rating-filter'
              menuItems={dropdownMenuItems!}
              noTick
              buttonOverrideStyle={{ border: `1px solid ${Color.lightGreen}`, padding: '0px 5px', height: '24px' }}
              onMenuItemClick={(menu) => {
                onDropdownItemClick && onDropdownItemClick(menu);
              }}
            />
          </Box>
        </RenderIf>
        {/** Tooltip */}
        <RenderIf value={!isUndefined(tooltipText)}>
          <IoIosInformationCircle
            style={{ color: Color.textGray7E, width: '20px', height: '20px', marginLeft: '5px', marginRight: '5px' }}
            data-tooltip-id='tooltip-inline'
            data-tooltip-content={tooltipText}
          />
          <Tooltip
            id='tooltip-inline'
            style={{
              backgroundColor: 'white',
              color: Color.textBlack,
              filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.16))',
              maxWidth: '200px',
            }}
          />
        </RenderIf>
      </Box>
    </Box>
  );
};
export default ProfileRatingInfo;
