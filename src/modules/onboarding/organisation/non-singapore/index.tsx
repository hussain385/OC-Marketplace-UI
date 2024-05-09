import React, { useCallback, useEffect } from 'react';
import { useSetState } from 'react-use';
import SetupOrganisationStepsComponent from '@/modules/onboarding/components/setup-organisation-steps.component.tsx';
import { RenderIf } from '@/common/components';
import { OrganisationInputView } from '@/modules/onboarding/setup-organisation/organisation-input.view.tsx';
import NonSingaporeForm from '@/modules/onboarding/organisation/non-singapore/nonSingapore.form.tsx';
import { nonSingaporeSchemaType } from '@/modules/onboarding/organisation/non-singapore/schema';
import ReviewDetails from '@/modules/onboarding/organisation/non-singapore/components/review-details.tsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.tsx';
import { isEmpty } from 'lodash';
import { identityUserInfoTempDataUpdated } from '@/redux/reducers/authReducers.ts';

function OrganisationNonSingForm() {
  const { verifying_status } = useAppSelector((state) => state.mainState.useInfo);
  const dispatch = useAppDispatch();
  const [{ step, OrgName, submitData }, setState] = useSetState({
    step: verifying_status?.step ?? 1,
    OrgName: verifying_status?.profile?.detail.name ?? '',
    submitData: verifying_status as nonSingaporeSchemaType | undefined,
  });

  const onSubmit = useCallback((data: nonSingaporeSchemaType) => setState({ step: 3, submitData: data }), [setState]);

  useEffect(() => {
    return () => {
      dispatch(identityUserInfoTempDataUpdated({}));
    };
  }, [dispatch]);

  return (
    <>
      <SetupOrganisationStepsComponent step={step} />
      <RenderIf value={step === 1}>
        <OrganisationInputView
          setOrganisationName={(name) => setState({ OrgName: name })}
          step={step}
          setStep={(step1) => setState({ step: step1 })}
          defaultValue={OrgName}
        />
      </RenderIf>
      <RenderIf value={step === 2}>
        <NonSingaporeForm
          onPrevious={() => setState({ step: 1 })}
          defaultValues={submitData && !isEmpty(submitData) ? submitData : { data: { profile: { detail: { name: OrgName } } } }}
          onSubmit={onSubmit}
        />
      </RenderIf>
      {step === 3 && !!submitData && <ReviewDetails onPrev={() => setState({ step: 2 })} data={submitData} />}
    </>
  );
}

export default OrganisationNonSingForm;
