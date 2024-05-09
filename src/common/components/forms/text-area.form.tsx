import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  styled,
  SxProps,
  TextareaAutosize as BaseTextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from '@mui/material';
import { Color } from '../../../theme';
import { isEmpty } from 'lodash';

type IProps<T extends FieldValues> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputProps?: TextareaAutosizeProps;
  isHidden?: boolean;
  sx?: SxProps;
  inputSx?: SxProps;
  labelSx?: SxProps;
  renderLabel?: React.ReactNode;
  isCounting?: boolean;
  maxCount?: number;
} & UseControllerProps<T>;

const Textarea = styled(BaseTextareaAutosize)`
  padding: 10px 16px;
  outline: none !important;
  border-radius: 2px;
  border: 1px solid #cccbcb;
  width: 100%;

  :focus-visible,
  :hover {
    border: 1px solid rgba(0, 0, 0, 0.87);
  }
`;

const TextAreaForm = <T extends FieldValues>({
  label,
  isDisabled,
  isRequired,
  inputProps,
  isHidden,
  sx,
  labelSx,
  inputSx,
  renderLabel,
  isCounting,
  maxCount = 0,
  ...control
}: IProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(control);

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
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Textarea
          {...inputProps}
          id={field.name}
          sx={{
            minHeight: '44px',
            backgroundColor: isDisabled ? Color.bgGreyLight : undefined,
            ...inputSx,
          }}
          disabled={isDisabled}
          {...field}
        />
        {isCounting && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', right: '12px', bottom: '12px' }}>
            <Box />
            <Typography sx={{ fontSize: '12px', color: Color.bgGreyDark }}>
              {isEmpty(field.value) ? `${maxCount} characters` : `${field.value.length}/${maxCount} characters`}
            </Typography>
          </Box>
        )}
      </Box>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default TextAreaForm;
