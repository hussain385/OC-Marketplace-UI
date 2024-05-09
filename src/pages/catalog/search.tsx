import React from 'react';
import NavBar from '@/common/components/navbar';
import CategoryListBarComponent from '@/common/components/category-list-bar.component.tsx';
import SearchResultComponent from '@/modules/catalog/search/component/searchResult.component.tsx';
import { Box } from '@mui/material';

function CatalogSearchPage() {
  return (
    <Box>
      <NavBar />
      <CategoryListBarComponent navFix={false} isNotActive />
      <SearchResultComponent />
    </Box>
  );
}

export default CatalogSearchPage;
