import { Box } from '@mui/material';
import { isNull, isUndefined } from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import ServicesOffer from './components/services-offer-component';
import FAQ from './components/frequently-ask-question.component';
import LandingFooter from './components/footer.component';
import GuidelineRoute from './components/guideline-route.component';
import { faQItems } from './utils/mock-data';
import { useSearchParams } from 'react-router-dom';
import { showToast, ToastTypes } from '../../../common/utils';
import { globalSearchFilter, useGlobalLogoutState, useServices } from '../../../common/utils/global_state.util';
import waitSec from '../../../common/utils/helpers/setTimeout';
import useSafeRender from '../../../common/utils/hooks/useSafeRender';
import { useAppDispatch } from '../../../redux/hooks';
import { useLoginwithSingPassMutation } from '../../../redux/apis/authApi';
import { useGetCategoriesQuery } from '../../../redux/apis/catalogApi';
import LogoutModal from '../../../common/components/logout-popup.component';
import HeaderComponent from './components/header.component';
import { GridBoxContainer2 } from '../styles/buyer-header.styles';
import PopupModalBox from '../../../common/components/popup-modal-box';
import ExploreMarketPlace from '../explore-marketplace.component';
import CategoryListBarComponent from '../../../common/components/category-list-bar.component';
import { getCookie } from '../../../common/utils/cookie';
import { userFromStateUpdated, userInfoUpdated, userRoleUpdated } from '../../../redux/reducers/authReducers';
import { allCategoriesUpdateAction } from '../../../redux/reducers/catalogReducer';
import { USER_GROUP_LOWERCASE } from '../../../common/interface';
import NavBar from '@/common/components/navbar';
import { useNavigate } from '@/router';

export interface BoxItem {
  id: number | string;
  icon: string;
}

export interface Categories extends BoxItem {
  text: string;
  description?: string;
}

export interface IService {
  createdAt: string;
  description: undefined | string;
  id: string;
  name: string;
  position: number;
  relations: unknown; // You'll need to define the type of this property
  serviceCategoryId: null | string;
  status: 'ENABLE' | 'DISABLE';
  text: string;
  uid: string;
  updatedAt: string;
  __v: number;
}

const BuyerLandingPage = () => {
  const dispatch = useAppDispatch();

  const { data } = useGetCategoriesQuery({});

  const [logoutModal] = useGlobalLogoutState();

  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loginwithSingPass] = useLoginwithSingPassMutation();

  useServices();

  const [verify, setVerify] = React.useState<boolean>(false);

  useEffect(() => {
    if (!isUndefined(data)) {
      dispatch(allCategoriesUpdateAction(data.data));
    }
  }, [data, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      navigate('/setup-organisation');
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
  const [searchActive] = globalSearchFilter();

  function routeToLogin() {
    dispatch(userFromStateUpdated({ active: 'buyer' }));
    navigate('/login');
  }

  return (
    <Box
      sx={{
        width: { sm: '95%', md: '100%' },
        margin: 'auto',
        position: 'relative',
      }}
    >
      <NavBar />
      <CategoryListBarComponent navFix={false} />
      <Box>
        <Box
          sx={{
            maxWidth: '1440px',
            margin: 'auto',
            display: 'grid',
            minHeight: '100vh',
          }}
        >
          <HeaderComponent />

          <GridBoxContainer2>
            <ExploreMarketPlace />
          </GridBoxContainer2>

          <GridBoxContainer2>
            <ServicesOffer />
          </GridBoxContainer2>

          <GridBoxContainer2>
            <FAQ data={faQItems} />
          </GridBoxContainer2>

          <GuidelineRoute userRoute='buyer' navigateRoute={routeToLogin} />

          <LandingFooter />

          {logoutModal && <LogoutModal />}
        </Box>
      </Box>
      {searchActive && <PopupModalBox parentStyle={{ zIndex: 0 }} />}
    </Box>
  );
};

export default BuyerLandingPage;
