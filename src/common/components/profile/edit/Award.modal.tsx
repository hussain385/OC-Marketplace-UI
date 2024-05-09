import React, { useCallback, useEffect, useState } from 'react';
import Modal from '@/common/components/modal.component.tsx';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { InferType, mixed, object, string } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Color } from '@/theme.ts';
import InputForm from '@/common/components/forms/input.form.tsx';
import { forEach } from 'lodash';
import {
  useCreateAwardMutation,
  useDeleteAwardMutation,
  useUpdateAwardMutation,
} from '@/modules/servi-profile/service/profile.api';
import DatePickerYearForm from '@/common/components/forms/date-picker.form.tsx';
import { IAward } from '@/modules/servi-profile/interfaces';
import { mediaUrlGenerator } from '@/common/utils';

interface IAwardModal {
  award?: IAward;
  isOpen: boolean;
  onClose: () => void;
  entityId?: string;
}

const awardSchema = object().shape({
  media: mixed()
    .test('fileSize', 'The file is too large.', (value: any) => {
      return value && value.size <= 5000000;
    })
    .required('Please enter award logo.'),
  title: string().required('Title is required'),
  issuer: string().required('Issuer is required'),
  issuerYear: string().required('Year is required'),
  url: string()
    .test(
      'url cheker',
      'Not a valid URL',
      (value) =>
        value === undefined ||
        !!value.match(
          /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
        ),
    )
    .required('URL is required.'),
  description: string().notRequired(),
});

type formType = InferType<typeof awardSchema>;

function AwardModal({ isOpen, onClose, award, entityId }: IAwardModal) {
  const [AddAward, { isLoading: isCreateLoading }] = useCreateAwardMutation();
  const [updateAward, { isLoading: isUpdateLoading }] = useUpdateAwardMutation();
  const [deleteAwardSetup, { isLoading: isDeleteLoading }] = useDeleteAwardMutation();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { handleSubmit, control, reset } = useForm<formType>({
    resolver: yupResolver(awardSchema),
    defaultValues: { ...(award as any) },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }

    return () => reset();
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<formType> = useCallback(
    async (data) => {
      const formData = new FormData();
      forEach(data, (value, key) => value && formData.append(key, value as string | File));

      if (award) {
        await updateAward({ body: formData, awardId: award.id, entityId }).unwrap();
      } else {
        await AddAward({ body: formData, entityId }).unwrap();
      }

      onClose();
    },
    [AddAward, award, entityId, onClose, updateAward],
  );

  const onDelete = useCallback(() => {
    if (award) deleteAwardSetup({ awardId: award.id, entityId });
  }, [award, deleteAwardSetup, entityId]);

  return (
    <Modal
      isForm
      maxWidth={'md'}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onClose}
      isOpen={isOpen}
      okBtnLabel={'Add'}
      noBtnDisplay
      extraFooter={
        <>
          {award ? (
            <ButtonBase sx={{ fontWeight: 600, color: Color.priRed }} onClick={() => setIsDeleteModal(true)}>
              Delete
            </ButtonBase>
          ) : (
            <Box />
          )}
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <ButtonBase onClick={onClose} sx={{ fontWeight: 600, color: Color.textGray2 }}>
              Cancel
            </ButtonBase>
            <Button
              type={'submit'}
              variant={'outlined'}
              sx={{
                color: award ? Color.positive : Color.priBlue,
                borderColor: `${award ? Color.positive : Color.priBlue} !important`,
                textTransform: 'none',
              }}
              disabled={isCreateLoading || isUpdateLoading}
            >
              {award ? 'Update' : 'Add'}
            </Button>
          </Box>

          <Modal
            isBottomSheet
            isRedPriButton
            okBtnLabel={'Delete'}
            isLoading={isDeleteLoading}
            isOpen={isDeleteModal}
            onCancel={() => setIsDeleteModal(false)}
            onOk={onDelete}
            content={
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', mb: '8px' }}>Delete your award / achievement</Typography>
                <Typography>Are you sure you want to delete this award / achievement? This action cannot be undone.</Typography>
              </Box>
            }
          />
        </>
      }
      content={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex' }}>
            <Controller
              name={'media'}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <label htmlFor='awardPic'>
                      <Box
                        sx={{
                          height: '132px',
                          background: field.value
                            ? field.value instanceof File
                              ? `url(${URL.createObjectURL(field.value)})`
                              : `url(${mediaUrlGenerator(field.value as string)})`
                            : Color.bgGreyLight,
                          color: fieldState.error ? Color.priRed : Color.textBlue,
                          backgroundSize: 'cover',
                          backgroundColor: Color.bgGreyLight,
                          backgroundPosition: 'center bottom',
                          backgroundRepeat: 'no-repeat',
                          border: field.value ? 'none' : `1px dashed  ${fieldState.error ? Color.priRed : Color.textBlue}`,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            cursor: 'pointer',
                          },
                          width: '123px',
                        }}
                      >
                        {!field.value && (
                          <Typography sx={{ width: '70%', fontSize: '12px', textAlign: 'center' }}>
                            Tap or drop files here to upload
                          </Typography>
                        )}
                      </Box>
                    </label>
                    <Box sx={{ display: 'none' }}>
                      <input
                        id='awardPic'
                        name='awardPic'
                        type='file'
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0]);
                        }}
                        accept={'image/jpeg, image/png'}
                      />
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: '400',
                          fontSize: '12px',
                          marginTop: '1em',
                          marginLeft: '1em',
                          width: '100%',
                          color: fieldState.error ? 'red' : Color.bgGreyDark,
                        }}
                      >
                        Tip: Choose an image of the award/achievements logo with recommended 400 x 400 px (Minimum 150 x 150 px)
                        <br />
                        .JPG, or .PNG max. 5mb
                      </Typography>

                      {fieldState.error && (
                        <Typography
                          sx={{
                            marginTop: '1em',
                            marginLeft: '1em',
                            color: fieldState.error ? 'red' : Color.bgGreyDark,
                            fontSize: '12px',
                          }}
                        >
                          {fieldState.error?.message}
                        </Typography>
                      )}
                    </Box>
                  </>
                );
              }}
            />
          </Box>
          <InputForm name={'title'} control={control} label={'Title'} labelSx={{ color: '#7E7E7E' }} />
          <InputForm name={'issuer'} control={control} label={'Issuer'} labelSx={{ color: '#7E7E7E' }} />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '12px' }}>
            <DatePickerYearForm control={control} name={'issuerYear'} label={'Year'} labelSx={{ color: '#7E7E7E' }} />
            <InputForm name={'url'} control={control} label={'Url'} labelSx={{ color: '#7E7E7E' }} />
          </Box>
          <InputForm
            name={'description'}
            control={control}
            label={'Description (Optional)'}
            labelSx={{ color: '#7E7E7E' }}
            inputProps={{ multiline: true, sx: { height: 'auto' } }}
          />
        </Box>
      }
    />
  );
}

export default AwardModal;
