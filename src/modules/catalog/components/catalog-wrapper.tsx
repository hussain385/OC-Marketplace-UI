// @flow
import React from 'react';

import { DetailOptionBar } from './detail-option-bar';

import { WrapperFooter, WrapperMain } from '../../../common/styles/navbar.styles';

import CategoryListBarComponent from '../../../common/components/category-list-bar.component';

import LandingFooter from '../../homePage/buyer/components/footer.component';

import NavBar from '@/common/components/navbar';

type WrapperProp = {
  children: React.ReactElement;
  detailBar?: boolean;
};

export const CatalogWrapper = ({ children, detailBar }: WrapperProp) => {
  return (
    <div>
      <NavBar />
      <CategoryListBarComponent navFix={true} />
      {detailBar && <DetailOptionBar />}
      <div>
        <WrapperMain sx={{ paddingBlock: '65px', maxWidth: { md: '1330px !important' } }}>{children}</WrapperMain>
      </div>
      <WrapperFooter>
        <LandingFooter />
      </WrapperFooter>
    </div>
  );
};
