import React, { useState, useEffect } from 'react';

import { Box, Stack, Typography, styled, CircularProgress } from '@mui/material';

import '../styles/nav-scroll.css';

import { useNavigate } from 'react-router-dom';

import { Color } from '../../theme';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import waitSec from '../utils/helpers/setTimeout';
import { categoryUpdateAction } from '../../redux/reducers/catalogReducer';

const TextInfoLoader = React.lazy(async () => {
  const [moduleExports] = await Promise.all([import('./text-info-loader.component'), waitSec(3000)]);
  return moduleExports;
});

type PropsType = {
  navFix?: boolean;
  loading?: boolean;
};

export const BoxScroll = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  left: 0,
  right: 0,
  width: '100%',
  margin: '0 auto',
  background: 'rgba(255, 255, 255)',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const BoxText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.25,
}));

export const ContainerNav = styled(Box)(() => ({
  paddingBlock: '1.2em',
  cursor: 'pointer',
}));

const NavElement = ({ navFix, loading }: PropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [scrollDirection, setScrollDirection] = useState<string>();
  const { category, allCategories } = useAppSelector((state) => state.mainState.buyerCatalog);

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

  if (loading) {
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
      <Box className='headerBox'>
        {allCategories?.map((value: any, key: number) => (
          <ContainerNav
            key={key}
            onClick={() => onClickHandler(value.name, value.uid)}
            sx={{ borderBottom: category.name === value.name ? `2px solid ${Color.priBlue}` : 'none' }}
          >
            <TextInfoLoader
              sx={{
                color: category === value.name ? Color.priBlue : Color.textBlack,
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: 1.25,
              }}
              text={value.name}
            />
          </ContainerNav>
        ))}
      </Box>
    </BoxScroll>
  );
};

export default NavElement;
