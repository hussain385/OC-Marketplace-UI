import { isNull, isUndefined } from 'lodash';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ShadowBox } from '@/common/styles';
import RequirementUIBuyer from './requirement-ui-buyer';
import RequirementUiSeller from './requirement-ui-seller';
import { ReactComponent as WarningIcon } from '@/assets/order-icon/warning.svg';
import { getCookie } from '@/common/utils/cookie';
import { IRequirement } from '@/common/interface/busines-company-profile-interface';
import { useAppSelector } from '@/redux/hooks.tsx';
import { mediaUrlGenerator } from '@/common/utils';
import { ILogo } from '@/common/interface';

const Requirements = () => {
  const [answersRecieved, setAnswersRecieved] = useState(false);
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const { selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const [requirementquestions, setRequirementquestions] = useState<IRequirement[]>([]);

  useEffect(() => {
    const getRequirementHandler = async () => {
      setRequirementquestions([]);
      selectedOrder?.requirements?.map((value, key: number) => {
        setRequirementquestions((prevState) => {
          return [
            ...prevState,
            {
              uid: value.id,
              description: value.question.question,
              type: value.question.type,
              edit: false,
              options: value.question.options,
              multipleSelection: value.question.isAllowMultipleChoice,
              answers: value.answer?.message ?? value.answer?.choices,
              attachs: value.answer?.attachs?.map((value: ILogo) => ({
                url: mediaUrlGenerator(value),
                originalName: value.originalname,
                fileType: value.mimetype,
                size: value.size,
              })),
            },
          ];
        });
        if (!isUndefined(value.answer) && !isNull(value.answer)) {
          setAnswersRecieved(true);
        }
      });
    };
    getRequirementHandler().then(null);
  }, [selectedOrder]);

  return (
    <>
      {!answersRecieved && getCookie('x-client-type') === 'seller' && (
        <ShadowBox sx={{ marginBottom: '1em', display: 'flex', alignItems: 'center' }}>
          <WarningIcon style={{ marginRight: '10px', width: '2.1em', height: '2.1em' }} />
          <div>
            This order can be started once <strong>{selectedOrder?.buyer.profile.detail.name}</strong> provides the requirements.
            You&apos;ll be notified once the requirements are submitted.
          </div>
        </ShadowBox>
      )}
      {!answersRecieved && selectedOrder?.buyer.id === selectedRole?.entityId && (
        <ShadowBox sx={{ marginBottom: '1em', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <WarningIcon style={{ marginRight: '10px', width: '2.1em', height: '2.1em' }} />
          <div>Submit requirements to get your order started.</div>
        </ShadowBox>
      )}
      <ShadowBox>
        <Box sx={{ width: '90%' }}>
          {selectedOrder?.seller.id === selectedRole?.entityId ? (
            <RequirementUiSeller requirementquestions={requirementquestions} answersRecieved={answersRecieved} />
          ) : (
            <RequirementUIBuyer
              requirementquestions={requirementquestions}
              answersRecieved={answersRecieved}
              setAnswersRecieved={setAnswersRecieved}
            />
          )}
        </Box>
      </ShadowBox>
    </>
  );
};

export default Requirements;
