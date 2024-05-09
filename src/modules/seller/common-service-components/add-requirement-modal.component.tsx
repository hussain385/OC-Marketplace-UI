/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Typography } from '@mui/material';
import { isEmpty, isUndefined } from 'lodash';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MenuProps } from '../account/professional-services';
import TextBoxComponent from './text-box.component';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import OptionsUIComponent from './options-ui.component';
import { Controller, useForm } from 'react-hook-form';
import CheckBoxComponent from './check-box.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequirementSchema } from './requirement.schema';
import Modal from '../../../common/components/modal.component';
import { ReactSortable } from 'react-sortablejs';
import { IRequirementState } from '@/common/interface/busines-company-profile-interface';
import { AppThemeSwitch } from '@/modules/seller/manage-listing/component/switch-btn.component';
import { useDeleteRequirementMutation } from '@/redux/apis/marketplace';
import { showToast, ToastTypes } from '@/common/utils';

type componentProps = {
  onAddRequirement: (value: IRequirementState) => void;
  setOptionsSetReactSortable: React.Dispatch<React.SetStateAction<boolean>>;
  optionsSetReactSortable: boolean;
  requirementSelect: IRequirementState;
  setRequirementSelect: React.Dispatch<React.SetStateAction<IRequirementState>>;
  onUpdateRequirement: (value: IRequirementState) => void;
  reloadData: () => void;
};

const requirementTypeSelect = ['Free text', 'Multiple choice', 'File upload'];

export const DiscardMessage = ({ edit }: { edit: boolean }) => {
  return (
    <Box sx={{ marginBlock: '0.5em' }}>
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{edit ? 'Quit editing?' : 'Discard'}</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 'normal' }}>
        Any unsaved {edit ? 'edits' : 'changes'} you made so far will be gone.
      </Typography>
    </Box>
  );
};

const DeleteMessage = () => {
  return (
    <Box sx={{ marginBlock: '0.5em' }}>
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Delete this requirement?</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 'normal' }}>You won&apos;t be able to undo this actions.</Typography>
    </Box>
  );
};

