// @flow
import { Button, Typography } from '@mui/material';

import React from 'react';

import { useNavigate } from 'react-router-dom';

type PropType = {
  title: string;
  fileName: string;
  id: number | string;
  description: string;
};

export const CategoryButton = ({ title, fileName, id, description }: PropType) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() =>
        navigate(`/catalog/sub-category/${id}`, {
          state: {
            id: id,
            description: description,
            title: title,
          },
        })
      }
      sx={{
        minWidth: { xs: '100%', md: '21.5em' },
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '3.5em',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
        marginRight: '1em',
        marginTop: '1em',
      }}
    >
      <img
        style={{ width: '22px', height: '22px', marginLeft: '5px' }}
        src={require(`../../../assets/catalog-icons/${fileName.replace('/', '')}`).default}
        alt={title}
      />
      <Typography sx={{ color: 'black', textTransform: 'capitalize', marginLeft: '10px', fontSize: '15px' }}>{title}</Typography>
    </Button>
  );
};
