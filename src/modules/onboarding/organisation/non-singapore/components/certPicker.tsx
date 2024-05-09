import React, { useRef } from 'react';
import { FormLabel, GreyRoundedContainer } from '@/common/styles';
import { Box, FormHelperText, Typography } from '@mui/material';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component.tsx';
import { Color } from '@/theme.ts';
import { selectErrorStyleHelperText } from '@/common/styles/select-input-form.styles.ts';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

interface ICertPicker {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  // formState: UseFormStateReturn<TFieldValues>;
}

function CertPicker({ field, fieldState }: ICertPicker) {
  const uploadDocRef = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <FormLabel sx={{ marginBottom: '0.7em' }}>Business registration certificate</FormLabel>
      <Box sx={{ display: 'flex', gap: '0.7em', alignItems: 'center' }}>
        <input
          ref={uploadDocRef}
          style={{ display: 'none' }}
          type={'file'}
          onChange={(e) => {
            field.onChange(e.target.files?.[0]);
          }}
        />
        <AppThemeBtnComponent
          onClick={() => uploadDocRef.current?.click()}
          customButtonStyle={{
            border: `1px solid ${Color.bgLine}`,
            padding: '10px 16px',
            display: 'block',
            minWidth: '95px',
          }}
          text={'+ Upload'}
          color={'black'}
          fontSize={'14px'}
        />
        <GreyRoundedContainer sx={{ width: '84%', justifyContent: 'flex-start', gap: '12px' }}>
          <img alt={'file'} src={require('@/assets/icons/file.svg').default} />
          <Typography>
            {!field.value ? 'No file uploaded' : field.value instanceof File ? field.value.name : 'File uploaded'}
          </Typography>
        </GreyRoundedContainer>
      </Box>
      <FormHelperText sx={{ margin: 0, mt: '4px' }} error={!!fieldState.error}>
        <span style={selectErrorStyleHelperText}>{fieldState.error?.message}</span>
      </FormHelperText>
    </Box>
  );
}

export default CertPicker;
