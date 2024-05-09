import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { HeadingText } from '../../common/styles/homepage.styles';
import CategoryCardComponent from '../../common/components/category-card.component';
import { categoryUpdateAction } from '../../redux/reducers/catalogReducer';
import { useGetCategoriesQuery } from '@/redux/apis/catalogApi.ts';

type ExplorePropType = {
  loading?: boolean;
};

function ExploreMarketPlace({ loading }: ExplorePropType) {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { data: categories } = useGetCategoriesQuery({ filter: 'level||$eq||1' });
  const [data, setData] = useState<{ icon: string; heading: string; id: string }[]>([]);

  useEffect(() => {
    dispatch(categoryUpdateAction({ name: '', id: '' }));
  }, []);

  useEffect(() => {
    setData(
      () =>
        categories?.data.map((value) => ({
          icon: `${value.name.split(' ')[0]}.svg`,
          heading: value.name,
          id: value.id,
        })) ?? [],
    );
  }, [categories?.data]);

  const clickEvent = (category: string, id: string) => {
    dispatch(categoryUpdateAction({ name: category, id: id }));
    navigation('/catalog/category');
  };

  if (loading) {
    return (
      <Box>
        <Box color={'secondary'} sx={{ display: 'flex', mt: 5, mb: 5, justifyContent: 'center' }}>
          <HeadingText style={{ fontSize: '32px' }}>Explore the marketplace</HeadingText>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ marginBottom: '5em' }}>
      <Box color={'secondary'} sx={{ display: 'flex', mt: 5, mb: 5, justifyContent: 'center' }}>
        <HeadingText sx={{ fontSize: { xs: '26px', md: '32px' }, textAlign: 'center' }}>Explore the marketplace</HeadingText>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'center', md: 'center' },
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: { xs: '16px', sm: '19px', md: '24px' },
        }}
      >
        {data
          .map((item, index: number) => <CategoryCardComponent key={index} item={item} index={index} clickEvent={clickEvent} />)
          .reverse()}
      </Box>
    </Box>
  );
}

export default ExploreMarketPlace;
