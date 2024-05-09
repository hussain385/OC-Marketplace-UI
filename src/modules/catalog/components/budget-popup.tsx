/* eslint-disable no-unused-vars */
// @flow
import React, { useEffect } from 'react';

import { Box, Divider, Typography, Popover } from '@mui/material';

import { Color } from '../../../theme';

import { styled } from '@mui/system';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { number, object, ref } from 'yup';

import { isEmpty } from 'lodash';

import MuiAppThemeBtnComponent from '../../../common/components/mui-app-theme-btn.component';

import { useAppDispatch } from '../../../redux/hooks';

import { ErrorLabel } from '../../../common/styles/common.styles';
import useSubCatagorySearch from '../../../common/utils/hooks/useSubCatagorySearch';
import { createBudgetMax, createBudgetMin, createSubFilterDefault } from '../../../common/utils/global_state.util';

type Props = {
  open: boolean;
  anchorEl: null | HTMLElement;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
  setAnchorEl: any;
};

export const PopUpFilterBox = styled(Box)(() => ({
  backgroundColor: 'white',
  padding: '1.5em 1em',
  borderRadius: '2px',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
  marginTop: '5px',
}));

const inputStyle = {
  border: `1px solid ${Color.bgLine}`,
  borderRadius: '4px',
  width: '8em',
  padding: '5px',
};

const textStyle = {
  fontSize: '14px',
  fontWeight: '600',
  paddingInline: '10px',
};

const budgetPopupSchema = object({
  min: number().required('This field is required').moreThan(-1, 'Min value should be greater than 0 or equal to 0'),
  max: number().required('This field is required').moreThan(ref('min'), 'Please enter a greater number than min'),
});

export const BudgetPopup = ({ open, anchorEl, setMin, setMax, setData, code, setIsLoading, setAnchorEl }: Props) => {
  const id = open ? 'simple-popper' : undefined;
  const dispatch = useAppDispatch();
  const [minRange] = createBudgetMin();
  const [maxRange] = createBudgetMax();
  const [filterActive] = createSubFilterDefault();

  const { onBudgetRangeFilter } = useSubCatagorySearch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(budgetPopupSchema),
    defaultValues: {
      min: minRange,
      max: maxRange,
    },
  });

  useEffect(() => {
    //reset the form value when clear all trigger
    if (!filterActive) {
      reset();
    }
  }, [filterActive]);

  const handleSubmitAction: SubmitHandler<{ min: number; max: number }> = async (data) => {
    setMin(Number(data.min));
    setMax(Number(data.max));
    onBudgetRangeFilter(data.min, data.max, setAnchorEl, reset);

    // await serviceInfoFetcher(
    //   dispatch,
    //   16,
    //   `&filters[plans][price][$gte]=${data.min}&filters[plans][price][$lte]=${data.max}`,
    //   code,
    //   setData,
    //   setIsLoading,
    // );
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <PopUpFilterBox>
        <form onSubmit={handleSubmit(handleSubmitAction)}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
            <Box>
              <Typography sx={{ ...textStyle, paddingBottom: '10px' }}>Min</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  control={control}
                  name={'min'}
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          style={inputStyle}
                          type='number'
                          min={0}
                          placeholder=''
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      </>
                    );
                  }}
                />
                <Typography sx={textStyle}>To</Typography>
              </Box>
              <ErrorLabel sx={{ maxWidth: '8em', display: isEmpty(errors.min?.message) ? 'none' : 'flex' }}>
                {errors.min?.message}
              </ErrorLabel>
            </Box>
            <Box>
              <Typography sx={{ ...textStyle, paddingBottom: '10px' }}>Max</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  control={control}
                  name={'max'}
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          style={inputStyle}
                          type='number'
                          min={0}
                          placeholder=''
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                      </>
                    );
                  }}
                />
                <Typography sx={textStyle}>SGD$</Typography>
              </Box>
              <ErrorLabel sx={{ maxWidth: '8em', display: isEmpty(errors.max?.message) ? 'none' : 'flex' }}>
                {errors.max?.message}
              </ErrorLabel>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1em' }}>
            <MuiAppThemeBtnComponent
              type='button'
              disabled={isSubmitting}
              heightSize='35px'
              onClick={() => reset()}
              style={{
                background: 'transparent',
                borderRadius: '5px',
                color: Color.bgGreyDark,
                lineHeight: 1.71,
                letterSpacing: '-0.5px',
                fontSize: '16px',
                fontWeight: 'bold',
                paddingInline: '1.5em',
              }}
              value={'Clear All'}
            />
            <MuiAppThemeBtnComponent
              type='submit'
              disabled={isSubmitting}
              heightSize='35px'
              style={{
                background: isSubmitting ? Color.bgGreyLight : Color.priBlue,
                borderRadius: '5px',
                color: isSubmitting ? Color.textBlack : Color.priWhite,
                lineHeight: 1.71,
                letterSpacing: '-0.5px',
                fontSize: '16px',
                fontWeight: 'bold',
                paddingInline: '1.5em',
              }}
              value={isSubmitting ? 'Please wait..' : 'Apply'}
            />
          </Box>
        </form>
      </PopUpFilterBox>
    </Popover>
  );
};
