import { useAppSelector } from '../../../redux/hooks';

const usePayloadUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { useInfo } = useAppSelector((state) => state.mainState);

  const { email, name } = useInfo.user ? useInfo.user : { email: '', name: '' };

  return { email, name };
};

export default usePayloadUser;
