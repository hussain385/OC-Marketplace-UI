import { Box, Breadcrumbs, Link, SxProps, Typography } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import React, { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { isUndefined } from 'lodash';

import BackLayout from './back.layout';

import { BoxContainer, PrimaryButton } from '../styles';

import LogoutModal from '../components/logout-popup.component';

import { RenderIf, useMediaBreakpoint } from '../components';

import { useGlobalLogoutState } from '../utils/global_state.util';

import LinkBehavior from '../components/LinkBehavior';
import NavBar from '@/common/components/navbar';

interface Breadcrumb {
  label: string;
  path?: string;
}

type TProps = {
  pageTitle?: string | ReactNode;
  children?: React.ReactNode;
  breadcrumb?: Breadcrumb[];
  teamManagement?: boolean;
  pageDesc?: string;
  handlerInviteMember?: () => void | undefined;
  customStyleContainer?: SxProps;
  headingShown?: boolean;
  roles?: string[];
  isFullWidth?: boolean;
};

const MainLayout: React.FC<TProps> = ({
  pageTitle,
  children,
  breadcrumb,
  pageDesc,
  teamManagement,
  handlerInviteMember,
  customStyleContainer,
  headingShown,
  roles = [],
  isFullWidth,
}) => {
  const [logoutModal] = useGlobalLogoutState();
  const { xs, sm, mdLg } = useMediaBreakpoint();

  const navigate = useNavigate();

  const backHandler = () => {
    navigate('/account');
  };

  return (
    <Box className='main-layout'>
      <RenderIf value={xs}>
        <BackLayout backHandler={backHandler} />
      </RenderIf>
      <NavBar />
      <Box
        sx={(theme) => ({
          paddingY: '20px',
          position: 'relative',
          height: 'auto',
          display: 'block',
          width: '100%',
          margin: '0 auto',
          [theme.breakpoints.up('sm')]: {
            display: 'block',
            width: '92%',
            margin: '0 auto',
          },
          [theme.breakpoints.up('md')]: {
            display: 'block',
            width: isFullWidth ? '100%' : '92%',
            maxWidth: !isFullWidth ? '1280px' : '100%',
            margin: '0 auto',
          },
        })}
      >
        <RenderIf value={sm || mdLg}>
          {breadcrumb && (
            <BoxContainer className='print-hide'>
              <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
                {breadcrumb.map((item, index) => {
                  if (item.path) {
                    return (
                      <Link
                        component={LinkBehavior}
                        underline='hover'
                        key={index}
                        color='#000'
                        href={index !== breadcrumb.length ? item.path : '#'}
                        style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '-0.36px' }}
                      >
                        {item.label}
                      </Link>
                    );
                  } else {
                    return (
                      <Typography
                        key={index}
                        sx={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '-0.36px', color: '#7E7E7E' }}
                      >
                        {item.label}
                      </Typography>
                    );
                  }
                })}
              </Breadcrumbs>
            </BoxContainer>
          )}
        </RenderIf>
        <BoxContainer sx={{ ...customStyleContainer }}>
          {isUndefined(headingShown) && (
            <Typography
              variant='h5'
              component='h1'
              sx={{
                fontWeight: 700,
                fontSize: '20px',
                letterSpacing: '-0.5px',
                lineHeight: '24px',
                padding: { xs: '0 ', sm: '0', md: '0' },
              }}
            >
              {pageTitle}
            </Typography>
          )}

          <RenderIf
            value={
              !isUndefined(teamManagement) &&
              teamManagement === true &&
              xs &&
              (roles.includes('Owner') === true || roles.includes('Admin') === true)
            }
          >
            {/*{!isUndefined(user.claims) && user.claims[0]?.grant?.title !== 'Member' && (*/}
            <PrimaryButton sx={{ fontSize: '0.875rem', letterSpacing: '-0.5px' }} className='small' onClick={handlerInviteMember}>
              Invite staff
            </PrimaryButton>
            {/*)}*/}
          </RenderIf>
        </BoxContainer>

        {pageDesc && (
          <Box>
            <Typography
              sx={(theme) => ({
                fontSize: '12px',
                padding: '5px 0px 0px 0px',
                [theme.breakpoints.up('lg')]: {
                  fontSize: '15px',
                },
              })}
            >
              {pageDesc}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            minHeight: '80vh',
            ...customStyleContainer,
          }}
        >
          {children}
        </Box>
      </Box>
      {logoutModal && <LogoutModal />}
    </Box>
  );
};
export default MainLayout;
