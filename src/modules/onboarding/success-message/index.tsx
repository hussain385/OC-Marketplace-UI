import { isUndefined } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { ReactComponent as TickIcon } from '../../../assets/success-img/tick-green.svg';
import { getCookie } from '@/common/utils/cookie';
import { USER_GROUP } from '@/common/interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetAppConfigAction } from '@/redux/reducers/appReducers';
import MainLayout from '@/common/layout/main.layout';
import { Path, useNavigate } from '@/router.ts';
import { ApproveSuccess } from '@/common/components/success-message/approve-success.tsx';

export const SuccessMessage = () => {
  const navigate = useNavigate();
  const xClientType = getCookie('x-client-type');
  const [hasRedirectUrl, setHasRedirectUrl] = React.useState(false);
  const { redirectUrl } = useAppSelector((state) => state.mainState.appConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isUndefined(redirectUrl)) {
      setHasRedirectUrl(true);
    }
  }, [redirectUrl, hasRedirectUrl]);

  const okBtnHandle = () => {
    if (!isUndefined(redirectUrl)) {
      dispatch(resetAppConfigAction());
      navigate(redirectUrl as Path);
    } else if (xClientType === USER_GROUP.Buyer.toLowerCase()) {
      navigate('/catalog/category');
    } else {
      navigate('/account/manage-listing');
    }
  };

  const cancelBtnHandle = () => {
    navigate('/account');
  };

  const subHeading = useMemo(
    () =>
      hasRedirectUrl
        ? `Click 'Continue' to resume your journey prior to signing up`
        : 'Start your journey by visiting your dashboard and exploring the platform.',
    [hasRedirectUrl],
  );

  return (
    <MainLayout>
      <ApproveSuccess
        title='Welcome to OPNCORP!'
        subText={subHeading}
        customIcon={<TickIcon style={{ marginTop: '52px' }} />}
        primaryBtnLabel={hasRedirectUrl ? 'Continue' : 'Go to homepage'}
        secondaryBnLabel='Visit dashboard'
        okBtnHandle={okBtnHandle}
        cancelBtnHandle={cancelBtnHandle}
        onlyOkBtn={hasRedirectUrl}
      />
    </MainLayout>
  );
};
