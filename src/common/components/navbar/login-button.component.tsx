import React, { useMemo } from 'react';
import { Button } from '@mui/material';
import { ReactComponent as AccountCircle } from '@/assets/home-page/buyer/drawer/account-circle.svg';
import { useLocation } from 'react-router-dom';
import { Color } from '@/theme';
import { useAppSelector } from '@/redux/hooks';
import { USER_GROUP_LOWERCASE } from '@/common/interface';
import useBackToLogin from '@/common/utils/hooks/useBackToLogin';
import { loginBtnStyles } from '@/common/styles/navbar.styles';

const LoginButtonComponent = ({ scrollDirection }: { scrollDirection: number }) => {
  const { pathname } = useLocation();
  const { clientType } = useAppSelector((state) => state.mainState.useInfo);
  const navbarSellerCondition = useMemo(
    () => clientType === USER_GROUP_LOWERCASE.seller && scrollDirection < 475 && pathname === '/seller',
    [scrollDirection, clientType, pathname],
  );
  const { redirect } = useBackToLogin();

  return (
    <Button
      onClick={() => redirect()}
      sx={{
        ...loginBtnStyles,
        backgroundColor: navbarSellerCondition ? 'white' : 'transparent',
        border: navbarSellerCondition ? `1px solid ${Color.priWhite}` : `1px solid ${Color.priBlue}`,
      }}
    >
      <span style={{ display: 'flex' }}>
        <AccountCircle />
      </span>
      Login / Signup
    </Button>
  );
};

export default LoginButtonComponent;
