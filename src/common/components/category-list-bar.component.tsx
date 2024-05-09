/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { isUndefined } from 'lodash';

import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { Color } from '../../theme';

import { BoxScroll, ContainerNav } from '../styles/category-list-bar.styles';

import './style.css';

import { useGetCategoriesQuery } from '../../redux/apis/catalogApi';

import { allCategoriesUpdateAction, categoryUpdateAction } from '../../redux/reducers/catalogReducer';

type PropsType = {
  navFix?: boolean;
  isNotActive?: boolean;
};

const CategoryListBarComponent = ({ navFix, isNotActive }: PropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [scrollDirection, setScrollDirection] = useState<string>();
  const { category, allCategories } = useAppSelector((state) => state.mainState.buyerCatalog);

  const { isLoading, data: servicesOffer } = useGetCategoriesQuery({ filter: 'level||$eq||1' });

  useEffect(() => {
    if (!isUndefined(servicesOffer)) {
      dispatch(allCategoriesUpdateAction(servicesOffer?.data));
    }
  }, [dispatch, servicesOffer]);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener

    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  if (isLoading) {
    return (
      <BoxScroll className={`header ${navFix ? 'down' : scrollDirection === 'down' ? 'down' : 'up'}`}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={5}
          sx={{
            width: '100%',
            margin: '0 auto',
            maxWidth: '1300px',
            display: 'flex',
            gap: { md: '3%', lg: '4%' },
          }}
        >
          <ContainerNav>
            <CircularProgress color='secondary' size={30} />
          </ContainerNav>
        </Stack>
      </BoxScroll>
    );
  }

  const onClickHandler = (category: string, id: string) => {
    dispatch(categoryUpdateAction({ name: category, id: id }));
    navigate('/catalog/category');
  };

  return (
    <BoxScroll className={`header ${navFix ? 'down' : scrollDirection === 'down' ? 'down' : 'up'}`}>
      <Box
        style={{
          width: '100%',
          maxWidth: '78em',
          display: 'flex',
          margin: '0 auto',
          alignItems: 'center',
          paddingInline: '10px',
          justifyContent: 'space-between',
        }}
      >
        {servicesOffer?.data
          .map((value, key: number) => (
            <ContainerNav
              key={key}
              onClick={() => onClickHandler(value.name, value.id)}
              sx={{
                paddingInline: '10px',
                borderBottom: category.name === value.name && isUndefined(isNotActive) ? `2px solid ${Color.priBlue}` : 'none',
              }}
            >
              <Typography
                sx={{
                  color: category.name === value.name && isUndefined(isNotActive) ? Color.priBlue : Color.textBlack,
                  fontWeight: 600,
                  fontSize: '1rem',
                  lineHeight: 1.25,
                }}
              >
                {value.name}
              </Typography>
            </ContainerNav>
          ))
          .reverse()}
      </Box>
    </BoxScroll>
  );
};

export default CategoryListBarComponent;
