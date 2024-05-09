import React, { useCallback, useState } from 'react';
import Modal from '@/common/components/modal.component.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import InputForm from '@/common/components/forms/input.form.tsx';
import {
  useCreateEmploymentMutation,
  useDeleteEmploymentMutation,
  useUpdateEmploymentMutation,
} from '@/modules/servi-profile/service/profile.api.ts';
import { InferType, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TEmployement } from '@/modules/servi-profile/interfaces';

interface IEmploymentModal {
  isOpen: boolean;
  onClose: () => void;
  emp?: TEmployement;
  entityId?: string;
}

const schema = object({
  title: string().required('Employment Title is required'),
  years: number().required('Years Served is required'),
  companyName: string().required('Company Name is required'),
});

type SchemaType = InferType<typeof schema>;

function EmploymentModal({ isOpen, onClose, emp, entityId }: IEmploymentModal) {
  const [CreateEmp, { isLoading: isCreateLoading }] = useCreateEmploymentMutation();
  const [UpdateEmp, { isLoading: isUpdateLoading }] = useUpdateEmploymentMutation();
  const [DeleteEmp, { isLoading: isDeleteLoading }] = useDeleteEmploymentMutation();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...(emp as any) },
  });

  /**
   * On Update or Create Employment
   */
  const onSubmit: SubmitHandler<SchemaType> = useCallback(
    async (data) => {
      if (emp) {
        await UpdateEmp({ empId: emp.id, body: data, entityId }).unwrap();
      } else {
        await CreateEmp({ body: data, entityId }).unwrap();
      }

      onClose();
    },
    [CreateEmp, UpdateEmp, emp, entityId, onClose],
  );

  /**
   * On delete Employment
   */
  const onDelete = useCallback(() => {
    if (emp) DeleteEmp({ empId: emp.id, entityId });
  }, [DeleteEmp, emp, entityId]);

  return (
    <Modal
      isForm
      onCancel={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
      okBtnLabel={'Add'}
      maxWidth={'md'}
      noBtnDisplay
      extraFooter={
        <>
          {emp ? (
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
              sx={{ color: Color.priBlue, borderColor: `${Color.priBlue} !important`, textTransform: 'none' }}
              disabled={isCreateLoading || isUpdateLoading}
            >
              {emp ? 'Update' : 'Add'}
            </Button>
          </Box>

          <Modal
            isBottomSheet
            isRedPriButton
            okBtnLabel={'Delete'}
            isOpen={isDeleteModal}
            onCancel={() => setIsDeleteModal(false)}
            onOk={onDelete}
            isLoading={isDeleteLoading}
            content={
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', mb: '8px' }}>Delete this certification?</Typography>
                <Typography>This action cannot be undone. Delete anyway?</Typography>
              </Box>
            }
          />
        </>
      }
      content={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InputForm name={'title'} control={control} label={'Employment Title'} labelSx={{ color: '#7E7E7E' }} />
          <InputForm name={'companyName'} control={control} label={'Company Name'} labelSx={{ color: '#7E7E7E' }} />
          <InputForm
            name={'years'}
            control={control}
            label={'Years Served'}
            labelSx={{ color: '#7E7E7E' }}
            inputProps={{ type: 'number' }}
          />

          {/*<SelectForm*/}
          {/*  name={'years'}*/}
          {/*  control={control}*/}
          {/*  items={[]}*/}
          {/*  placeholder={'Year'}*/}
          {/*  label={'Years Served'}*/}
          {/*  labelSx={{ color: '#7E7E7E' }}*/}
          {/*/>*/}
        </Box>
      }
    />
  );
}

export default EmploymentModal;
