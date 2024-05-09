import React, { useCallback, useEffect } from 'react';
import { isNull, isUndefined } from 'lodash';
import CategoryListBarComponent from '../../common/components/category-list-bar.component';
import { useAppDispatch } from '../../redux/hooks';
import { WrapperMain } from '../../common/styles/navbar.styles';
import TopContainerComponent from './top-container.component';
import ExploreMarketPlace from './explore-marketplace.component';
import PaymentSecurityComponent from './payment-security.component';
import QualityProvideComponent from './quality-provide.component';
import { FeaturesComponent } from './features.component';
import { BecomeSellerComponent } from './become-seller.component';
import LogoutModal from '../../common/components/logout-popup.component';
import { useGlobalLogoutState } from '../../common/utils/global_state.util';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginwithSingPassMutation } from '../../redux/apis/authApi';
import { showToast, ToastTypes } from '../../common/utils';
import waitSec from '../../common/utils/helpers/setTimeout';
import { useGetCategoriesQuery } from '../../redux/apis/catalogApi';
import useSafeRender from '../../common/utils/hooks/useSafeRender';
import './style.css';
import { getCookie } from '../../common/utils/cookie';
import { userFromStateUpdated, userInfoUpdated, userRoleUpdated } from '../../redux/reducers/authReducers';
import { allCategoriesUpdateAction } from '../../redux/reducers/catalogReducer';
import { USER_GROUP_LOWERCASE } from '../../common/interface';
import NavBar from '@/common/components/navbar';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetCategoriesQuery({});
  const [logoutModal] = useGlobalLogoutState();

  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loginwithSingPass] = useLoginwithSingPassMutation();

  const [verify, setVerify] = React.useState<boolean>(false);

  const processVerification = useCallback(async () => {
    const code = search.get('code');
    const state = search.get('state');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await loginwithSingPass({ code: code as string, state: state as string });

    if (res?.data?.isRegistered === true) {
      const successMsg = (res as any).data.message as string;

      showToast(successMsg as string, ToastTypes.SUCCESS);

      const obj = {
        token: res.data.jwt as string,
        refresh_token: res.data.refresh_token as string,
        users: res.data.user as any,
        singpassUser: res.data.singpassUser as any,
        role:
          getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.seller : USER_GROUP_LOWERCASE.buyer,
      };

      dispatch(userInfoUpdated({ user: res.data.user, token: obj.token, refresh_token: obj.refresh_token }));
      dispatch(userRoleUpdated(obj.role.toLowerCase()));
      dispatch(
        userFromStateUpdated({
          name: res.data.user.name,
          email: res.data.user.email,
          active: obj.role.toLowerCase(),
          isRegister: res.data.isRegistered,
        }),
      );

      await waitSec(2000);
      navigate('/account/entities');
      setVerify(true);
    }
    if (res?.data?.isRegistered === false) {
      // showToast('You have not yet created you account' as string, ToastTypes.ERROR);

      dispatch(
        userFromStateUpdated({
          isNotYetRegistered: true,
          singpass_data: res.data,
          isRegister: res.data.isRegistered,
          registrationToken: res.data?.data?.registrationToken,
        }),
      );

      await waitSec(2000);
      navigate('/create');
      setVerify(true);
    }
  }, [verify]);

  useSafeRender(() => {
    if (!isNull(search.get('code')) && !isNull(search.get('state')) && verify === false) {
      processVerification();
    }
  });

  useEffect(() => {
    if (!isUndefined(data)) {
      dispatch(allCategoriesUpdateAction(data.data));
    }
  }, [data]);

  return (
    <div>
      <NavBar />
      <CategoryListBarComponent navFix={false} />
      <WrapperMain>
        <TopContainerComponent />
        <ExploreMarketPlace />
        <PaymentSecurityComponent />
        <QualityProvideComponent />
        <FeaturesComponent />
        <BecomeSellerComponent />
      </WrapperMain>
      {logoutModal && <LogoutModal />}
    </div>
  );
};

export default HomePage;
