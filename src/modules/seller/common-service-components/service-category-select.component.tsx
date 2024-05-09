import React from 'react';
import { Box, Typography } from '@mui/material';
import { MenuProps } from '../account/professional-services';
import { subText } from '../manage-listing/manage-listing-form/overview.view';
import { useGetCategoriesQuery } from '@/redux/apis/catalogApi.ts';
import SelectForm from '@/common/components/forms/select.form.tsx';
import { useWatch } from 'react-hook-form';

type componentProps = {
  errors: any;
  control: any;
  setValue: any;
};

const ServiceCategorySelectComponent = ({ errors, control, setValue }: componentProps) => {
  /**
   * Main Categories state
   */
  const field = useWatch({ control, name: 'category' });

  /**
   * Main Categories
   */
  const { category, isLoading } = useGetCategoriesQuery(
    { filter: 'level||$eq||1' },
    { selectFromResult: (data) => ({ category: data.data?.data ?? [], isLoading: data.isLoading }) },
  );

  /**
   * Sub Categories
   */
  const { subCategory, isFetching } = useGetCategoriesQuery(
    { filter: ['level||$eq||1', `id||$eq||${field}`], join: ['childs'] },
    { skip: !field, selectFromResult: (data) => ({ subCategory: data.data?.data[0].childs ?? [], isFetching: data.isFetching }) },
  );

  return (
    <div>
      <Typography className='subHeading' sx={{ marginTop: '1em' }}>
        Category
      </Typography>
      <Typography sx={subText}>Choose the most suitable category and subcategory for your service</Typography>
      <Box
        sx={{
          marginBlock: '0.7em',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'start',
          gap: '1em',
        }}
      >
        <SelectForm
          control={control}
          name={'category'}
          isLoading={isLoading}
          items={category.map((e) => ({ label: e.name, value: e.id }))}
          onChange={() => setValue('subCategory', '')}
          boxSx={{
            width: { xs: '100%', md: '21em' },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: errors.category?.message ? '1px solid #e11900 !important' : '1px solid #EAEAEA !important',
            },
          }}
          selectProps={{
            sx: {
              width: '100%',
              borderRadius: '2px',
              height: '44px',
              fontSize: '14px',
              boxShadow: 'none',
            },
            MenuProps: MenuProps,
            className: 'Mui-focused',
            size: 'small',
          }}
        />

        <SelectForm
          control={control}
          name={'subCategory'}
          isLoading={isFetching}
          items={subCategory.map((e) => ({ label: e.name, value: e.id }))}
          boxSx={{
            width: { xs: '100%', md: '21em' },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: errors.subCategory?.message ? '1px solid #e11900 !important' : '1px solid #EAEAEA !important',
            },
          }}
          selectProps={{
            classes: {},
            sx: {
              width: '100%',
              borderRadius: '2px',
              height: '44px',
              fontSize: '14px',
              boxShadow: 'none',
            },
            MenuProps: MenuProps,
            className: 'Mui-focused',
            size: 'small',
          }}
        />
      </Box>
    </div>
  );
};

export default ServiceCategorySelectComponent;
