import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormControlLabel, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AppThemeSwitch } from '../manage-listing/component/switch-btn.component';
import Select from '@mui/material/Select';
import { isEmpty } from 'lodash';
import { MenuProps } from '../account/professional-services';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxComponent from './check-box.component';
import { Color } from '../../../theme';
import { useAppSelector } from '../../../redux/hooks';
import { IPackagePrice } from '../../../common/interface/service-interface';
import PaymentPlanRadioComponent from '@/modules/seller/common-service-components/payment-plan-radio.component';
import PaymentPlanFrequencyRadioComponent from '@/modules/seller/common-service-components/payment-plan-frequency-radio.component';

type componentProps = {
  loopKey: number;
  control: any;
  setValue: any;
  getValue: any;
  errors: any;
  setAllStatusesError: React.Dispatch<React.SetStateAction<boolean>>;
  packagePrices: IPackagePrice;
  setPackagePrices: React.Dispatch<React.SetStateAction<IPackagePrice>>;
  paymentPlanType: string[];
  setPaymentPlanType: React.Dispatch<React.SetStateAction<string[]>>;
};

const delivery = ['1-3 days', 'within 1 week', 'within 2 weeks', 'within a month', 'Others'];
const no_of_orders_list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'infinite (until cancelled)'];
const no_of_revision_list = ['1', '2', '3', '4', '5', '0', '100'];
const deliveryInDays = {
  '3': '1-3 days',
  '7': 'within 1 week',
  '14': 'within 2 weeks',
  '30': 'within a month',
  '60': 'Others',
};

