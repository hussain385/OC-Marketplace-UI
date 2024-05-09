import React, { useCallback } from 'react';
import AchievementTile from '@/common/components/profile/edit/achievementTile.tsx';
import { Box } from '@mui/material';
import AwardModal from '@/common/components/profile/edit/Award.modal.tsx';
import { useSetState } from 'react-use';
import CertificateModal from '@/common/components/profile/edit/Certificate.modal.tsx';
import EmploymentModal from '@/common/components/profile/edit/Employment.modal.tsx';
import SkillsModal from '@/common/components/profile/edit/Skills.modal.tsx';
import { SkillTags } from '@/modules/servi-profile/components/skills.view.tsx';
import { Certificates } from '@/modules/servi-profile/components/certificates.view.tsx';
import { Awards } from '@/modules/servi-profile/components/awards.view.tsx';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';
import { useAppSelector } from '@/redux/hooks.tsx';
import EmploymentView from '@/modules/servi-profile/components/employment.view.tsx';

interface IAchievements {
  entityId?: string;
  isPastEmp?: boolean;
}

function Achievements({ entityId, isPastEmp }: IAchievements) {
  const [{ isModal }, setState] = useSetState({ isModal: null as null | 'award' | 'skill' | 'cert' | 'emp' });
  const selectedEntity = useAppSelector((state) => state.mainState.useInfo.selectedEntity);
  const { data } = useGetEntityInfoQuery(
    { entityId: entityId ?? selectedEntity?.uid ?? '' },
    { skip: !entityId && !selectedEntity },
  );

  const onClose = useCallback(() => {
    setState({ isModal: null });
  }, [setState]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Box>
        <AchievementTile
          label={'Your awards/achievements'}
          buttonLabel={'+ Add awards/achievements'}
          onClick={() => setState({ isModal: 'award' })}
        />
        <Awards isEdit isHeading={false} overRideEntity={entityId} />
      </Box>

      {/** Skills */}
      <Box>
        <AchievementTile label={'Your skills'} buttonLabel={'+ Set skills'} onClick={() => setState({ isModal: 'skill' })} />
        {(data?.data.skills.length ?? 0) > 0 && (
          <Box sx={{ padding: '16px', border: '1px solid #EAEAEA', mt: '16px' }}>
            <SkillTags entityId={entityId} />
          </Box>
        )}
      </Box>

      {/** Certifications */}
      <Box>
        <AchievementTile
          label={'Your certifications'}
          buttonLabel={'+ Add certifications'}
          onClick={() => setState({ isModal: 'cert' })}
        />
        <Certificates isHeading={false} isEdit overRideEntity={entityId} />
      </Box>

      {isPastEmp && (
        <Box>
          <AchievementTile
            label={'Your past employment'}
            buttonLabel={'+ Add past employment'}
            onClick={() => setState({ isModal: 'emp' })}
          />
          <EmploymentView isEdit overRideEntity={entityId} />
        </Box>
      )}

      <AwardModal isOpen={isModal === 'award'} onClose={onClose} entityId={entityId} />
      <SkillsModal isOpen={isModal === 'skill'} onClose={onClose} entityId={entityId} />
      <CertificateModal isOpen={isModal === 'cert'} onClose={onClose} entityId={entityId} />
      <EmploymentModal isOpen={isModal === 'emp'} onClose={onClose} entityId={entityId} />
    </Box>
  );
}

export default Achievements;
