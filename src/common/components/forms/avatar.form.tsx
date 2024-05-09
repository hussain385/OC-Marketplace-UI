import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Box, FormControl, FormHelperText, FormLabel, OutlinedInputProps, styled, SxProps, Typography } from '@mui/material';
import React, { ElementRef, useRef } from 'react';
import { BsCamera } from 'react-icons/bs';
import { Color } from '@/theme.ts';
import { useDropArea } from 'react-use';
import { mediaUrlGenerator } from '@/common/utils';

type IProps<T extends FieldValues> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputProps?: OutlinedInputProps;
  isHidden?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  sx?: SxProps;
  labelSx?: SxProps;
  renderLabel?: React.ReactNode;
} & UseControllerProps<T>;

const Figure = styled('figure')`
  background-color: transparent;
  color: #fff;
  display: inline-block;
  margin: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;

  & * {
    box-sizing: border-box;
    transition: all 0.45s ease;
  }

  &:before,
  &:after {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    transition: all 0.3s ease;
    z-index: 1;
    opacity: 0;
    transform: scaleY(2);
  }

  & img {
    vertical-align: top;
    max-width: 100%;
    backface-visibility: hidden;
  }

  & figcaption {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.1em;
    opacity: 0;
    z-index: 2;
    transition-delay: 0.1s;
    font-size: 24px;
    font-family: sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  &:hover:before,
  &:hover:after {
    transform: scale(1);
    opacity: 1;
  }

  &:hover > img {
    opacity: 0.7;
  }

  &:hover figcaption {
    opacity: 1;
  }
`;

const AvatarForm = <T extends FieldValues>({
  label,
  isDisabled,
  isRequired,
  inputProps,
  isHidden,
  endAdornment,
  startAdornment,
  sx,
  labelSx,
  renderLabel,
  ...control
}: IProps<T>) => {
  const inputRef = useRef<ElementRef<'input'>>(null);
  const {
    field,
    fieldState: { error },
  } = useController(control);
  const [bond, { over }] = useDropArea({
    onFiles: (files) => !isDisabled && field.onChange(files?.[0]),
  });

  return (
    <FormControl
      fullWidth
      error={!!error}
      hidden={isHidden}
      required={isRequired}
      disabled={isDisabled}
      sx={{
        '& label.Mui-focused': {
          color: 'inherit',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.87)!important',
        },
        ...sx,
      }}
    >
      {(label || renderLabel) && (
        <FormLabel
          htmlFor={field.name}
          sx={{
            color: '#000000',
            mb: '8px',
            fontWeight: 600,
            fontSize: '14px',
            '&.Mui-disabled': {
              color: 'black',
            },
            ...labelSx,
          }}
        >
          {label ?? renderLabel}
        </FormLabel>
      )}

      <Box
        {...bond}
        sx={{
          width: '150px',
          height: '150px',
          border: field.value ? 'none' : `1px dashed  ${Color.textBlue}`,
          color: Color.textBlue,
          backgroundSize: 'contain',
          backgroundColor: over ? Color.bgGreyLight : 'white',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          borderRadius: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => inputRef.current?.click()}
      >
        {field.value ? (
          <Figure>
            <img
              style={{ width: '100%', height: '100%' }}
              alt='profile'
              src={(field.value as any) instanceof File ? URL.createObjectURL(field.value) : mediaUrlGenerator(field.value)}
            />
            <figcaption>
              <BsCamera size='35' />
            </figcaption>
          </Figure>
        ) : (
          <Typography sx={{ width: '70%', fontSize: '12px', textAlign: 'center' }}>Tap or drop files here to upload</Typography>
        )}
      </Box>

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

      <Typography
        sx={{
          fontWeight: '400',
          fontSize: '12px',
          color: Color.bgGreyDark,
          marginTop: '12px',
          width: '100%',
        }}
      >
        <span style={{ fontWeight: '700' }}>Tip:</span> Choose an image that represents you/your brand.
        <br />
        <span style={{ fontWeight: '700' }}>Recommended:</span> 400 x 400 px (min. 150 x 150 px) |{' '}
        <span style={{ fontWeight: '700' }}>Format:</span> .jpg or .png |{' '}
        <span style={{ fontWeight: '700' }}>Max file size:</span> 5 MB
      </Typography>

      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default AvatarForm;
