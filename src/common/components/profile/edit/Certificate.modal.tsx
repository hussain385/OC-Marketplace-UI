import React, { useCallback, useState } from 'react';
import Modal from '@/common/components/modal.component.tsx';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { InferType, object, string } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from '@/common/components/forms/input.form.tsx';
import SelectForm from '@/common/components/forms/select.form.tsx';
import { Color } from '@/theme.ts';
import DatePicker from 'react-datepicker';
import { CalenderCustomHeader, CalenderCustomInput } from '@/modules/seller/account/company-profile/company-info.component.tsx';
import {
  useCreateCertificateMutation,
  useDeleteCertificateMutation,
  useUpdateCertificateMutation,
} from '@/modules/servi-profile/service/profile.api.ts';
import { ICertificate } from '@/modules/servi-profile/interfaces';

interface ICertificateModal {
  isOpen: boolean;
  onClose: () => void;
  cert?: ICertificate;
  entityId?: string;
}

const schema = object().shape({
  title: string().required(),
  issuer: string().required(),
  issuedMonth: string().required(),
  issuedYear: string().required(),
  expiredMonth: string().notRequired(),
  expiredYear: string().notRequired(),
  url: string().required(),
  certId: string().required(),
});

type SchemaType = InferType<typeof schema>;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((m) => ({ label: m, value: m }));

function CertificateModal({ isOpen, onClose, cert, entityId }: ICertificateModal) {
  const [CreateCert, { isLoading: isCreateLoading }] = useCreateCertificateMutation();
  const [UpdateCert, { isLoading: isUpdateLoading }] = useUpdateCertificateMutation();
  const [DeleteCert, { isLoading: isDeleteLoading }] = useDeleteCertificateMutation();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: cert,
  });

  /**
   * On create or update
   */
  const onSubmit: SubmitHandler<SchemaType> = useCallback(
    async (data) => {
      if (cert) {
        await UpdateCert({ certId: cert.id, body: data, entityId }).unwrap();
      } else {
        await CreateCert({ body: data, entityId }).unwrap();
      }

      onClose();
    },
    [CreateCert, UpdateCert, cert, entityId, onClose],
  );

  /**
   * on Delete
   */
  const onDelete = useCallback(() => {
    if (cert) DeleteCert({ certId: cert.id, entityId });
  }, [DeleteCert, cert, entityId]);

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
          {cert ? (
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
                color: cert ? Color.positive : Color.priBlue,
                borderColor: `${cert ? Color.positive : Color.priBlue} !important`,
                textTransform: 'none',
              }}
              disabled={isCreateLoading || isUpdateLoading}
            >
              {cert ? 'Update' : 'Add'}
            </Button>
          </Box>

          <Modal
            isBottomSheet
            isRedPriButton
            okBtnLabel={'Delete'}
            isOpen={isDeleteModal}
            onOk={onDelete}
            onCancel={() => setIsDeleteModal(false)}
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
          <InputForm name={'title'} control={control} label={'Certification Name'} labelSx={{ color: '#7E7E7E' }} />
          <InputForm name={'issuer'} control={control} label={'Issue Organization'} labelSx={{ color: '#7E7E7E' }} />

          <Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: '8px', color: '#7E7E7E' }}>Issue Date</Typography>
            <Box sx={{ display: 'flex', gap: '12px' }}>
              <SelectForm name={'issuedMonth'} control={control} items={months} placeholder={'Month'} />
              <Controller
                name={'issuedYear'}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Box sx={{ width: '100%' }}>
                      <DatePicker
                        minDate={new Date(1800, 0, 1)}
                        selected={!field.value ? undefined : new Date(Number(field.value), 0, 1)}
                        renderCustomHeader={({ increaseYear, decreaseYear, date, nextYearButtonDisabled }) => (
                          <CalenderCustomHeader
                            increaseYear={increaseYear}
                            decreaseYear={decreaseYear}
                            date={date}
                            nextYearButtonDisabled={nextYearButtonDisabled}
                          />
                        )}
                        onChange={(date) => {
                          field.onChange(date?.getFullYear());
                        }}
                        filterDate={(date) => {
                          return !(date > new Date());
                        }}
                        yearItemNumber={12}
                        customInput={
                          <CalenderCustomInput
                            error={!!fieldState.error?.message}
                            emptyContainerString='Year'
                            sx={{ borderColor: fieldState.error ? '#e11900' : 'rgba(0, 0, 0, 0.23)' }}
                          />
                        }
                        maxDate={new Date()}
                        showYearPicker
                        dateFormat='yyyy'
                      />
                    </Box>
                  );
                }}
              />
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: '8px', color: '#7E7E7E' }}>
              Expiration Date (optional)
            </Typography>
            <Box sx={{ display: 'flex', gap: '12px' }}>
              <SelectForm name={'expiredMonth'} control={control} items={months} placeholder={'Month'} />
              <Controller
                name={'expiredYear'}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Box sx={{ width: '100%' }}>
                      <DatePicker
                        minDate={new Date(1800, 0, 1)}
                        selected={!field.value ? undefined : new Date(Number(field.value), 0, 1)}
                        renderCustomHeader={({ increaseYear, decreaseYear, date, nextYearButtonDisabled }) => (
                          <CalenderCustomHeader
                            increaseYear={increaseYear}
                            decreaseYear={decreaseYear}
                            date={date}
                            nextYearButtonDisabled={nextYearButtonDisabled}
                          />
                        )}
                        onChange={(date) => {
                          field.onChange(date?.getFullYear());
                        }}
                        filterDate={(date) => {
                          return !(date > new Date());
                        }}
                        yearItemNumber={12}
                        customInput={
                          <CalenderCustomInput
                            error={!!fieldState.error}
                            emptyContainerString='Year'
                            sx={{ borderColor: fieldState.error ? '#e11900' : 'rgba(0, 0, 0, 0.23)' }}
                          />
                        }
                        maxDate={new Date()}
                        showYearPicker
                        dateFormat='yyyy'
                      />
                    </Box>
                  );
                }}
              />
            </Box>
          </Box>

          <InputForm name={'certId'} control={control} label={'Certification ID'} labelSx={{ color: '#7E7E7E' }} />
          <InputForm name={'url'} control={control} label={'Certification URL'} labelSx={{ color: '#7E7E7E' }} />
        </Box>
      }
    />
  );
}

export default CertificateModal;
