import React, { useRef, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useDropArea } from 'react-use';
import { Box, FormControl, FormHelperText, FormLabel, SxProps } from '@mui/material';
import { Color } from '@/theme.ts';
import { SecondryButton } from '@/common/styles';
import { isEmpty, isUndefined } from 'lodash';
import ClearIcon from '@mui/icons-material/Clear';

interface IUpload<T extends FieldValues> {
  control: UseControllerProps<T>;
  label?: string;
  labelSx?: SxProps;
  isDisabled?: boolean;
  formSx?: React.CSSProperties | SxProps;
}

function FileUploadComponent<T extends FieldValues>({ label, control, labelSx, isDisabled, formSx }: IUpload<T>) {
  const [fileName, setFileName] = useState<string>('');
  const {
    field,
    fieldState: { error },
  } = useController(control);
  const [bond] = useDropArea({
    onFiles: (files) => !isDisabled && field.onChange(files?.[0]),
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setFileName('');
    field.onChange(undefined);
  };

  return (
    <FormControl error={!!error} sx={{ width: '100%', ...formSx }}>
      {label && (
        <FormLabel
          htmlFor={field.name}
          sx={{
            color: Color.textHint,
            mb: '8px',
            fontWeight: 600,
            fontSize: '12px',
            letterSpacing: '-0.5px',
            ...labelSx,
          }}
          disabled={isDisabled}
        >
          {label}
        </FormLabel>
      )}
      <Box {...bond} sx={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
        <SecondryButton
          onClick={() => inputRef?.current?.click()}
          type={'button'}
          sx={{
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid #eaeaea',
            minWidth: '13em',
            width: '30%',
          }}
        >
          + Upload File
        </SecondryButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F6F6F6',
            borderRadius: '5px',
            width: '100%',
            paddingInline: '1.5em',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em' }}>
            <img alt={'file'} src={require('@/assets/icons/file.svg').default} />
            {isUndefined(field.value) ? (
              'No files uploaded'
            ) : (field.value as any) instanceof File ? (
              fileName
            ) : (
              <a href={field.value} target={'_blank'} rel={'noreferrer'}>
                Proof of residence
              </a>
            )}
          </Box>
          {!isEmpty(fileName) && (
            <ClearIcon onClick={handleCancel} sx={{ color: Color.negative, fontSize: '14px', marginLeft: '10px' }} />
          )}
        </Box>
      </Box>
      <input
        disabled={isDisabled}
        type='file'
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          field.onChange(e.target.files?.[0]);
          setFileName(e.target.files?.[0].name ? e.target.files?.[0].name : '');
        }}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

export default FileUploadComponent;
