import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../redux/hooks';

const usePayload = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { useInfo } = useAppSelector((state) => state.mainState);

  const {
    username,
    email,
    mobile,
    password,
    countryCode,
    countryName: countryNameGet,
    name,
    active,
    isNotYetRegistered,
    registrationToken,
  } = !isUndefined(useInfo.payload) ? useInfo.payload : '';

  return { email, mobile, countryCode, countryNameGet, password, active, username, name, registrationToken, isNotYetRegistered };
};

export default usePayload;
