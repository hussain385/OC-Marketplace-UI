// @flow
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { WrapperMain } from '../../../common/styles/navbar.styles';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ThanksPurchaseBox } from '../../../common/styles/checkout-page.styles';
import FreeTextComponent from '../../../common/components/requirement-form/free-text.component';
import { useForm } from 'react-hook-form';
import { AppThemeBtnComponent } from '../../../common/components/app-theme-btn.component';
import { Color } from '../../../theme';
import SelectQuestionComponent from '../../../common/components/requirement-form/select-question.component';
import { MultiselectQuestionComponent } from '../../../common/components/requirement-form/multiselect-question.component';
import FileUploadQuestionComponent from '../../../common/components/requirement-form/file-upload-question.component';
import { useLocation } from 'react-router-dom';
import { useNavigate } from '@/router.ts';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { mediaUrlGenerator, showToast, ToastTypes } from '../../../common/utils';
import Modal from '../../../common/components/modal.component';
import DetailsMiniComponent from '../../servi-order/components/details-mini';
import SupportCenterComponent from '../../servi-order/components/details-mini/support-center.component';
import { useAppDispatch } from '../../../redux/hooks';
import { useMediaBreakpoint } from '../../../common/components';
import { useActivityActionsMutation, useGetOrderDetailsQuery } from '@/modules/servi-order/Service/order.api.ts';
import { IRequirement } from '@/common/interface/busines-company-profile-interface';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';
import { setSelectedOrder } from '@/modules/servi-order/Service/order.slice.ts';
import { activityType } from '@/modules/servi-order/interface';
import { storePictures } from '@/modules/seller/account/company-profile/company-profile.util.tsx';
import Sidebar from '@/modules/servi-order/sidebar';
import { ILogo } from '@/common/interface';

const DiscardMessage = () => {
  return (
    <Box sx={{ marginBlock: '0.5em' }}>
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Skip submitting requirement?</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 'normal' }}>
        You have to submit requirements to get your order started. Skip anyway?
      </Typography>
    </Box>
  );
};

type componentPropTypes = {
  orderManagement?: boolean;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};

