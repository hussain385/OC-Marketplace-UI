import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { TextField } from '@mui/material';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar_icon.svg';

interface Props {
  label?: string;
  icon?: React.ReactNode;
}

const DatePickerComponent = ({ label, icon, ...otherProps }: Props & any) => {
  //const [value, setValue] = React.useState<Dayjs | null>(defaultValue ? defaultValue : null);

  return (
    <LocalizationProvider sx={{ '&.MuiButtonBase-root': { color: 'blue !important' } }} dateAdapter={AdapterDayjs}>
      <DatePicker
        minDate={new Date(1800, 0, 1)}
        {...otherProps}
        views={['day']}
        label={label}
        components={{
          OpenPickerIcon: icon ? icon : CalendarIcon,
        }}
        renderInput={(params) => (
          <TextField size='small' sx={{ width: { xs: '100%', sm: '150px' } }} {...params} helperText={null} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
