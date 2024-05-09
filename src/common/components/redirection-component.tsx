import { isUndefined } from 'lodash';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import React, { useEffect } from 'react';
import { getCookie } from '../utils/cookie';

const routeMap: RegExp[] = [
  /confirmation/,
  /create/,
  /terms-conditions/,
  /privacy-policy/,
  /catalog\/category/,
  /catalog\/search/,
  /catalog\/sub-category\/[a-zA-Z0-9-]{2,}/,
  /service-detail/,
  /seller-profile'/,
  /email-confirmation'/,
  /verify/,
  /check-inbox/,
  /staff-email/,
  /invitation/,
  /login/,
  /logout/,
  /reset-password/,
  /update-password/,
  ///chat/,
  ///chat\/[a-zA-Z0-9-]{2,}/,
  /success/,
  /seller/,
  /freelance-individual-registration/,
  /forgotpassword/,
  /email-verified/,
];

/**
 * @deprecated _layout been implemented
 */
const Redirection = () => {
  const {
    useInfo: { user },
  } = useAppSelector((state) => state.mainState);
  const location = useLocation();
  const isLogout = getCookie('isLoggedIn');

  useEffect(() => {
    let isPublicPage = false; //routeMap.includes(location.pathname.replace(/^\/|\/$/g, ''));
    routeMap.map((route: RegExp) => {
      const pathname = location.pathname.replace(/^\/|\/$/g, '');
      if (pathname.match(route)) {
        isPublicPage = true;
      }
    });
    if (isUndefined(isLogout) && isUndefined(user) && !isPublicPage && location.pathname !== '/') {
      window.location.replace(`/login?redirect=${location.pathname}${location.search}`);
    }
  }, [isLogout, location.pathname, location.search, user]);

  return <></>;
};

export default Redirection;
