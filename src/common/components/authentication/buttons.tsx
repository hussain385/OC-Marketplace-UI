import React from 'react';
import { SxProps } from '@mui/material';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '../app-theme-btn.component';
import { AccountCircle } from '@mui/icons-material';
import useBackToLogin from '@/common/utils/hooks/useBackToLogin';

interface ILoginButton {
  buttonSx?: React.CSSProperties | SxProps;
  iconSx?: React.CSSProperties | SxProps;
}

export function LoginButton({ buttonSx, iconSx }: ILoginButton) {
  const { redirect } = useBackToLogin();

  return (
    <AppThemeBtnComponent
      customButtonStyle={{
        width: '157px',
        height: '40px',
        borderRadius: '100px',
        outline: `1px solid ${Color.priBlue}`,
        display: 'block',
        ...buttonSx,
      }}
      color={Color.textBlack}
      backgroundColor={Color.priWhite}
      width={'157px'}
      fontSize={'14px'}
      text={
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AccountCircle sx={iconSx} />
          Log in/Sign up
        </span>
      }
      onClick={() => redirect()}
    />
  );
}
