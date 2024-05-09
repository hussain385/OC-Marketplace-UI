import { Box, Grid } from '@mui/material';
import React from 'react';
import { Heading20, ShadowBox, Text14 } from '@/common/styles';
import { GridColum, GridHeaderColum, GridColumnFooter, GridHeaderRowStyle } from './details.style';

const Details = () => {
  return (
    <ShadowBox sx={{ flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text14>Total Price:</Text14>
        <Heading20>$ 349</Heading20>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid container direction='row' sx={{ ...GridHeaderRowStyle }}>
          <GridHeaderColum item sx={{ borderWidth: 0 }}>
            Package Name
          </GridHeaderColum>
        </Grid>
        <Grid container direction='row' sx={{ ...GridHeaderRowStyle }}>
          <GridHeaderColum item lg={6}>
            Details
          </GridHeaderColum>
          <GridHeaderColum item lg={2} sx={{ textAlign: 'right' }}>
            Qty
          </GridHeaderColum>
          <GridHeaderColum item lg={2} sx={{ textAlign: 'right' }}>
            Duration
          </GridHeaderColum>
          <GridHeaderColum item lg={2} sx={{ textAlign: 'right' }}>
            Amount ($SGN)
          </GridHeaderColum>
        </Grid>
        <Grid container direction='row'>
          <GridColum item lg={6}>
            <strong>Tax Compliance & Tax Filing Services</strong>
            <ul>
              <li>Preparation, review and submission of finalised tax returns</li>
              <li>Monitoring of statutory tax filing deadlines and satisfying all necessary requirements</li>
            </ul>
          </GridColum>
          <GridColum item lg={2} sx={{ textAlign: 'right' }}>
            1.0
          </GridColum>
          <GridColum item lg={2} sx={{ textAlign: 'right' }}>
            7 days
          </GridColum>
          <GridColum item lg={2} sx={{ textAlign: 'right' }}>
            $ 300
          </GridColum>
        </Grid>
        <Grid container direction='row'>
          <GridColum item lg={10}>
            Subtotal
          </GridColum>
          <GridColum item lg={2} sx={{ textAlign: 'right' }}>
            $ 340
          </GridColum>
        </Grid>
        <Grid container direction='row'>
          <GridColum item lg={10}>
            Service
          </GridColum>
          <GridColum item lg={2} sx={{ textAlign: 'right' }}>
            $ 20
          </GridColum>
        </Grid>
        <Grid container direction='row'>
          <GridColumnFooter item lg={8} sx={{ fontWeight: 700 }}>
            Total
          </GridColumnFooter>
          <GridColumnFooter item lg={2} sx={{ fontWeight: 700, textAlign: 'right' }}>
            5 days
          </GridColumnFooter>
          <GridColumnFooter item lg={2} sx={{ fontWeight: 700, textAlign: 'right' }}>
            $ 349
          </GridColumnFooter>
        </Grid>
      </Box>
    </ShadowBox>
  );
};

export default Details;
