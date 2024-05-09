import React, { useRef } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useDropArea } from 'react-use';
import { Box, Button, FormControl, FormHelperText, FormLabel, SxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Color } from '@/theme.ts';
import { AiOutlineClose } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa6';

interface IUpload<T extends FieldValues> {
  control: UseControllerProps<T>;
  label?: string;
  labelSx?: SxProps;
  isDisabled?: boolean;
  formSx?: React.CSSProperties | SxProps;
}

export const MuiBox = styled(Box)(({ theme }) => ({
  height: '144px',
  fontSize: '12px',
  background: 'white',
  color: Color.textBlue,
  borderRadius: '4px',
  border: `1px dashed  ${Color.textHint} !important`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('md')]: {
    width: '320px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const MuiCancelBox = styled(Button)(() => ({
  minWidth: '0px',
  width: '25px',
  height: '25px',
  position: 'absolute',
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'center',
  zIndex: 10,
  borderRadius: '100%',
  right: 5,
  top: 5,
  alignItems: 'center',
  backgroundColor: '#eeee',
  '&:hover': {
    backgroundColor: 'rgba(139,139,139,0.69)',
  },
}));

function UploadForm<T extends FieldValues>({ label, control, labelSx, isDisabled, formSx }: IUpload<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(control);
  const [bond] = useDropArea({
    onFiles: (files) => !isDisabled && field.onChange(files?.[0]),
  });
  const inputRef = useRef<HTMLInputElement>(null);

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
      <MuiBox
        {...bond}
        sx={{
          position: 'relative',
          '&:hover': {
            cursor: isDisabled ? undefined : 'pointer',
          },
        }}
        onClick={() => inputRef.current?.click()}
      >
        {field.value ? (
          <>
            <img
              width='320'
              height='144'
              src={(field.value as any) instanceof File ? URL.createObjectURL(field.value) : field.value}
              alt=''
              style={{
                objectFit: 'contain',
                padding: '5px',
              }}
            />
            {!isDisabled && (
              <MuiCancelBox
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange(undefined);
                }}
              >
                <AiOutlineClose style={{ fontSize: '10em' }} color='black' />
              </MuiCancelBox>
            )}
          </>
        ) : (
          <FaImage style={{ color: '#89AFF8', fontSize: '4em' }} />
        )}
      </MuiBox>
      <input
        disabled={isDisabled}
        type='file'
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          field.onChange(e.target.files?.[0]);
        }}
        accept={'image/*'}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

export default UploadForm;