const ServicePlanFormComponent = ({
  loopKey,
  control,
  setValue,
  getValue,
  errors,
  setAllStatusesError,
  setPackagePrices,
  packagePrices,
  paymentPlanType,
  setPaymentPlanType,
}: componentProps) => {
  const [description, setDescription] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');
  const [statusPlan, setStatusPlan] = useState<boolean>(true);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [isSubscriptionSelected, setIsSubscriptionSelected] = useState<boolean>(false);
  const { serviceData }: any = useAppSelector((state) => state.mainState.companySetup);

  useEffect(() => {
    setPaymentPlanType((prevState) =>
      prevState.map((state, key) => {
        if (key === loopKey) return getValue(`package${loopKey + 1}.paymentType`);
        return state;
      }),
    );
    setIsSeller(getValue(`package${loopKey + 1}.isContactFirst`));
    setIsSubscriptionSelected(getValue(`package${loopKey + 1}.paymentType`) === 'SUBSCRIPTION');
  }, [serviceData]);

  useEffect(() => {
    setDescription(getValue(`package${loopKey + 1}.description`));
    setRequirements(getValue(`package${loopKey + 1}.requirements`));
    setStatusPlan(
      serviceData[`package${loopKey + 1}`]
        ? serviceData[`package${loopKey + 1}`].status
        : getValue(`package${loopKey + 1}.status`),
    );
  }, [serviceData]);

  const changeDescription = (e: { target: { value: React.SetStateAction<string> } }, name: string) => {
    if (isEmpty(description)) {
      setDescription('•' + ' ' + e.target.value);
      setValue(name, '•' + ' ' + e.target.value);
    } else {
      setDescription(e.target.value);
      setValue(name, e.target.value);
    }
  };
  const checkDescriptionEnter = (e: { key: string }) => {
    if (e.key === 'Enter') {
      setValue(`package${loopKey + 1}.description`, description + '•' + ' ');
      setDescription(description + '•' + ' ');
    }
  };
  const changeRequirements = (e: { target: { value: React.SetStateAction<string> } }, name: string) => {
    if (isEmpty(requirements)) {
      setRequirements('•' + ' ' + e.target.value);
      setValue(name, '•' + ' ' + e.target.value);
    } else {
      setRequirements(e.target.value);
      setValue(name, e.target.value);
    }
  };
  const checkRequirementsEnter = (e: { key: string }) => {
    if (e.key === 'Enter') {
      setRequirements(requirements + '•' + ' ');
      setValue(`package${loopKey + 1}.prerequisite`, requirements + '•' + ' ');
    }
  };

  return (
    <Box sx={{ width: '25%', minWidth: '200px', borderLeft: '1px solid #EAEAEA', position: 'relative' }}>
      <Box
        sx={{
          height: '3.5em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #EAEAEA',
          backgroundColor: '#EFEEEE',
        }}
      >
        <Controller
          name={`package${loopKey + 1}.name`}
          control={control}
          render={({ field }) => (
            <Typography
              sx={{ fontSize: '14px', fontWeight: '700', color: Color.bgGreyDark, width: '100%', paddingInline: '1em' }}
            >
              {field.value}
            </Typography>
          )}
        />
      </Box>
      <Box sx={{ height: '6.25em', padding: '10px 20px', borderBottom: '1px solid #EAEAEA' }}>
        <Controller
          name={`package${loopKey + 1}.status`}
          control={control}
          render={({ field }) => {
            return (
              <FormControlLabel
                control={
                  <AppThemeSwitch
                    defaultChecked
                    checked={field.value}
                    onClick={() => {
                      setAllStatusesError(false);
                      setValue(`package${loopKey + 1}.status`, !field.value);
                      setStatusPlan(!field.value);
                    }}
                  />
                }
                label='Active'
              />
            );
          }}
        />
      </Box>
      <Box
        sx={{
          height: '15.5em',
          padding: '10px',
          border: errors[`package${loopKey + 1}`]?.description?.message ? '1px solid #e11900' : 'none',
          borderBottom: errors[`package${loopKey + 1}`]?.description?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
          backgroundColor: 'white',
        }}
      >
        <CheckBoxComponent
          name={`package${loopKey + 1}.isContactFirst`}
          control={control}
          setValue={setValue}
          labelValue={'Contact seller first'}
          disabled={false}
          onChange={(checked: boolean) => setIsSeller(checked)}
        />
        <Controller
          name={`package${loopKey + 1}.description`}
          control={control}
          render={({ field }) => {
            return (
              <textarea
                placeholder={'Describe your offering here.'}
                maxLength={175}
                style={{
                  width: '100%',
                  height: errors[`package${loopKey + 1}`]?.description?.message ? '67%' : '82%',
                  border: 'none',
                  resize: 'none',
                  outline: 'none',
                  color: '#1D2130',
                }}
                {...field}
                onChange={(e) => changeDescription(e, `package${loopKey + 1}.description`)}
                onKeyUp={checkDescriptionEnter}
              />
            );
          }}
        />
        {Boolean(errors[`package${loopKey + 1}`]) && (
          <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
            {errors[`package${loopKey + 1}`]?.description?.message as never}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          height: '15.5em',
          padding: '10px',
          border: errors[`package${loopKey + 1}`]?.prerequisite?.message ? '1px solid #e11900' : 'none',
          borderBottom: errors[`package${loopKey + 1}`]?.prerequisite?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
          backgroundColor: 'white',
        }}
      >
        <Controller
          name={`package${loopKey + 1}.prerequisite`}
          control={control}
          render={({ field }) => {
            return (
              <textarea
                disabled={isSeller}
                placeholder={'List all prerequisites here.'}
                style={{
                  width: '100%',
                  height: errors[`package${loopKey + 1}`]?.prerequisite?.message ? '82%' : '100%',
                  border: 'none',
                  resize: 'none',
                  outline: 'none',
                  color: '#1D2130',
                }}
                onChange={(e) => changeRequirements(e, `package${loopKey + 1}.prerequisite`)}
                onKeyUp={checkRequirementsEnter}
                value={field.value}
              />
            );
          }}
        />
        {Boolean(errors[`package${loopKey + 1}`]) && (
          <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
            {errors[`package${loopKey + 1}`]?.prerequisite?.message as never}
          </Typography>
        )}
      </Box>
      <PaymentPlanRadioComponent
        disabled={isSeller}
        errors={errors}
        control={control}
        loopKey={loopKey}
        onChangePlan={(value: string) => {
          setIsSubscriptionSelected(value === 'SUBSCRIPTION');
          setPaymentPlanType((prevState) =>
            prevState.map((state, key) => {
              if (key === loopKey) return value;
              return state;
            }),
          );
        }}
      />
      <Box
        sx={{
          height: '8em',
          padding: '10px',
          borderBottom: '1px solid #EAEAEA',
          backgroundColor: 'white',
          position: 'relative',
        }}
      >
        <Typography sx={{ fontWeight: '500 !important', fontSize: '14px !important' }} className='subHeading'>
          Duration (no of days)
        </Typography>
        <FormControl sx={{ width: '100%' }}>
          <Controller
            name={`package${loopKey + 1}.deliveryDays`}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Select
                    displayEmpty
                    value={
                      deliveryInDays[`${field.value}` as keyof typeof deliveryInDays] ? (
                        deliveryInDays[`${field.value}` as keyof typeof deliveryInDays]
                      ) : isEmpty(field.value) ? (
                        <em>Select</em>
                      ) : (
                        field.value
                      )
                    }
                    onChange={field.onChange}
                    renderValue={(selected) => {
                      return deliveryInDays[`${field.value}` as keyof typeof deliveryInDays] ? (
                        deliveryInDays[`${field.value}` as keyof typeof deliveryInDays]
                      ) : isEmpty(field.value) ? (
                        <em>Select</em>
                      ) : (
                        field.value
                      );
                    }}
                    size='small'
                    MenuProps={MenuProps}
                    disabled={!getValue(`package${loopKey + 1}.status`) || isSeller}
                    className='Mui-focused'
                    sx={{
                      width: '100%',
                      border: errors[`package${loopKey + 1}`]?.deliveryDays?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
                      borderRadius: '2px',
                      height: '36px',
                      fontSize: '14px',
                      boxShadow: 'none',
                      marginTop: '8px',
                    }}
                  >
                    {delivery.map((name, loopKey) => (
                      <MenuItem key={loopKey} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              );
            }}
          />
        </FormControl>
        {Boolean(errors[`package${loopKey + 1}`]) && (
          <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
            {errors[`package${loopKey + 1}`]?.deliveryDays?.message as never}
          </Typography>
        )}
        {isSubscriptionSelected && paymentPlanType.includes('SUBSCRIPTION') && (
          <Box
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(234,234,234,0.63)',
              bottom: 0,
              width: '100%',
              height: '100%',
              left: '0px',
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          height: '8em',
          padding: '10px',
          borderBottom: '1px solid #EAEAEA',
          backgroundColor: 'white',
        }}
      >
        <FormControl sx={{ width: '100%' }}>
          <Controller
            name={`package${loopKey + 1}.maxRevision`}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Select
                    displayEmpty
                    value={`${field.value}`}
                    onChange={field.onChange}
                    renderValue={(selected) => {
                      if (isEmpty(`${field.value}`)) {
                        return <em>Select</em>;
                      }
                      return `${field.value === '0' ? 'No revision' : field.value === '100' ? 'Unlimited' : field.value}`;
                    }}
                    size='small'
                    MenuProps={MenuProps}
                    disabled={!getValue(`package${loopKey + 1}.status`) || isSeller}
                    className='Mui-focused'
                    sx={{
                      width: '100%',
                      border: errors[`package${loopKey + 1}`]?.maxRevision?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
                      borderRadius: '2px',
                      height: '36px',
                      fontSize: '14px',
                      boxShadow: 'none',
                      marginTop: '8px',
                    }}
                  >
                    {no_of_revision_list.map((name, loopKey) => (
                      <MenuItem key={loopKey} value={name}>
                        {name === '0' ? 'No revision' : name === '100' ? 'Unlimited' : name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              );
            }}
          />
        </FormControl>
        {Boolean(errors[`package${loopKey + 1}`]) && (
          <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
            {errors[`package${loopKey + 1}`]?.maxRevision?.message as never}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          height: '9.75em',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 16px 0px',
          backgroundColor: 'white',
          borderBottom: paymentPlanType.includes('SUBSCRIPTION') ? '1px solid #EAEAEA' : 'none',
        }}
      >
        <Box
          sx={{
            border: errors[`package${loopKey + 1}`]?.price?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '8px 5px',
          }}
        >
          <Typography
            sx={{
              width: '22%',
              minWidth: '40px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            $SGD
          </Typography>
          <Controller
            name={`package${loopKey + 1}.price`}
            control={control}
            render={({ field }) => {
              return (
                <input
                  type='number'
                  min='0'
                  disabled={!getValue(`package${loopKey + 1}.status`) || isSeller}
                  defaultValue={field.value}
                  style={{
                    border: 'none',
                    width: '78%',
                    height: '21px',
                    outline: 'none',
                    textAlign: 'right',
                    paddingRight: '20px',
                    paddingLeft: '10px',
                    backgroundColor: 'white',
                  }}
                  onKeyDown={(e) => {
                    // prevent symbols and decimal point
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                  placeholder='0'
                  value={field.value}
                  onChange={(e) => {
                    if (e.target.value.match(/^[0-9]*$/)) {
                      setPackagePrices((prevState) => ({
                        ...prevState,
                        [`package${loopKey + 1}`]: e.target.value,
                      }));
                      field.onChange(e);
                    } else {
                      e.preventDefault();
                    }
                  }}
                />
              );
            }}
          />
        </Box>
        {Boolean(errors[`package${loopKey + 1}`]) && (
          <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
            {errors[`package${loopKey + 1}`]?.price?.message as never}
          </Typography>
        )}
      </Box>
      {paymentPlanType.includes('SUBSCRIPTION') && (
        <>
          <PaymentPlanFrequencyRadioComponent disabled={isSeller} errors={errors} control={control} loopKey={loopKey} />
          <Box
            sx={{
              height: '8em',
              padding: '10px',
              backgroundColor: 'white',
            }}
          >
            <FormControl sx={{ width: '100%' }}>
              <Controller
                name={`package${loopKey + 1}.subscriptionCount`}
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Select
                        displayEmpty
                        value={`${field.value}`}
                        onChange={field.onChange}
                        renderValue={(selected) => {
                          if (isEmpty(`${field.value}`)) {
                            return <em>Select</em>;
                          }
                          return `${field.value}`;
                        }}
                        size='small'
                        MenuProps={MenuProps}
                        disabled={!getValue(`package${loopKey + 1}.status`) || isSeller}
                        className='Mui-focused'
                        sx={{
                          width: '100%',
                          border: errors[`package${loopKey + 1}`]?.subscriptionCount?.message
                            ? '1px solid #e11900'
                            : '1px solid #EAEAEA',
                          borderRadius: '2px',
                          height: '36px',
                          fontSize: '14px',
                          boxShadow: 'none',
                          marginTop: '8px',
                        }}
                      >
                        {no_of_orders_list.map((name, loopKey) => (
                          <MenuItem key={loopKey} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  );
                }}
              />
            </FormControl>
            {Boolean(errors[`package${loopKey + 1}`]) && (
              <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
                {errors[`package${loopKey + 1}`]?.subscriptionCount?.message as never}
              </Typography>
            )}
          </Box>
        </>
      )}
      {!(getValue(`package${loopKey + 1}.status`) || statusPlan) && (
        <Box
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(234,234,234,0.63)',
            top: paymentPlanType.includes('SUBSCRIPTION') ? '10.3%' : '13%',
            width: '100%',
            height: paymentPlanType.includes('SUBSCRIPTION') ? '89.7%' : '87%',
          }}
        />
      )}
      {isSeller && (
        <Box
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(234,234,234,0.63)',
            top: '33.9%',
            width: '100%',
            height: '66.1%',
          }}
        />
      )}
      {!isSubscriptionSelected && paymentPlanType.includes('SUBSCRIPTION') && (
        <Box
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(234,234,234,0.63)',
            bottom: 0,
            width: '100%',
            height: '21.3%',
          }}
        />
      )}
    </Box>
  );
};

export default ServicePlanFormComponent;
