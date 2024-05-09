import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../redux/hooks';

const useTeamInvitation = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { teamInvitation } = useAppSelector((state) => state.mainState);

  const { userInviteEmail, invitationToken, userRoleType } = !isUndefined(teamInvitation.invitation)
    ? teamInvitation.invitation
    : '';

  return { userInviteEmail, invitationToken, userRoleType };
};

export default useTeamInvitation;
