import React from 'react';
import { TagLabel } from '../styles';
import { TAttributeStyle } from '../interfaces';
import { Box, Typography } from '@mui/material';
import { RenderIf } from '@/common/components';
import { truncate } from '@/common/utils';
import { BorderContainerLight, Text16 } from '@/common/styles';
import { ReactComponent as SkillIcon } from '@/assets/icons/skill.svg';
import { useAppSelector } from '@/redux/hooks';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';

type Props = {
  style?: TAttributeStyle;
  showHeading?: boolean;
  entityId?: string;
  tags?: string[];
  isStatic?: boolean;
};

export const SkillTags = ({ style = 'chip', showHeading, entityId, isStatic = false, tags }: Props) => {
  const selectedEntityUID = useAppSelector((state) => state.mainState.useInfo.selectedEntity?.uid);
  const { data } = useGetEntityInfoQuery({ entityId: entityId ?? selectedEntityUID ?? '' }, { skip: isStatic });

  const skillData = data ? data.data.skills : tags;

  const renderChipTag = (skill: string) => {
    return <TagLabel key={skill}>{skill}</TagLabel>;
  };

  const renderPlainTag = (skill: string) => {
    return (
      <Typography key={skill} className='tag' sx={{ fontWeight: '600', fontSize: '14px' }}>
        {truncate(skill, 40)}
      </Typography>
    );
  };
  return (
    <div className='skill tags'>
      <RenderIf value={!!showHeading}>
        <Typography sx={{ fontWeight: '400', display: 'inline-block', marginRight: '5px' }}>Skills: </Typography>
      </RenderIf>
      {skillData?.map((skill) => {
        return style === 'chip' ? renderChipTag(skill) : renderPlainTag(skill);
      })}
    </div>
  );
};

export const Skills = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <SkillIcon /> <Text16 sx={{ marginLeft: '10px' }}>Skills</Text16>
      </Box>
      <BorderContainerLight>
        <SkillTags />
      </BorderContainerLight>
    </Box>
  );
};
