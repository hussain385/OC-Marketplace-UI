/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import classNames from 'classnames';

import InfoIcon from '@mui/icons-material/Info';

import ErrorIcon from '@mui/icons-material/Error';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from 'react';

import './alert-message.style.css';

import { IconButton } from '@mui/material';

import RenderIf from '../render-if.component';

export enum AlertTypes {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

type PropsType = {
  message: string | React.ReactNode;
  showIcon?: boolean;
  cssStyle?: React.CSSProperties | undefined;
  type?: AlertTypes;
  cssClass?: string | null;
  isVisible: boolean;
  btnColor?: string;
};

export default function AlertMessage(props: PropsType) {
  const { cssStyle, cssClass, message, type, showIcon, isVisible, btnColor } = props;
  const [close, setClose] = useState<boolean>(isVisible);
  const classnames: string = classNames({ 'alert-message': !cssClass, cssClass });
  const defautlType: AlertTypes = type ? type : AlertTypes.WARNING;

  const AlertTypeIcons = {
    error: <ErrorIcon color={'error'} sx={{ fontSize: 25 }} />,
    success: <CheckCircleIcon sx={{ fontSize: 25 }} />,
    warning: <InfoIcon sx={{ fontSize: 25 }} />,
    info: <InfoIcon sx={{ fontSize: 25 }} />,
  };

  return (
    <RenderIf value={close}>
      <div className={`${classnames} ${defautlType}`} style={{ ...cssStyle }}>
        <div className='alert-container'>
          <div className='alert-content'>
            <div className='alert-icon'>{showIcon && AlertTypeIcons[defautlType]}</div>
            <div>{message}</div>
          </div>
          <div className='alert-close-btn'>
            <RenderIf value={Boolean(defautlType)}>
              <IconButton onClick={() => setClose(false)}>
                <CloseIcon fontSize='small' sx={{ color: btnColor ? btnColor : 'white' }} />
              </IconButton>
            </RenderIf>
          </div>
        </div>
      </div>
    </RenderIf>
  );
}
