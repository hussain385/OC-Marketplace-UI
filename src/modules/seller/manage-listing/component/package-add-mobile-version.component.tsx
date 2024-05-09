import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { subText } from '@/modules/seller/manage-listing/manage-listing-form/overview.view';
import { AppThemeSwitch } from '@/modules/seller/manage-listing/component/switch-btn.component';
import { Controller } from 'react-hook-form';
import { useAppSelector } from '@/redux/hooks';
import { isEmpty } from 'lodash';
import { IPackagePrice } from '@/common/interface/service-interface';
import { MenuProps } from '@/modules/seller/account/professional-services';
import CheckBoxComponent from '@/modules/seller/common-service-components/check-box.component';

type componentProps = {
  loopKey: number;
  control: any;
  setValue: any;
  getValue: any;
  errors: any;
  setAllStatusesError: React.Dispatch<React.SetStateAction<boolean>>;
  packagePrices: IPackagePrice;
  setPackagePrices: React.Dispatch<React.SetStateAction<IPackagePrice>>;
};

const textAreaThemeStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #EAEAEA',
  resize: 'none',
  outline: 'none',
  padding: '10px',
  borderRadius: '2px',
  margin: '1em 0 2em 0',
  color: '#1D2130',
};

const delivery = ['1-3 days', 'within 1 week', 'within 2 weeks', 'within a month', 'Others'];

const PackageAddMobileVersionComponent = ({
  loopKey,
  control,
  setValue,
  getValue,
  errors,
  setAllStatusesError,
  setPackagePrices,
  packagePrices,
}: componentProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [description, setDescription] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');
  const [statusPlan, setStatusPlan] = useState<boolean>(true);
  const { serviceData }: any = useAppSelector((state) => state.mainState.companySetup);

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
      setValue(`package${loopKey + 1}.requirements`, requirements + '•' + ' ');
    }
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', marginBlock: '1em' }}>
      <Accordion
        sx={{
          border: '1px solid #EAEAEA',
          borderBottom: expanded ? '1px solid #EAEAEA' : 'none',
          boxShadow: 'none',
          position: 'relative',
        }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          sx={{ backgroundColor: '#EAEAEA' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className='subHeading'>{loopKey === 0 ? 'Lite' : loopKey === 1 ? 'Starter' : 'Essential'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='subHeading' sx={{ marginTop: '1.5em' }}>
            Status
          </Typography>
          <Box sx={{ display: 'flex', gap: '2em', marginBottom: '1.5em' }}>
            <Typography style={subText}>
              Active packages can be purchased, while inactive ones are not visible to buyers
            </Typography>
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
                    label=''
                  />
                );
              }}
            />
          </Box>
          <Typography className='subHeading'>What&apos;s in the package?</Typography>
          <Typography style={subText}>
            Summarize the most important information in each service package that you offer so that users can easily compare them
            with each other and make a choice. You can use maximum 175 chars
          </Typography>
          <Controller
            name={`package${loopKey + 1}.description`}
            control={control}
            render={({ field }) => {
              return (
                <textarea
                  placeholder={'Describe your offering here.'}
                  maxLength={175}
                  style={{
                    ...textAreaThemeStyle,
                    height: '10em',
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
          <Typography className='subHeading'>Delivery time</Typography>
          <Typography style={subText}>Indicate how long it will take to complete the order</Typography>
          <Box
            sx={{
              border: '1px solid #EAEAEA',
              padding: '10px',
              margin: '1em 0 2em 0',
            }}
          >
            <Typography sx={{ fontWeight: '500 !important', fontSize: '14px !important' }} className='subHeading'>
              Duration (no of days)
            </Typography>
            <FormControl sx={{ width: '100%' }}>
              <Controller
                name={`package${loopKey + 1}.duration`}
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Select
                        displayEmpty
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
                        disabled={!getValue(`package${loopKey + 1}.status`)}
                        className='Mui-focused'
                        sx={{
                          width: '100%',
                          border: errors[`package${loopKey + 1}`]?.duration?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
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
                {errors[`package${loopKey + 1}`]?.duration?.message as never}
              </Typography>
            )}
          </Box>
          <Typography className='subHeading'>Things to note (Optional)</Typography>
          <Typography style={subText}>List all prerequisites for each package</Typography>
          <Controller
            name={`package${loopKey + 1}.requirements`}
            control={control}
            render={({ field }) => {
              return (
                <textarea
                  placeholder={'List all prerequisites here.'}
                  style={{
                    ...textAreaThemeStyle,
                    height: '10em',
                  }}
                  onChange={(e) => changeRequirements(e, `package${loopKey + 1}.requirements`)}
                  onKeyUp={checkRequirementsEnter}
                  value={field.value}
                />
              );
            }}
          />
          {Boolean(errors[`package${loopKey + 1}`]) && (
            <Typography className='errorMessage' sx={{ fontSize: '12px !important' }}>
              {errors[`package${loopKey + 1}`]?.requirements?.message as never}
            </Typography>
          )}
          <Typography className='subHeading'>Price & Payment schedule</Typography>
          <Typography style={subText}>Set the amount and payment frequency for each package</Typography>
          <Box
            sx={{
              border: '1px solid #EAEAEA',
              padding: '10px',
              marginTop: '1em',
            }}
          >
            <CheckBoxComponent
              name={`package${loopKey + 1}.is_one_time_payment`}
              control={control}
              setValue={setValue}
              labelValue={'One time payment'}
              disabled={true}
            />
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
                      disabled={!getValue(`package${loopKey + 1}.status`)}
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
          {!(getValue(`package${loopKey + 1}.status`) || statusPlan) && expanded && (
            <Box
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(234,234,234,0.63)',
                top: '16.3%',
                width: '100%',
                height: '83.7%',
                right: '0px',
              }}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PackageAddMobileVersionComponent;