const RequirementForm = ({ orderManagement, setStep }: componentPropTypes) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const {
    data: orderInfo,
    error: getRequirementError,
    isLoading,
  } = useGetOrderDetailsQuery({
    orderId: queryParams.get('orderId') ? `${queryParams.get('orderId')}` : '',
    params: queryBuilder((builder) =>
      builder
        .sortBy({ field: 'subOrders.sequence', order: 'ASC' })
        .sortBy({ field: 'activities.createdAt', order: 'DESC' })
        .sortBy({ field: 'requirements.no', order: 'ASC' })
        .setJoin(
          ['requirements', 'activities', 'statuses', 'currentSubOrder', 'subOrders', 'reviews', 'reviews.ratings'].map((e) => ({
            field: e,
          })),
        ),
    ),
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [answersRecieved, setAnswersRecieved] = useState(false);
  const [requirementquestions, setRequirementquestions] = useState<IRequirement[]>([]);
  const [postOrderRequirements, { error: postAnswersError }] = useActivityActionsMutation();
  const { xs, sm, md, lg } = useMediaBreakpoint();

  useEffect(() => {
    if (!isUndefined(getRequirementError)) {
      const message = getRequirementError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
    if (!isUndefined(postAnswersError)) {
      const message = postAnswersError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [getRequirementError, postAnswersError]);

  useEffect(() => {
    const getRequirementHandler = async () => {
      if (orderInfo) {
        dispatch(setSelectedOrder(orderInfo));
        setRequirementquestions([]);
        setAnswersRecieved(false);
        orderInfo.requirements?.map((value, key: number) => {
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
        //
      }
    };
    getRequirementHandler().then(null);
  }, [orderInfo]);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onFormSubmit = async (data: any) => {
    let error = false;
    {
      requirementquestions.map((value, key) => {
        if (value.type === 'FILE_UPLOAD') {
          if (isEmpty(data[`question${key + 1}File`])) {
            setError(`question${key + 1}File`, { message: 'Upload a file is a mandatory requirement' }, { shouldFocus: true });
            error = true;
          } else {
            setError(`question${key + 1}File`, { message: undefined }, { shouldFocus: false });
          }
        } else {
          if (isEmpty(data[`question${key + 1}`])) {
            setError(`question${key + 1}`, { message: 'This is a mandatory requirement' }, { shouldFocus: true });
            error = true;
          } else {
            setError(`question${key + 1}`, { message: undefined }, { shouldFocus: false });
          }
        }
      });
    }
    if (!error) {
      const promises: any[] = [];
      const formData = new FormData();
      const body = {
        orderId: orderInfo?.id ?? '',
        activity: {
          type: activityType.submitRequirement,
          data: requirementquestions.map((value, key) => {
            let answer;
            if (value.type === 'FREE_TEXT') {
              answer = {
                message: data[`question${key + 1}`],
              };
            } else if (value.type === 'MULTIPLE_CHOICE') {
              answer = {
                choices:
                  value.type === 'MULTIPLE_CHOICE' && value.multipleSelection
                    ? data[`question${key + 1}`].map((value: string) => Number(value))
                    : [Number(data[`question${key + 1}`])],
              };
            } else {
              data[`question${key + 1}File`].forEach(async (fileInfo: { name: string; image: string }) => {
                promises.push(storePictures(fileInfo.name, fileInfo.image, value.uid, true));
              });
              answer = {
                message: data[`question${key + 1}`] ?? '',
                attachs: data[`question${key + 1}File`].map(async (fileInfo: { name: string; image: string }) => fileInfo.name),
              };
            }
            return {
              id: value.uid,
              type: value.type,
              answer: answer,
            };
          }),
        },
      };

      await Promise.all(promises).then(async (data: File[]) => {
        data.forEach((value) => {
          formData.append(value.name, value);
        });
        await postOrderRequirements({ data: body, formData: formData }).unwrap();
        setAnswersRecieved(true);
        setStep && setStep((prevState) => prevState + 1);
        showToast('Requirements submitted successfully.', ToastTypes.SUCCESS);
      });
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <WrapperMain>
        <ThanksPurchaseBox>
          <Box
            sx={{
              width: '10px',
              backgroundColor: '#0F9757',
              borderRadius: '2px 0px 0px 2px',
              height: '100%',
              border: '1px solid #0F9757',
            }}
          />
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: '700' }}>Thanks for your purchase!</Typography>
            <Typography>You may visit the billing page for more info on your payment.</Typography>
          </Box>
        </ThanksPurchaseBox>
        <Box sx={{ display: 'flex', gap: '1em', marginBlock: '2.5em', flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ width: '100%', display: { xs: 'block', md: 'none' } }}>
            {requirementquestions.length !== 0 && <>{!isLoading ? <Sidebar /> : 'Loading sidebar...'}</>}
          </Box>
          <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: xs || sm ? '100%' : '65%' }}>
            <Typography className='subHeading'>
              The seller can only start working on your order once you provide the requested info below.
            </Typography>
            <Box sx={{ border: '1px solid #EAEAEA', paddingInline: '1em', paddingBottom: '1em', marginTop: '1em' }}>
              {requirementquestions.length === 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                  <CircularProgress color={'secondary'} />
                </Box>
              )}
              {requirementquestions.map((value, key) => {
                if (value.type === 'FREE_TEXT') {
                  return (
                    <FreeTextComponent
                      setError={setError}
                      key={key}
                      control={control}
                      errors={errors}
                      questionNo={key + 1}
                      question={value.description}
                      answersRecieved={answersRecieved}
                    />
                  );
                } else if (value.type === 'MULTIPLE_CHOICE' && value.multipleSelection) {
                  return (
                    <MultiselectQuestionComponent
                      setError={setError}
                      key={key}
                      options={value.options ? value.options : []}
                      control={control}
                      errors={errors}
                      questionNo={key + 1}
                      question={value.description}
                      setValue={setValue}
                      answersRecieved={answersRecieved}
                    />
                  );
                } else if (value.type === 'FILE_UPLOAD') {
                  return (
                    <FileUploadQuestionComponent
                      setValue={setValue}
                      requirementId={value.uid}
                      setError={setError}
                      key={key}
                      control={control}
                      errors={errors}
                      questionNo={key + 1}
                      question={value.description}
                      answersRecieved={answersRecieved}
                    />
                  );
                } else if (value.type === 'MULTIPLE_CHOICE') {
                  return (
                    <SelectQuestionComponent
                      setValue={setValue}
                      setError={setError}
                      key={key}
                      options={value.options ? value.options : []}
                      control={control}
                      errors={errors}
                      questionNo={key + 1}
                      question={value.description}
                      answersRecieved={answersRecieved}
                    />
                  );
                }
              })}
            </Box>
            {!answersRecieved && (
              <Box
                sx={{
                  marginBlock: '2em',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  width: '100%',
                  gap: '1em',
                  justifyContent: 'flex-end',
                }}
              >
                {!orderManagement && (
                  <AppThemeBtnComponent
                    type='button'
                    onClick={() => setOpenModal(true)}
                    customButtonStyle={{ height: '40px', border: '1px solid #EFEEEE' }}
                    color={Color.bgGreyDark}
                    backgroundColor={'white'}
                    width={{ xs: '100%', md: '40%' }}
                    fontSize={'14px'}
                    text={'Skip for now'}
                    hover={'#ffffff'}
                  />
                )}
                <AppThemeBtnComponent
                  type='submit'
                  disabled={isSubmitting}
                  customButtonStyle={{ height: '40px' }}
                  color={isSubmitting ? Color.textBlack : Color.priWhite}
                  backgroundColor={isSubmitting ? Color.bgGreyLight : Color.priBlue}
                  width={{ xs: '100%', md: '40%' }}
                  fontSize={'14px'}
                  text={isSubmitting ? 'Please wait...' : 'Start the order'}
                  hover={Color.textHint}
                />
              </Box>
            )}
          </form>
          <Box sx={{ width: '35%', display: { xs: 'none', md: 'block' } }}>
            {requirementquestions.length !== 0 && <>{!isLoading ? <Sidebar /> : 'Loading sidebar...'}</>}
          </Box>
        </Box>
        <Modal
          isOpen={openModal}
          content={<DiscardMessage />}
          okBtnLabel={'Skip'}
          isRedPriButton={true}
          cancelBtnText={'Cancel'}
          onCancel={() => {
            setOpenModal(false);
          }}
          onOk={() => {
            navigate('/account/order-management/:id', {
              params: { id: queryParams.get('orderId')?.toString() ?? '' },
              replace: true,
            });
          }}
        />
      </WrapperMain>
    </Box>
  );
};

export default RequirementForm;
