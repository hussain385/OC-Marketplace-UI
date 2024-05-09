import React, { ReactNode } from 'react';
import { Avatar, Badge, Box, SxProps } from '@mui/material';
import { AvatarLabel } from '../styles';
import { Color } from '@/theme.ts';
import { mediaUrlGenerator } from '@/common/utils';
import { startCase } from 'lodash';
import { EntityStatusOptions, ILogo } from '@/common/interface';
import { FaCircleExclamation } from 'react-icons/fa6';
import { BiSolidCheckShield } from 'react-icons/bi';

type Props = {
  name: string | null | undefined;
  url?: string;
  style?: SxProps;
};

export const NameOrPictureAvatar = (props: Props) => {
  //extra first alphabets from the name
  const style = { bgcolor: Color.priBlue, ...props.style };
  return (
    <Avatar sx={style} src={props.url}>
      <AvatarLabel>{props.name ? props.name[0].toUpperCase() : ''}</AvatarLabel>
    </Avatar>
  );
};

interface ICommonAvatar {
  src?: string | ILogo;
  label?: string;
  sx?: SxProps;
  status?: EntityStatusOptions;
}

const badgeIcon: Record<EntityStatusOptions, ReactNode> = {
  DRAFT: null,
  REJECTED: (
    <Box sx={{ background: 'white', borderRadius: '30px' }}>
      <FaCircleExclamation color={'#FF6A68'} size={12} />
    </Box>
  ),
  VERIFIED: (
    <Box sx={{ background: 'white', borderRadius: '30px' }}>
      <BiSolidCheckShield size={12} color={'#15C887'} />
    </Box>
  ),
  PENDING: null,
  PROCESSING: null,
  INVITING: null,
};

export const CommonAvatar = ({ src, label, sx, status }: ICommonAvatar) => {
  return (
    <Badge
      overlap={'circular'}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      badgeContent={badgeIcon[status ?? 'VERIFIED']}
    >
      <Avatar
        src={src ? (typeof src === 'string' ? src : mediaUrlGenerator(src)) : ''}
        sx={{ width: '40px', height: '40px', border: '1px solid #EEEEEE', backgroundColor: Color.priBlue, ...sx }}
      >
        <AvatarLabel>{startCase(label ? label[0] : 'N/A')}</AvatarLabel>
      </Avatar>
    </Badge>
  );
};
