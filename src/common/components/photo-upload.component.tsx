/* eslint-disable no-unused-vars */
import { Avatar, Box, Typography } from '@mui/material';

import React, { useState } from 'react';

import { ReactComponent as AvatarIcon } from '../../assets/icons/ic-avatar-default.svg';

import { ALLOWED_IMAGE_EXT } from '../constants';

import { Color } from '../../theme';

import RenderIf from './render-if.component';

import { isEmpty } from 'lodash';

import ReadFile from '../utils/helpers/fileReader';

type onChangeHandle = (file: File) => void;

type PropsType = {
  imgSrc: string;
  label?: string;
  defaultPlaceholder?: React.ReactNode | undefined;
  cssStyle?: React.CSSProperties | undefined;
  onChangeHandle?: onChangeHandle;
};

function PhotoUploadComponent(props: PropsType) {
  const [imageSrc, setImageSrc] = useState<string>(props.imgSrc);
  const { cssStyle, onChangeHandle } = props;
  const defaultStyles = {
    width: '72px',
    height: '72px',
    bgcolor: Color.textHint,
    marginY: '10px',
    ...cssStyle,
  };
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: { xs: 700, sm: 600, md: 600 },
          color: Color.pureBlack,
          lineHeight: '24px',
          fontSize: { xs: '16px', sm: '14px', md: '14px' },
        }}
      >
        {props.label}
      </Typography>
      <Box>
        <label htmlFor={'file'}>
          <Avatar sx={defaultStyles} src={imageSrc}>
            <RenderIf value={isEmpty(props.defaultPlaceholder)}>
              <AvatarIcon />
            </RenderIf>
            <RenderIf value={!isEmpty(props.defaultPlaceholder)}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.defaultPlaceholder}</Box>
            </RenderIf>
          </Avatar>
        </label>
        <Box>
          <input
            type='file'
            id='file'
            name='file'
            hidden
            onChange={(e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const target = e.target as typeof e.target & {
                files: FileList;
                result: string;
              };
              if (target.files.length > 0 && ALLOWED_IMAGE_EXT.includes(target.files[0].type)) {
                const res = ReadFile(target.files[0]);
                res.then((res) => {
                  const imageUriData: string = res as string;
                  setImageSrc(imageUriData);
                  onChangeHandle && onChangeHandle(target.files[0]);
                });
              } else {
                setImageSrc('');
              }
            }}
            accept={'image/*'}
          />
        </Box>
      </Box>
    </Box>
  );
}
PhotoUploadComponent.defaultProps = {
  imgSrc: '',
};

export default PhotoUploadComponent;
