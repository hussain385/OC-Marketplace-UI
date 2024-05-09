/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import FreeTextComponent from '@/common/components/requirement-form/free-text.component';
import { MultiselectQuestionComponent } from '@/common/components/requirement-form/multiselect-question.component';
import FileUploadQuestionComponent from '@/common/components/requirement-form/file-upload-question.component';
import SelectQuestionComponent from '@/common/components/requirement-form/select-question.component';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { Color } from '@/theme';
import { useForm } from 'react-hook-form';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { pictureCustomName, showToast, ToastTypes } from '@/common/utils';
import { usePostOrderRequirementsMutation } from '@/redux/apis/transactionApi';
import { IRequirement } from '@/common/interface/busines-company-profile-interface';
import { useAppSelector } from '@/redux/hooks.tsx';
import { json } from 'react-router-dom';
import { storePictures } from '@/modules/seller/account/company-profile/company-profile.util.tsx';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import { activityType } from '@/modules/servi-order/interface';

type componentPropType = {
  requirementquestions: IRequirement[];
  answersRecieved: boolean;
  setAnswersRecieved: React.Dispatch<React.SetStateAction<boolean>>;
};

const RequirementUIBuyer = ({ requirementquestions, answersRecieved, setAnswersRecieved }: componentPropType) => {
  const [postOrderRequirements, { error: postAnswersError }] = useActivityActionsMutation();
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);

  useEffect(() => {
    if (!isUndefined(postAnswersError)) {
      const message = postAnswersError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [postAnswersError]);

  useEffect(() => {
    requirementquestions.map((value, key) => {
      if (!isUndefined(value.answers) && !isEmpty(value.answers)) {
        setValue(
          `question${key + 1}`,
          value.type === 'MULTIPLE_CHOICE' && value.multipleSelection
            ? value.answers
            : value.type === 'MULTIPLE_CHOICE'
              ? value.answers[0]
              : value.answers,
        );
      }
      if (value.type === 'FILE_UPLOAD' && !isNull(value.attachs)) {
        setValue(`question${key + 1}File`, value.attachs);
      }
    });
  }, [requirementquestions]);

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
            setError(`question${key + 1}`, { message: 'This is a mandatory requirement.' }, { shouldFocus: true });
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
        orderId: selectedOrder?.id ?? '',
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
        showToast('Requirements submitted successfully.', ToastTypes.SUCCESS);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
          <AppThemeBtnComponent
            type='submit'
            disabled={isSubmitting}
            customButtonStyle={{ height: '40px' }}
            color={isSubmitting ? Color.textBlack : Color.priWhite}
            backgroundColor={isSubmitting ? Color.bgGreyLight : Color.priBlue}
            width={'40%'}
            fontSize={'14px'}
            text={isSubmitting ? 'Please wait...' : 'Start the order'}
            hover={Color.textHint}
          />
        </Box>
      )}
    </form>
  );
};

export default RequirementUIBuyer;
