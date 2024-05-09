import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { WrapperMain } from '@/common/styles/navbar.styles';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { Color } from '@/theme';
import { useAddRequirementsBulkMutation, useUpdateServicesMutation } from '@/redux/apis/marketplace';
import { useAppSelector } from '@/redux/hooks';
import { subText } from '../../manage-listing/manage-listing-form/overview.view';
import { isEmpty, isUndefined } from 'lodash';
import AddRequirementModalComponent from '../../common-service-components/add-requirement-modal.component';
import { showToast, ToastTypes } from '../../../../common/utils';
import '../component/requirements.css';
import MultipleChoiceViewComponent from '../../common-service-components/multiple-choice-view.component';
import QuitEditingModalComponent from '@/modules/seller/manage-listing/component/quit-editing-modal.component';
import {
  IRequirementsRequest,
  IRequirementsRequestBulk,
  IRequirementState,
} from '@/common/interface/busines-company-profile-interface';
import useGetServiceInfo from '@/modules/seller/hooks/useGetServiceInfo';
import { useNavigate } from 'react-router-dom';

type Props = {
  updateStepCount: (value: number) => void;
  step: number;
  manageListing?: boolean;
};

const defaultRequirement: IRequirementState = {
  id: '',
  edit: false,
  type: 'Free text',
  no: 0,
  isAllowMultipleChoice: false,
  options: [],
  question: '',
  isRequired: false,
};

