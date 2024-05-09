import { Box, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';
import EmptyResult from '../../assets/catalog-icons/empty-results.svg';
import { createNoResultFoundContext, createNoresultFoundLabel } from '../utils/global_state.util';
import { Color } from '../../theme';

const SearchEmptyResult = () => {
  const location = useLocation();

  const filterState = !isUndefined(location?.state)
    ? (
        location.state as {
          filterValue: string;
        }
      )?.filterValue
    : undefined;

  const [noResultFound] = createNoResultFoundContext();
  const [labelNotFound] = createNoresultFoundLabel();

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        gridTemplaceColumns: '1fr',
        gridTemplateRows: '100%',
        height: '100%',
        paddingY: '40px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={EmptyResult} alt='empty result' />

        {noResultFound && (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '32px',
                letterSpacing: '-0.03em',
                maxWidth: '100%',
                textAlign: 'center',
              }}
            >
              We couldn&apos;t find any matches for <br />
              <span style={{ color: Color.priBlue }}>&apos;{labelNotFound}&apos;</span>
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '32px',
                letterSpacing: '-0.03em',
                maxWidth: '432px',
                color: Color.textHint,
              }}
            >
              Check your search for any typos or try a different search term
            </Typography>
          </>
        )}

        {!noResultFound && (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '32px',
                letterSpacing: '-0.03em',
                maxWidth: '36ch',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              We couldn&apos;t find any matches for <br />
              <span style={{ color: Color.priBlue }}>
                &apos;
                {!isUndefined(filterState) && filterState ? (
                  <p
                    style={{
                      maxWidth: '35ch',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: 0,
                      display: 'table-cell',
                    }}
                  >
                    {filterState}
                  </p>
                ) : (
                  <span>%$^%$^%$</span>
                )}
                &apos;
              </span>
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '32px',
                letterSpacing: '-0.03em',
                maxWidth: '432px',
                color: Color.textHint,
              }}
            >
              Check your search for any typos or try a different search term
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchEmptyResult;
