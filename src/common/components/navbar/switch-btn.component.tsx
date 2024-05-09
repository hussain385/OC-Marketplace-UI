import React, { useState } from 'react';
import { Color } from '../../../theme';
import { setCookie } from '@/common/utils/cookie';
import { USER_GROUP_LOWERCASE } from '@/common/interface';
import SwitchBuyerSellerModal from '@/common/components/switch-buyer-seller-modal.component';
import { Button } from '@mui/material';
import { loginBtnStyles } from '@/common/styles/navbar.styles';
import { isEmpty } from 'lodash';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';
import { setClientType, userFromStateUpdated } from '@/redux/reducers/authReducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useNavigate } from '@/router';

const SwitchBtnComponent = ({ customStyles }: { customStyles?: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = usePayloadUseInfo();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { clientType } = useAppSelector((state) => state.mainState.useInfo);

  const userRoute = () => {
    if (isEmpty(user)) {
      navigateToHomePage();
    } else {
      setIsOpen(true);
    }
  };

  const navigateToHomePage = () => {
    setCookie(
      'x-client-type',
      clientType === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.buyer : USER_GROUP_LOWERCASE.seller,
      1,
    );
    dispatch(
      setClientType(clientType === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.buyer : USER_GROUP_LOWERCASE.seller),
    );
    dispatch(
      userFromStateUpdated({
        email: '',
        active: clientType === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.buyer : USER_GROUP_LOWERCASE.seller,
      }),
    );
    if (clientType === USER_GROUP_LOWERCASE.buyer) {
      navigate('/seller');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Button
        onClick={userRoute}
        sx={{
          ...loginBtnStyles,
          backgroundColor: Color.priBlue,
          color: 'white',
          minWidth: '8rem',
          '&:hover': {
            backgroundColor: Color.priBlue,
          },
          ...customStyles,
        }}
      >
        {isEmpty(user) ? 'Be a ' : 'Switch to '}{' '}
        {clientType === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.buyer : USER_GROUP_LOWERCASE.seller}
      </Button>
      <SwitchBuyerSellerModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
};

export default SwitchBtnComponent;