const Requirements = ({ step, updateStepCount, manageListing }: Props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [requirementData, setRequirementData] = useState<IRequirementState[]>([]);
  const [optionsSetReactSortable, setOptionsSetReactSortable] = useState<boolean>(false);
  const [requirementSelect, setRequirementSelect] = useState<IRequirementState>(defaultRequirement);
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const [addRequirementsBulk, { error: serviceSetupError, isLoading }] = useAddRequirementsBulkMutation();
  const [updateServices, { error: serviceUpdateError, isLoading: serviceUpdateLoading }] = useUpdateServicesMutation();
  const [newQuery, setNewQuery] = useState<boolean>(false);

  const listingEdit = useMemo(
    () => serviceData.edit && serviceData.step > 3,
    [serviceData.edit, serviceData.status, serviceData.step],
  );

  useGetServiceInfo({ setRequirementData, newQuery: newQuery });

  useEffect(() => {
    if (!isUndefined(serviceSetupError)) {
      const message = serviceSetupError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
    if (!isUndefined(serviceUpdateError)) {
      const message = serviceUpdateError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [serviceSetupError, serviceUpdateError]);

  const onSubmitHandler = async () => {
    if (isEmpty(requirementData)) {
      const formData = new FormData();
      if (selectedEntity?.status === 'VERIFIED') {
        formData.append('status', 'ACTIVE');
      }
      formData.append('step', serviceData.step > 3 ? `${serviceData.step}` : '4');
      await updateServices({ body: formData, serviceId: serviceData.uid });
      if (!listingEdit) {
        updateStepCount(step + 1);
      }
    } else {
      const bulk: IRequirementsRequestBulk[] = requirementData.map((requirement) => ({
        id: isEmpty(requirement.id) ? undefined : requirement.id,
        type: requirement.type.replace(' ', '_').toUpperCase(),
        question: requirement.question,
        isRequired: requirement.isRequired,
        no: requirement.no + 1,
        isAllowMultipleChoice:
          requirement.type.replace(' ', '_').toUpperCase() === 'MULTIPLE_CHOICE' ? requirement.isAllowMultipleChoice : null,
        options: requirement.type.replace(' ', '_').toUpperCase() === 'MULTIPLE_CHOICE' ? requirement.options : [],
      }));
      const requirementDataReq: IRequirementsRequest = {
        serviceId: serviceData.uid,
        bulk: bulk,
      };
      await addRequirementsBulk({ data: requirementDataReq });
      setNewQuery(!newQuery);
      const formData = new FormData();
      if (selectedEntity?.status === 'VERIFIED' && serviceData.step === 3) {
        formData.append('status', 'ACTIVE');
      }
      formData.append('step', serviceData.step > 3 ? `${serviceData.step}` : '4');
      await updateServices({ body: formData, serviceId: serviceData.uid });

      if (!listingEdit) {
        updateStepCount(step + 1);
      }
    }
  };

  const scrollToBottom = () => {
    const scrollableDiv = document.getElementById('scrollableDiv');
    if (scrollableDiv) {
      window.scrollTo(0, scrollableDiv?.scrollHeight + 100);
    }
  };

  return (
    <WrapperMain id={'scrollableDiv'}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '100%', marginTop: '3em', minHeight: '60vh' }}>
          <Typography
            sx={(theme) => ({
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: 'normal',
              letterSpacing: '-0.48px',
              color: Color.textBlack,

              [theme.breakpoints.down(321)]: {
                fontSize: '21px',
              },
            })}
          >
            Requirements
          </Typography>
          <Box sx={{ marginTop: '1em' }}>
            <Typography sx={{ my: '8px' }} className='subHeading'>
              Tell your customer exactly what to provide to get started (Optional)
            </Typography>
            <Typography sx={{ ...subText, marginBottom: '1em' }}>
              List all the info you need to get from your customer. Be clear so they can understand what to prepare before you can
              begin working on the order.
            </Typography>
            {requirementData.map((value, key) => {
              const imageName = value.type === 'Free text' ? 'text' : value.type === 'Multiple choice' ? 'checkbox' : 'file';
              if (value.type === 'Multiple choice') {
                return (
                  <MultipleChoiceViewComponent
                    key={key}
                    value={value}
                    setRequirementSelect={(value) => {
                      setRequirementSelect(value);
                      setTimeout(() => {
                        scrollToBottom();
                      }, 500);
                    }}
                    setOptionsSetReactSortable={(value) => setOptionsSetReactSortable(value)}
                  />
                );
              } else {
                return (
                  <Box
                    onClick={() => {
                      setRequirementSelect({ ...value, edit: true });
                      setOptionsSetReactSortable(false);
                      setTimeout(() => {
                        scrollToBottom();
                      }, 500);
                    }}
                    key={key}
                    className={'requirementCard'}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                      <img
                        src={require(`../../../../assets/requirement-icons/${imageName}.png`).default}
                        style={{
                          width: imageName === 'file' ? '18' : '16px',
                          height: imageName === 'file' ? '18.33' : imageName === 'checkbox' ? '16' : '13.33px',
                        }}
                        alt={imageName}
                      />
                      <Typography sx={{ color: '#7E7E7E' }}>{value.type}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>{value.question}</Typography>
                  </Box>
                );
              }
            })}
            <AddRequirementModalComponent
              setRequirementSelect={setRequirementSelect}
              onAddRequirement={(value: IRequirementState) => {
                setRequirementSelect({ ...defaultRequirement, no: requirementData.length + 1 });
                setRequirementData((prevState) => [...prevState, value]);
              }}
              onUpdateRequirement={(value: IRequirementState) => {
                setRequirementSelect({ ...defaultRequirement, no: requirementData.length });
                setRequirementData((prevState) =>
                  prevState.map((state) => {
                    if (state.no === value.no) return value;
                    return state;
                  }),
                );
              }}
              reloadData={() => {
                setNewQuery(!newQuery);
                setRequirementSelect({ ...defaultRequirement, no: requirementData.length + 1 });
              }}
              requirementSelect={requirementSelect}
              optionsSetReactSortable={optionsSetReactSortable}
              setOptionsSetReactSortable={setOptionsSetReactSortable}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginBlock: manageListing ? '1em' : '2em',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: { xs: '100%', md: '70%' },
            gap: '1em',
            justifyContent: 'center',
          }}
        >
          <AppThemeBtnComponent
            type='button'
            customButtonStyle={{
              height: '40px',
              border: `1px solid ${Color.positive}`,
              display: 'block',
              width: { xs: '100%', sm: undefined },
            }}
            color={Color.positive}
            onClick={() => navigate(`/service-detail/${serviceData.uid}`, { state: { id: serviceData.uid } })}
            backgroundColor={'#ffffff'}
            width={'40%'}
            fontSize={'14px'}
            text={'Preview'}
            hover={'rgba(102,209,158,0.15)'}
          />
          <AppThemeBtnComponent
            type='button'
            onClick={onSubmitHandler}
            disabled={serviceUpdateLoading || isLoading || !isEmpty(requirementSelect.question)}
            customButtonStyle={{ height: '40px', display: 'block', width: { xs: '100%', sm: undefined } }}
            color={serviceUpdateLoading || isLoading || !isEmpty(requirementSelect.question) ? Color.textBlack : Color.priWhite}
            backgroundColor={
              serviceUpdateLoading || isLoading || !isEmpty(requirementSelect.question) ? Color.bgGreyLight : Color.priBlue
            }
            width={'40%'}
            fontSize={'14px'}
            hover={Color.textHint}
            text={serviceUpdateLoading || isLoading ? 'Please wait..' : listingEdit ? 'Save' : 'Save and continue'}
          />
        </Box>
        {manageListing && (
          <AppThemeBtnComponent
            type='button'
            onClick={() => setOpenModal(true)}
            customButtonStyle={{
              height: '40px',
              border: `1px solid ${Color.priRed}`,
              display: { xs: 'block', md: 'none' },
            }}
            color={Color.priRed}
            backgroundColor={'white'}
            width={{ xs: '100%', md: '40%' }}
            fontSize={'14px'}
            text={'Quit editing'}
            hover={'#ffffff'}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: { xs: '100%', md: '70%' },
            width: '100%',
            marginBottom: '2em',
          }}
        >
          <Button
            sx={{ color: 'black', textTransform: 'none' }}
            onClick={() => {
              updateStepCount(step - 1);
            }}
          >
            <Typography>{'<- Previous'}</Typography>
          </Button>
        </Box>
        <QuitEditingModalComponent
          openModal={openModal}
          setOpenModal={setOpenModal}
          onSave={onSubmitHandler}
          saveLoading={serviceUpdateLoading || isLoading}
          isDirty={false}
        />
      </div>
    </WrapperMain>
  );
};

export default Requirements;
