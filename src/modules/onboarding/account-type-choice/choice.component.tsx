// @flow
import React from 'react';
import { Box } from '@mui/material';
import { AppThemeBtnComponent } from '../../../common/components/app-theme-btn.component';
import { Color } from '../../../theme';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../redux/hooks';
import { identityUserInfoTempDataUpdated } from '../../../redux/reducers/authReducers';

type Props = {
  image: any;
  heading: string;
  description: string;
  navigationLink: string;
};
export const ChoiceComponent = ({ image, heading, description, navigationLink }: Props) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const navigateRoute = () => {
    dispatch(identityUserInfoTempDataUpdated({}));
    navigate(navigationLink);
  };

  return (
    <Box
      onClick={navigateRoute}
      sx={{
        width: '21em',
        height: '21em',
        padding: '1.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <img src={image} alt='type' />
        <h3 style={{ margin: 0 }}>{heading}</h3>
        <p>{description}</p>
      </div>
      <AppThemeBtnComponent
        onClick={navigateRoute}
        color={'white'}
        backgroundColor={Color.priBlue}
        width={'60%'}
        text={'Choose'}
        hover={'#1e3fb2'}
      />
    </Box>
  );
};
