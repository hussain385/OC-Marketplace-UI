/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import moment from 'moment';

import React, { forwardRef, useState } from 'react';

import { Box, Button, Popper, Typography } from '@mui/material';

import { AiFillInfoCircle } from 'react-icons/ai';

import { FiCalendar } from 'react-icons/fi';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Controller, FieldPath, FieldPathValue, SetValueConfig } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import { isEmpty, isUndefined } from 'lodash';

import MenuItem from '@mui/material/MenuItem';

import { Color } from '../../../../theme';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './style.css';

type Props = {
  control: any;
  errors: any;
  setValue: (name: FieldPath<any>, value: FieldPathValue<any, FieldPath<any>>, options?: SetValueConfig) => void;
  disabled?: boolean;
  setError?: any;
};

const employeeType = ['1 - 10 employees', '11 - 50 employees', '51 - 200 employees', '> 200 employees'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 304,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.12)',
      borderRadius: 2,
      border: 'none',
      paddingInline: 16,
      paddingBlock: 5,
    },
  },
};

export const CalenderCustomInput = forwardRef((props: any, ref) => {
  return (
    <Box
      onClick={props.onClick}
      ref={ref}
      sx={{
        fontSize: '14px',
        border: props.error ? '1px solid #e11900' : '1px solid #EAEAEA',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '2px',
        width: '100%',
        ...props.sx,
      }}
    >
      <Typography sx={{ color: isEmpty(props.value) ? Color.bgGreyDark : 'black', fontSize: '14px' }}>
        {isEmpty(props.value) ? (isUndefined(props.emptyContainerString) ? 'Year' : props.emptyContainerString) : props.value}
      </Typography>
      <FiCalendar color={props.error ? '#e11900' : 'inherit'} />
    </Box>
  );
});

CalenderCustomInput.displayName = 'CalenderCustomInput';

interface customHeaderProps {
  date: Date;
  nextYearButtonDisabled: boolean;
  decreaseYear: any;
  increaseYear: any;
}

export const CalenderCustomHeader: React.FC<customHeaderProps> = ({
  date,
  nextYearButtonDisabled,
  decreaseYear,
  increaseYear,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingInline: '2em',
    }}
  >
    <Typography>{moment(date).format('YYYY')}</Typography>
    <Box>
      <Button style={{ minWidth: 'fit-content', padding: '2px', margin: '2px' }} onClick={decreaseYear}>
        <IoIosArrowBack size={16} color='#000' />
      </Button>
      <Button
        disabled={nextYearButtonDisabled}
        style={{ minWidth: 'fit-content', padding: '2px', margin: '2px' }}
        onClick={increaseYear}
      >
        <IoIosArrowForward size={16} style={{ color: nextYearButtonDisabled ? '#c0c0c0' : Color.textBlack }} />
      </Button>
    </Box>
  </Box>
);

export const CompanyInfoComponent = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box>
      <Box
        sx={{
          marginTop: '0.5em',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        <Box sx={{ marginTop: '1em', width: { xs: '100%', md: '50%' } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '0.5em',
            }}
          >
            <Typography className='subHeading'>Start of operations (Optional)</Typography>
            <Button
              sx={{
                display: { xs: 'none', sm: 'none', md: 'flex' },
                padding: '0px',
                marginLeft: '-1em',
              }}
              className='btn-popper'
              aria-describedby={id}
              type='button'
              onClick={handleClick}
            >
              <AiFillInfoCircle size='20' color='#7E7E7E' />
            </Button>
            <Popper placement={'top-start'} id={id} open={open} anchorEl={anchorEl}>
              <div className='container'>
                <div className='message-body'>
                  <p style={{ fontSize: '14px' }}>The year your company started its operations.</p>
                </div>
                <div className='arrow'>
                  <div className='outer'></div>
                  <div className='inner'></div>
                </div>
              </div>
            </Popper>
          </Box>
          <Controller
            name={'startYear'}
            control={props.control}
            render={({ field }) => {
              return (
                <>
                  <DatePicker
                    minDate={new Date(1800, 0, 1)}
                    selected={field.value === '' ? undefined : new Date(field.value)}
                    renderCustomHeader={({ increaseYear, decreaseYear, date, nextYearButtonDisabled }) => (
                      <CalenderCustomHeader
                        increaseYear={increaseYear}
                        decreaseYear={decreaseYear}
                        date={date}
                        nextYearButtonDisabled={nextYearButtonDisabled}
                      />
                    )}
                    onChange={(date: any) => {
                      props.setValue('startYear', date);
                      props.setError && props.setError('startYear', { type: 'focus' }, { shouldFocus: false });
                    }}
                    filterDate={(date) => {
                      return !(date > new Date());
                    }}
                    yearItemNumber={12}
                    maxDate={new Date()}
                    customInput={<CalenderCustomInput error={!!props.errors.startYear?.message} />}
                    showYearPicker
                    dateFormat='yyyy'
                  />
                </>
              );
            }}
          />
          {Boolean(props.errors.startYear?.message) && (
            <Typography className='errorMessage'>This field should not be empty.</Typography>
          )}
        </Box>
        <Box sx={{ marginTop: '1em', width: { xs: '100%', md: '50%' } }}>
          <Typography className='subHeading' sx={{ marginBottom: '0.5em', fontSize: '14px !important' }}>
            Number of employees (Including you)
          </Typography>
          <FormControl sx={{ width: '100%' }}>
            <Controller
              name={'employees'}
              control={props.control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      displayEmpty
                      disabled={props.disabled}
                      value={field.value}
                      onChange={field.onChange}
                      renderValue={(selected) => {
                        if (isEmpty(field.value)) {
                          return <em>Select</em>;
                        }
                        return field.value;
                      }}
                      size='small'
                      MenuProps={MenuProps}
                      className='Mui-focused'
                      sx={{
                        width: '100%',
                        border: props.errors.employees?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
                        borderRadius: '2px',
                        height: '44px',
                        fontSize: '14px',
                        boxShadow: 'none',
                      }}
                    >
                      {employeeType.map((name, key) => (
                        <MenuItem key={key} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                );
              }}
            />
            {Boolean(props.errors.employees?.message) && (
              <Typography className='errorMessage'>This field should not be empty.</Typography>
            )}
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ marginBlock: '1.5em' }}>
        <Typography className='subHeading'>About the company</Typography>
        <Box
          sx={{
            width: '100%',
            height: '240px',
            border: props.errors.about?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
            borderRadius: '2px',
            padding: '16.5px 14px',
            marginTop: '0.5em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Controller
            name={'about'}
            control={props.control}
            render={({ field }) => {
              return (
                <>
                  <textarea
                    draggable={false}
                    onChange={field.onChange}
                    maxLength={600}
                    disabled={props.disabled}
                    value={field.value}
                    placeholder='Write your brief introduction here.'
                    style={{
                      width: '100%',
                      resize: 'none',
                      border: 'none',
                      height: '190px',
                      overflowY: 'auto',
                      fontFamily: 'Manrope,sans-serif',
                      outline: 'none',
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box />
                    <Typography sx={{ fontSize: '12px', color: Color.bgGreyDark }}>
                      {isEmpty(field.value) ? '600 Character' : `${field.value.length}/600 Characters`}
                    </Typography>
                  </Box>
                </>
              );
            }}
          />
        </Box>
        {Boolean(props.errors.about?.message) && (
          <Typography className='errorMessage'>This field should not be empty.</Typography>
        )}
      </Box>
    </Box>
  );
};
