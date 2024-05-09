import classNames from 'classnames/bind';
import { isEmpty, isNull } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';
import { Box, Button, Menu, styled, SxProps, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { isEmpty } from 'lodash';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Color } from '../../theme';

type CallbackType = {
  startDate: Dayjs | null | string;
  endDate: Dayjs | null | string;
};

type Props = {
  label: string;
  startLabel?: string;
  endLabel?: string;
  applyLabel?: string;
  clearLabel?: string;
  reset?: boolean;
  onApply?: (args: CallbackType) => void;
  onClear?: () => void;
  onChange?: (args: CallbackType) => void;
  buttonOverrideStyle?: SxProps;
  isActive?: boolean;
  isColon?: boolean;
};

type DatePickerFieldTypes = {
  defaultStartDate?: Dayjs | null | string;
  defaultEndDate?: Dayjs | null | string;
  onDateRangeChange?: (args: CallbackType) => void;
};

const Label = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '135%',
  letterSpacing: '-0.5px',
  cursor: 'pointer',
  maxWidth: '30ch',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const DatePickerField = ({ onDateRangeChange, defaultStartDate = null, defaultEndDate = null }: DatePickerFieldTypes) => {
  const [startValue, setStartValue] = React.useState<Dayjs | null | string>(defaultStartDate);
  const [endValue, setEndValue] = React.useState<Dayjs | null | string>(defaultEndDate);
  const data = { startDate: null, endDate: null };

  useEffect(() => {
    Object.assign(data, { startDate: startValue, endDate: endValue });
    onDateRangeChange && onDateRangeChange(data);
  }, [startValue, endValue]);

  return (
    <LocalizationProvider sx={{ '& .MuiButtonBase-root': { color: 'blue !important' } }} dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['day']}
        label='Start date'
        value={startValue}
        onChange={(newValue: any) => {
          setStartValue(newValue);
        }}
        // minDate={new Date('12/8/2022')}
        // disableFuture={false}
        renderInput={(params) => <TextField sx={{ width: { xs: '100%', sm: '150px' } }} {...params} helperText={null} />}
      />
      &nbsp; &nbsp; &nbsp; &nbsp;
      <DatePicker
        value={endValue}
        views={['day']}
        label='End date'
        onChange={(newValue: any) => {
          setEndValue(newValue);
        }}
        // minDate={new Date('12/8/2022')}
        // disableFuture={false}
        renderInput={(params) => <TextField sx={{ width: { xs: '100%', sm: '150px' } }} {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

const DateRangeDropdown = ({
  label,
  reset,
  buttonOverrideStyle,
  onApply,
  onChange,
  onClear,
  isActive = false,
  isColon = true,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | number>(null);
  const open = Boolean(anchorEl);
  const [args, setArgs] = React.useState<CallbackType>({ startDate: null, endDate: null });
  const [isError, setIsError] = React.useState<boolean>();
  const [dateRangeLabel, setDateRangeLabel] = React.useState<string>('');
  const [defaultDateValues, setDefaultDateValues] = React.useState<CallbackType>({ startDate: null, endDate: null });
  const dropDownMenuClass = classNames('date-range-dropdown', { active: isActive });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsError(false);
    onClear && onClear();
  };

  const handleApplyBtn = () => {
    if (!isError && !isEmpty(args.startDate) && !isEmpty(args.endDate)) {
      const startDate: Dayjs = args.startDate as Dayjs;
      const endDate: Dayjs = args.endDate as Dayjs;
      if (startDate) {
        updateDateRangeLabel(startDate.format('MM/DD/YYYY').toString(), '');
      }
      if (startDate && endDate) {
        updateDateRangeLabel(startDate.format('MM/DD/YYYY').toString(), endDate.format('MM/DD/YYYY').toString());
      }
      setAnchorEl(null);
      setIsError(false);
      onApply && onApply(args);
    } else {
      setIsError(true);
    }
  };

  const updateDateRangeLabel = (start: string, end: string) => {
    const str = dateRangeLabel.split(' - ');
    if (str.length > 0) {
      str[0] = start;
      if (!isEmpty(end)) {
        str[1] = end;
      }
      const newStr = str.join(' - ');
      setDefaultDateValues({ startDate: dayjs(str[0]), endDate: dayjs(str[1]) });
      setDateRangeLabel(newStr);
    }
  };

  useEffect(() => {
    if (reset) {
      setArgs({ startDate: null, endDate: null });
      setDefaultDateValues({ startDate: null, endDate: null });
      setDateRangeLabel('');
    }
  }, [reset, anchorEl, dateRangeLabel]);

  return (
    <>
      <Button
        sx={{ color: Color.pureBlack, textTransform: 'initial', paddingX: '15px', ...buttonOverrideStyle }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={dropDownMenuClass}
      >
        <Label className='menu-label'>
          {label}
          {isColon ? ':' : undefined} {!isEmpty(dateRangeLabel) ? dateRangeLabel : ''}
        </Label>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        PaperProps={{
          style: {
            width: 345,
            borderRadius: 0,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          },
        }}
        anchorEl={anchorEl as any}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ padding: '0.5rem' }}>
          <DatePickerField
            defaultStartDate={defaultDateValues.startDate}
            defaultEndDate={defaultDateValues.endDate}
            onDateRangeChange={(e) => {
              const startDate: Dayjs = e.startDate as Dayjs;
              const endDate: Dayjs = e.endDate as Dayjs;
              setArgs({ startDate, endDate });
              if (isNull(startDate) || isNull(endDate)) {
                return;
              }
              const dateCompare = endDate.isAfter(startDate) || endDate.isSame(startDate);
              if (!dateCompare) {
                setIsError(true);
              } else {
                setIsError(false);
                onChange && onChange(e);
              }
            }}
          />
          {isError && (
            <Typography variant='subHeading' sx={{ color: Color.negative }}>
              {isEmpty(args.startDate) || isEmpty(args.endDate)
                ? 'Start and end date cannot be empty'
                : 'End date cannot be less than start date'}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: '10px', mt: '0.5rem' }}>
            <Typography
              sx={{
                color: Color.textBlack,
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '24px',
                letterSpacing: '-0.5px',
                '&:hover': { background: '#f6f6f6', cursor: 'pointer' },
                padding: '0.5rem 1rem',
              }}
              onClick={handleClose}
            >
              Cancel
            </Typography>
            <Typography
              sx={{
                color: args.startDate && args.endDate ? Color.priBlue : Color.textHint,
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '24px',
                letterSpacing: '-0.5px',
                '&:hover': { background: '#f6f6f6', cursor: 'pointer' },
                padding: '0.5rem 1rem',
              }}
              onClick={() => {
                if (args.startDate && args.endDate) {
                  handleApplyBtn();
                }
              }}
            >
              Apply
            </Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default DateRangeDropdown;
