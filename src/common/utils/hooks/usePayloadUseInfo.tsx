import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../redux/hooks';

const usePayloadUseInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { useInfo } = useAppSelector((state) => state.mainState);

  const {
    verifying_status,
    token,
    user,
    userInviteEmail,
    numberofTries,
    payload,
    userRole,
    selectedEntity,
    step,
    invitationToken,
    skipOption,
    roles,
  } = useInfo;

  if (!isUndefined(verifying_status)) {
    const {
      isSubmittingValues,
      identificationName,
      identificationNumber,
      nationality,
      dataUrl,
      isRetrieve,
      steps,
      basicProfiles,
      addresses,
      appointment,
      isNextChange,
      isExisted,
      singpassId,
      routePath,
      skip,
    } = verifying_status;
    return {
      verifying_status,
      isSubmittingValues,
      identificationName,
      identificationNumber,
      nationality,
      dataUrl,
      token,
      user,
      userInviteEmail,
      numberofTries,
      payload,
      userRole,
      isRetrieve,
      steps,
      basicProfiles,
      addresses,
      appointment,
      isNextChange,
      isExisted,
      step,
      selectedEntity,
      skipOption,
      invitationToken,
      singpassId,
      routePath,
      skip,
      roles,
    };
  } else {
    return {
      token,
      user,
      userInviteEmail,
      numberofTries,
      payload,
      userRole,
      step,
      selectedEntity,
      skipOption,
      invitationToken,
      roles,
    };
  }
};

export default usePayloadUseInfo;