const AddRequirementModalComponent = ({
  onAddRequirement,
  onUpdateRequirement,
  requirementSelect,
  setOptionsSetReactSortable,
  optionsSetReactSortable,
  setRequirementSelect,
  reloadData,
}: componentProps) => {
  const [requirementType, setRequirementType] = useState<string>('');
  const [options, setOptions] = useState<{ id: number; option: string }[]>([
    { id: 0, option: '' },
    { id: 1, option: '' },
  ]);
  const [optionsError, setOptionsError] = useState<number[]>([]);
  const [optionErrorFlag, setOptionErrorFlag] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [openDiscardBox, setOpenDiscardBox] = useState<boolean>(false);
  const [deleteRequirementAlert, setDeleteRequirementAlert] = useState<boolean>(false);
  const [deleteRequirement, { error: serviceSetupError }] = useDeleteRequirementMutation();

  useEffect(() => {
    if (!isUndefined(serviceSetupError)) {
      const message = serviceSetupError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [serviceSetupError]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: yupResolver(RequirementSchema()),
    defaultValues: {
      id: requirementSelect.id,
      type: requirementSelect.type,
      question: requirementSelect.question,
      options: requirementSelect.options ? requirementSelect.options : ['', ''],
      isAllowMultipleChoice: requirementSelect.isAllowMultipleChoice ? requirementSelect.isAllowMultipleChoice : false,
      edit: requirementSelect.edit,
      isRequired: requirementSelect.isRequired,
    },
  });

  useEffect(() => {
    setRequirementType(requirementSelect.type);
    setValue('id', requirementSelect.id);
    setValue('type', requirementSelect.type);
    setValue('question', requirementSelect.question);
    setValue('options', requirementSelect.options ? requirementSelect.options : ['', '']);
    setValue('isAllowMultipleChoice', requirementSelect.isAllowMultipleChoice ? requirementSelect.isAllowMultipleChoice : false);
    setValue('edit', requirementSelect.edit);
    setValue('isRequired', requirementSelect.isRequired);
  }, [requirementSelect]);

  const addRequirementHandler = async (data: any) => {
    setOptionErrorFlag(false);
    setOptionsError([]);
    const optionErrors =
      requirementType === 'Multiple choice'
        ? data.options.filter((value: string, key: number) => {
            if (isEmpty(value) || value.length < 3) {
              setOptionsError((prevState) => [...prevState, key]);
              return true;
            }
          })
        : [];
    if (isEmpty(optionErrors)) {
      const addRequirementDetails = {
        ...data,
        no: requirementSelect.no,
      };
      if (requirementSelect.edit) {
        onUpdateRequirement(addRequirementDetails);
      } else {
        onAddRequirement(addRequirementDetails);
      }
      setRequirementType('Free text');
      reset();
      setOptions([
        { id: 0, option: '' },
        { id: 1, option: '' },
      ]);
    } else {
      setOptionErrorFlag(true);
    }
  };

  const onDeleteHandle = async () => {
    setIsDeleteLoading(true);
    setDeleteRequirementAlert(false);
    await deleteRequirement({ requirementId: requirementSelect.id });
    reloadData();
    setIsDeleteLoading(false);
    reset();
  };

  return (
    <Box sx={{ border: '1px solid #eee', padding: '1.8em 1.2em' }}>
      <form onSubmit={handleSubmit(addRequirementHandler)}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1.2em' }}>
          <Typography style={{ fontWeight: '700' }}>Requirement reply type</Typography>
          <Controller
            name={`isRequired`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <AppThemeSwitch
                    defaultChecked
                    checked={field.value}
                    onClick={() => {
                      setValue(`isRequired`, !field.value);
                    }}
                  />
                }
                label='Required'
              />
            )}
          />
        </Box>
        <Controller
          control={control}
          name={'question'}
          render={({ field }) => (
            <TextBoxComponent description={field.value} onChange={field.onChange} errors={errors} fieldName={'question'} />
          )}
        />
        <Typography style={{ fontWeight: '700', marginTop: '1.8em' }}>Request the info you need from your customers </Typography>
        <Controller
          control={control}
          name={'type'}
          render={({ field }) => (
            <Select
              displayEmpty
              value={field.value}
              onChange={(e) => {
                setRequirementType(e.target.value);
                field.onChange(e);
              }}
              renderValue={() => {
                if (isEmpty(field.value)) {
                  return <em>Select</em>;
                }
                return field.value;
              }}
              size='small'
              MenuProps={MenuProps}
              className='Mui-focused'
              sx={{
                width: { xs: '100%', md: '40%' },
                border: errors['type'] && errors['type']?.message ? `1px solid ${Color.negative}` : '1px solid #EAEAEA',
                borderRadius: '2px',
                height: '44px',
                fontSize: '14px',
                boxShadow: 'none',
                marginTop: '1em',
              }}
            >
              {requirementTypeSelect.map((name, key) => (
                <MenuItem key={key} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {Boolean(errors.type?.message) && <Typography className='errorMessage'>{errors.type?.message as never}</Typography>}
        {requirementType === 'File upload' && (
          <>
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: '12px',
                color: '#7E7E7E',
                wordBreak: 'break-all',
                marginTop: '1em',
                width: '100%',
              }}
            >
              Tip: Make sure to let buyer know all info you need in file upload.
            </Typography>
            <ul
              style={{
                fontWeight: '400',
                fontSize: '12px',
                color: '#7E7E7E',
                wordBreak: 'break-all',
                width: '100%',
              }}
            >
              <li>Format not supported: .exe, .js</li>
              <li>Max file size: 100 MB</li>
            </ul>
          </>
        )}
        {requirementType === 'Multiple choice' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1em' }}>
            <CheckBoxComponent
              checkedBoxColor={'#2752E7'}
              name={'isAllowMultipleChoice'}
              control={control}
              setValue={setValue}
              labelValue={'Allow to choose more than 1 option'}
            />
            <ReactSortable
              list={options}
              group='cards'
              animation={150}
              setList={async (e) => {
                setOptions(() => {
                  if (optionsSetReactSortable) {
                    const sortOptions = e.map((value) => {
                      return value.option;
                    });
                    setValue('options', sortOptions);
                    return e;
                  } else if (!isUndefined(requirementSelect.options) && !isEmpty(requirementSelect.options)) {
                    setOptionsSetReactSortable(true);
                    return requirementSelect.options.map((value, key) => ({
                      id: key,
                      option: value,
                    }));
                  } else {
                    setOptionsSetReactSortable(true);
                    return [
                      { id: 0, option: '' },
                      { id: 1, option: '' },
                    ];
                  }
                });
              }}
            >
              {options.map((value, index) => (
                <OptionsUIComponent
                  setValue={setValue}
                  options={options}
                  setOptions={setOptions}
                  key={index}
                  optionDescription={value.option}
                  optionNo={index + 1}
                  errorFlag={optionsError.includes(index) && optionErrorFlag}
                  setErrorFlag={setOptionErrorFlag}
                />
              ))}
            </ReactSortable>
            {options.length < 5 && (
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1em' }}>
                <Button
                  onClick={() => setOptions([...options, { id: options.length, option: '' }])}
                  sx={{ color: Color.priBlue, fontSize: '14px', textTransform: 'none' }}
                >
                  + Add option
                </Button>
                {/*<Typography sx={{ marginTop: '-2px', color: '#7E7E7E' }}> or </Typography>*/}
                {/*<Button*/}
                {/*  onClick={() => {*/}
                {/*    setOptions([...options, { id: options.length, option: 'Other' }]);*/}
                {/*    setValue('options', [...options.map((value) => value.option), 'Other']);*/}
                {/*  }}*/}
                {/*  disabled={!isEmpty(options.filter((value) => value.option === 'Other'))}*/}
                {/*  sx={{ color: Color.priBlue, fontSize: '14px', textTransform: 'none' }}*/}
                {/*>*/}
                {/*  + Add other*/}
                {/*</Button>*/}
              </Box>
            )}
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5em' }}>
          {requirementSelect.edit ? (
            <Button
              onClick={() => setDeleteRequirementAlert(true)}
              sx={{ width: 'fit-content !important', textTransform: 'none' }}
            >
              <Typography className='errorMessage' style={{ color: isDeleteLoading ? Color.bgGreyDark : '#e11900' }}>
                {isDeleteLoading ? 'Loading...' : 'Delete'}
              </Typography>
            </Button>
          ) : (
            <Box />
          )}
          <Box sx={{ display: 'flex' }}>
            {requirementSelect.edit && (
              <Button onClick={() => setOpenDiscardBox(true)} sx={{ width: 'fit-content !important', marginRight: '3em' }}>
                <Typography className='removeBtn'>Cancel</Typography>
              </Button>
            )}
            <AppThemeBtnComponent
              type='submit'
              customButtonStyle={{
                height: '40px',
                border: `1px solid ${isSubmitting ? Color.bgGreyDark : requirementSelect.edit ? Color.positive : Color.priBlue}`,
                display: 'block',
                '&:hover': {
                  backgroundColor: 'rgba(39,82,231,0.4)',
                },
              }}
              color={isSubmitting ? Color.bgGreyDark : requirementSelect.edit ? Color.positive : Color.priBlue}
              backgroundColor={isSubmitting ? Color.bgGreyLight : Color.priWhite}
              width={'7em'}
              fontSize={'14px'}
              hover={Color.textHint}
              text={isSubmitting ? 'Loading...' : requirementSelect.edit ? 'Update' : 'Add'}
            />
          </Box>
        </Box>
      </form>
      <Modal
        isOpen={openDiscardBox}
        content={<DiscardMessage edit={requirementSelect.edit} />}
        okBtnLabel={requirementSelect.edit ? 'Quit editing?' : 'Discard'}
        isRedPriButton={true}
        cancelBtnText={'Cancel'}
        buttons={{ fontSize: '12px', width: { xs: '50%', md: '45%' } }}
        onCancel={() => {
          setOpenDiscardBox(false);
        }}
        onOk={() => {
          setRequirementSelect({
            id: '',
            edit: false,
            type: 'Free text',
            no: 0,
            isAllowMultipleChoice: false,
            options: [],
            question: '',
            isRequired: false,
          });
          setOpenDiscardBox(false);
        }}
      />
      <Modal
        isOpen={deleteRequirementAlert}
        content={<DeleteMessage />}
        okBtnLabel={'Delete'}
        isRedPriButton={true}
        cancelBtnText={'Cancel'}
        onCancel={() => {
          setDeleteRequirementAlert(false);
        }}
        onOk={onDeleteHandle}
      />
    </Box>
  );
};

export default AddRequirementModalComponent;
