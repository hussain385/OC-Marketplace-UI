/* eslint-disable no-unused-vars */
// @flow
import React from 'react';
import { Box, Divider, Popover, styled, Typography } from '@mui/material';
import { PopUpFilterBox } from './budget-popup';
import { Color } from '../../../theme';
import MuiAppThemeBtnComponent from '../../../common/components/mui-app-theme-btn.component';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { ErrorLabel } from '../../../common/styles/common.styles';
import { useAppDispatch } from '../../../redux/hooks';
import useSubCatagorySearch from '../../../common/utils/hooks/useSubCatagorySearch';
import { createSubcategoryDeliveryTime } from '../../../common/utils/global_state.util';

type Props = {
  open: boolean;
  anchorEl: null | HTMLElement;
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
  setAnchorEl: any;
  setClearAll: React.Dispatch<React.SetStateAction<boolean>>;
};

const OptionBox = styled(Box)(() => ({
  display: 'flex',
  marginTop: '1em',
  minWidth: '15em',
  gap: '0.5em',
}));

const options = [
  { label: 'Within 1 -3 days', value: '1-3 days' },
  { label: 'Up to 1 week', value: 'within 1 week' },
  { label: 'Up to 2 weeks', value: 'within 2 weeks' },
  { label: 'Up to 1 month', value: 'within a month' },
  { label: 'Others', value: 'Others' },
];

const deliveryPopupSchema = object({
  option: string().required('This field should not be empty.'),
});

export const DeliveryPopup = ({ open, anchorEl, setIsLoading, code, setData, setAnchorEl, setClearAll }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useAppDispatch();
  const id = open ? 'simple-popper' : undefined;
  const [delivery] = createSubcategoryDeliveryTime();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(deliveryPopupSchema),
    defaultValues: {
      option: '',
    },
  });

  const { onHandlerDeliveryTime } = useSubCatagorySearch();

  const handleSubmitAction: SubmitHandler<{ option: string }> = async (data) => {
    onHandlerDeliveryTime(data.option, setAnchorEl);
    setClearAll(true);
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
          <Controller
            control={control}
            name={'option'}
            render={({ field: { onChange } }) => {
              return (
                <>
                  {options.map((item, key) => (
                    <OptionBox key={key}>
                      <input value={item.value} type='radio' name='option' onChange={onChange} />
                      <Typography>{item.label}</Typography>
                    </OptionBox>
                  ))}
                </>
              );
            }}
          />
          <ErrorLabel sx={{ maxWidth: '15em' }}>{errors.option?.message}</ErrorLabel>
          <Divider sx={{ marginBlock: '1em' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box />
            <MuiAppThemeBtnComponent
              type='submit'
              heightSize='34px'
              style={{
                background: isSubmitting ? Color.bgGreyLight : Color.priBlue,
                borderRadius: '2px',
                color: isSubmitting ? Color.textBlack : Color.priWhite,
                paddingInline: '0.7em',
                letterSpacing: '-0.5px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              value={'Apply'}
            />
          </Box>
        </form>
      </PopUpFilterBox>
    </Popover>
  );
};
