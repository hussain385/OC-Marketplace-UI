import React from 'react';
import { Box } from '@mui/material';
import { GridBoxContainer, GridTextExplore } from '../styles/homepage.styles';
import { Color } from '@/theme';

function CategoryCardComponent({
  item,
  index,
  clickEvent,
}: {
  item: { id: string; heading: string; icon: string };
  index: number;
  clickEvent: (category: string, id: string) => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexBasis: { xs: '41.67%', sm: '25%', md: '16.67%' },
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <GridBoxContainer
        className={
          index === 0 ? 'ripple1' : index === 1 ? 'ripple2' : index === 2 ? 'ripple3' : index === 3 ? 'ripple4' : 'ripple1'
        }
        onClick={() => clickEvent(item?.heading, item?.id)}
      >
        <img
          style={{
            width: '72px',
            borderRadius: '8px',
            height: '72px',
          }}
          src={require(`../../assets/home-page/buyer/categories/${item.icon}`).default}
          alt={item?.heading}
        />
        <Box>
          <GridTextExplore>{item?.heading}</GridTextExplore>
        </Box>
        <Box sx={{ width: '64px', height: '6px', borderRadius: '6px', backgroundColor: Color.priBlue }} />
      </GridBoxContainer>
    </Box>
  );
}

export default CategoryCardComponent;
