import React, { useState } from 'react';
import { TagLabel } from '../styles';
import { IAward, TAttributeStyle } from '../interfaces';
import { Box, ButtonBase, Typography } from '@mui/material';
import { RenderIf } from '@/common/components';
import { mediaUrlGenerator, truncate } from '@/common/utils';
import { ReactComponent as AwardIcon } from '@/assets/icons/trophy.svg';
import { BorderContainerLight, Text12, Text16 } from '@/common/styles';
import { Color } from '@/theme';
import { useGetAwardsQuery } from '../service/profile.api';
import { useAppSelector } from '@/redux/hooks';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import AwardModal from '@/common/components/profile/edit/Award.modal.tsx';

type Props = {
  style?: TAttributeStyle;
  showHeading?: boolean;
};

export const AwardTags = ({ style = 'chip', showHeading }: Props) => {
  const { entityId } = useAppSelector((state) => state.mainState.useInfo.selectedRole!);
  const { data, isFetching } = useGetAwardsQuery({ filter: { 'entity.id||$eq||': entityId } });

  const renderChipTag = (tag: IAward) => {
    return <TagLabel key={tag.id}>{tag.title}</TagLabel>;
  };

  const renderPlainTag = (tag: IAward) => {
    return (
      <Typography key={tag.id} className='tag' sx={{ fontWeight: '600', fontSize: '14px' }}>
        {truncate(tag.title, 40)}
      </Typography>
    );
  };
  return data && data.length > 0 ? (
    <div className='award tags height-overflow'>
      <RenderIf value={!!showHeading}>
        <Typography sx={{ fontWeight: '400', display: 'inline-block', marginRight: '5px' }}>Awards/Achievements: </Typography>
      </RenderIf>
      <RenderIf value={isFetching}>Loading...</RenderIf>
      {data?.map((award) => {
        return style === 'chip' ? renderChipTag(award) : renderPlainTag(award);
      })}
    </div>
  ) : null;
};

interface IAwardsTile {
  award: IAward;
  isEdit?: boolean;
  entityId?: string;
}

function AwardsTile({ award, isEdit, entityId }: IAwardsTile) {
  const [isModal, setIsModal] = useState(false);

  return (
    <BorderContainerLight>
      <Box sx={{ display: 'flex' }}>
        <RenderIf value={!!award.media}>
          <Box sx={{ width: '64px', height: '50px', overflow: 'hidden', marginRight: '10px' }}>
            <img src={mediaUrlGenerator(award.media)} width='64px' height='50px' />
          </Box>
        </RenderIf>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Text12 sx={{ fontWeight: '700' }}>{award.title}</Text12>
            <div style={{ margin: '0px 10px' }}>-</div>
            <Text12 sx={{ fontWeight: '400' }}>{award.issuerYear}</Text12>
          </Box>
          <Box>
            <Text12 sx={{ fontWeight: '400', color: Color.textGray7E }}>{award.issuer}</Text12>
          </Box>
          <Box>
            <Text12>{award.description}</Text12>
          </Box>
        </Box>
        {isEdit && (
          <ButtonBase sx={{ alignSelf: 'start' }} onClick={() => setIsModal(true)}>
            <EditIcon width={16} height={16} />
          </ButtonBase>
        )}
      </Box>

      <AwardModal isOpen={isModal} onClose={() => setIsModal(false)} award={award} entityId={entityId} />
    </BorderContainerLight>
  );
}

interface IAwardsProps {
  isEdit?: boolean;
  isHeading?: boolean;
  overRideEntity?: string;
}

export const Awards = ({ isEdit, isHeading = true, overRideEntity }: IAwardsProps) => {
  const { entityId } = useAppSelector((state) => state.mainState.useInfo.selectedRole!);
  const { data, isFetching } = useGetAwardsQuery({ filter: `entity.id||$eq||${overRideEntity ?? entityId}` });

  const renderAward = () => {
    return (
      data &&
      data.map((award: IAward) => (
        <AwardsTile award={award} key={award.id} isEdit={isEdit} entityId={overRideEntity ?? entityId} />
      ))
    );
  };

  return (
    <Box>
      {isHeading && (
        <Box sx={{ display: 'flex' }}>
          <AwardIcon /> <Text16 sx={{ marginLeft: '10px' }}>Awards/Achievements</Text16>
        </Box>
      )}
      <RenderIf value={isFetching}>Loading...</RenderIf>
      <RenderIf value={!!data}>
        <Box>{renderAward()}</Box>
      </RenderIf>
    </Box>
  );
};
