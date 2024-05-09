// @flow
import React from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useNavigate } from 'react-router-dom';

import { isEmpty, isNull, isUndefined } from 'lodash';

import { ReactComponent as CompareCheck } from '@/assets/icons/compare-check.svg';
import { ReactComponent as DotIcon } from '@/assets/icons/dot-icon.svg';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { showToast, ToastTypes } from '@/common/utils';

import { Color } from '@/theme';

import { Package } from '@/common/interface/service-interface';

import MuiAppThemeBtnComponent from '@/common/components/mui-app-theme-btn.component';

import { packageInfoUpdateAction } from '@/redux/reducers/catalogReducer';

import useBackToLogin from '@/common/utils/hooks/useBackToLogin';

import { NumericFormat } from 'react-number-format';

type companyServicesProps = {
  companyServices: Package[];
  serviceName: string;
  companyName?: string;
  categoryName: string;
  companyId: string | undefined;
  serviceId: string;
};

interface morePackage extends Package {
  [key: string]: any; // Adding an index signature
}

// Define the table rows based on the features you want to compare.
const tableRows = [
  { label: 'What you’ll get', key: 'description' },
  { label: 'Delivery time', key: 'deliveryDays' },
  { label: 'Requirements', key: 'prerequisite' },
  { label: 'Revision', key: 'maxRevision' },
  { label: 'Payment Plan', key: 'paymentType' },
  // Add other rows as needed
];

export const ComparePackagesComponent = ({
  companyServices,
  companyName,
  categoryName,
  serviceName,
  companyId,
  serviceId,
}: companyServicesProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const isMyOwnService = user?.roles.some((e) => e.entityId === companyId) as boolean;
  const { redirect } = useBackToLogin();

  const handleChoosePackage = async (companyServices: any) => {
    if (isEmpty(user)) {
      redirect();
    } else if (isNull(selectedEntity) || isUndefined(selectedEntity?.profile)) {
      navigate('/freelance-individual-registration');
      showToast('Please verify your identity/company', ToastTypes.SUCCESS);
    } else {
      dispatch(
        packageInfoUpdateAction({
          merchantId: '',
          planId: `${companyServices.id}`,
          serviceId: serviceId ? serviceId : '',
          companyId: companyId ? companyId : '',
          serviceName: serviceName,
          companyName: companyName ? companyName : '',
          categoryName: categoryName,
          whatYouGet: companyServices.description,
          deliveryTime: companyServices.duration,
          requirements: companyServices.requirements,
          paymentSchedule: companyServices.is_one_time_payment,
          packageHeading: companyServices.title,
          price: Number(companyServices.price),
          orderId: '',
          vkey: '',
          vcode: '',
          returnurl: '',
          callbackurl: '',
          paymentUrl: '',
        }),
      );
      navigate('/checkout');
    }
  };

  return (
    <TableContainer id='compare-packages' component={Paper} sx={{ marginTop: '1.5em' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#F7F7F7', fontWeight: 'bold' }}>Feature</TableCell>
            {companyServices.map((service, index) =>
              service.status === 'ACTIVE' ? (
                <TableCell sx={{ textAlign: 'center' }} key={index}>
                  <Typography style={{ color: Color.priBlue, marginBottom: '5px' }}>{service.name}</Typography>
                  <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                    <NumericFormat
                      value={service.price}
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      displayType={'text'}
                      style={{ fontSize: '18px', fontWeight: '700', color: Color.textBlack }}
                      prefix={'S$'}
                    />
                  </Typography>
                </TableCell>
              ) : null,
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row) => (
            <TableRow key={row.label}>
              <TableCell sx={{ backgroundColor: '#F7F7F7', fontWeight: 'bold', fontSize: '14px' }}>{row.label}</TableCell>
              {companyServices.map((service: morePackage, index) =>
                service.status === 'ACTIVE' ? (
                  <TableCell sx={{ textAlign: 'justify', fontSize: '14px' }} key={index}>
                    {row.key === 'description' ? (
                      <List sx={{ display: 'flex', flexDirection: 'column' }}>
                        <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          {service.description && (
                            <>
                              <ListItemIcon
                                sx={{ minWidth: '25px', marginRight: '0px', paddingTop: '7px', alignSelf: 'flex-start' }}
                              >
                                <CompareCheck />
                              </ListItemIcon>
                              <ListItemText
                                primary={service.description}
                                sx={{
                                  wordBreak: 'break-word',
                                  display: 'inline-block',
                                  textAlign: 'left',
                                  lineHeight: '19px',
                                  fontWeight: 500,
                                  alignSelf: 'flex-start',
                                }}
                              />
                            </>
                          )}
                        </ListItem>
                      </List>
                    ) : row.key === 'deliveryDays' ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
                        {service.deliveryDays ? `${service.deliveryDays} delivery days` : 'No delivery days'}
                      </Box>
                    ) : row.key === 'prerequisite' ? (
                      <List>
                        <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: '25px', marginRight: '0px', paddingTop: '2px', alignSelf: 'flex-start' }}>
                            {service.prerequisite && <DotIcon />}
                          </ListItemIcon>
                          <ListItemText
                            primary={`${service.prerequisite ? service.prerequisite : ''}`}
                            sx={{
                              wordBreak: 'break-word',
                              display: 'inline-block',
                              textAlign: 'left',
                              alignSelf: 'flex-start',
                            }}
                          />
                        </ListItem>
                      </List>
                    ) : row.key === 'maxRevision' ? (
                      <List>
                        <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: '25px', marginRight: '0px', paddingTop: '7px', alignSelf: 'flex-start' }}>
                            <CompareCheck />
                          </ListItemIcon>
                          <ListItemText
                            sx={{
                              wordBreak: 'break-word',
                              display: 'inline-block',
                              textAlign: 'left',
                              alignSelf: 'flex-start',
                            }}
                            primary={`${service.maxRevision ? service.maxRevision : 'No'} Revisions`}
                          />
                        </ListItem>
                      </List>
                    ) : service[row.key] ? (
                      <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <ListItemIcon sx={{ minWidth: '25px', marginRight: '0px', paddingTop: '7px', alignSelf: 'flex-start' }}>
                          <CompareCheck />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            wordBreak: 'break-word',
                            display: 'inline-block',
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                          }}
                          primary={`${service[row.key]}`}
                        />
                      </ListItem>
                    ) : (
                      ''
                    )}
                  </TableCell>
                ) : null,
              )}
            </TableRow>
          ))}
          {/* Render action buttons for choosing a package */}
          {!isMyOwnService && (
            <TableRow>
              <TableCell sx={{ backgroundColor: '#F7F7F7' }}></TableCell>
              {companyServices.map((service, index) =>
                service.status === 'ACTIVE' ? (
                  <TableCell sx={{ textAlign: 'center' }} key={index}>
                    <MuiAppThemeBtnComponent
                      type='submit'
                      onClick={() => handleChoosePackage(service)}
                      widthSize='70%'
                      disabled={user?.roles.some((e) => e.entityId === companyId)}
                      heightSize='30px'
                      style={{
                        background: user?.roles.some((e) => e.entityId === companyId) ? Color.bgGreyDark : Color.priBlue,
                        borderRadius: '3px',
                        color: Color.priWhite,
                        lineHeight: 1.71,
                        letterSpacing: '-0.5px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                      value={'Choose'}
                    />
                  </TableCell>
                ) : null,
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
