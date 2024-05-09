import React from 'react';
import usePagination, { UsePaginationProps } from '@mui/material/usePagination';
import { styled, SxProps } from '@mui/material';
import { Color } from '../../theme';

interface IPagination {
  listSx?: SxProps;
  options: UsePaginationProps;
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
}

/**
 * Common Pagination of our app
 *
 * @param listSx Main container styling with SxProps
 * @param options The options of MUI pagination hook
 * @param previousIcon Icon if you want to change previous, prefer import from @mui/icons or svg
 * @param nextIcon Icon if you want to change Next, prefer import from @mui/icons or svg
 * @constructor
 */
function Pagination({ listSx, options, previousIcon, nextIcon }: IPagination) {
  const { items } = usePagination(options);

  return (
    <PaginationList sx={listSx}>
      {items.map(({ type, page, selected, ...item }, index) => {
        let children = null;

        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          children = '_';
        } else if (type === 'page') {
          children = (
            <button type='button' style={{ color: selected ? 'black' : 'gray' }} {...item}>
              {page}
            </button>
          );
        } else if (type === 'previous') {
          children = (
            <button
              type='button'
              style={{ color: !item.disabled ? Color.textBlack : undefined }}
              className={'nav-text'}
              {...item}
            >
              {previousIcon ? previousIcon : type}
            </button>
          );
        } else if (type === 'next') {
          children = (
            <button
              type='button'
              style={{ color: !item.disabled ? Color.textBlack : undefined }}
              className={'nav-text'}
              {...item}
            >
              {nextIcon ? nextIcon : type}
            </button>
          );
        } else {
          children = (
            <button
              type='button'
              style={{ color: !item.disabled ? Color.textBlack : undefined }}
              className={'nav-text'}
              {...item}
            >
              {type}
            </button>
          );
        }

        return <li key={index}>{children}</li>;
      })}
    </PaginationList>
  );
}

const PaginationList = styled('ul')`
  list-style: none;
  display: flex;
  padding: 0;
  gap: 10px;
  margin: 0;
  align-self: end;
  align-items: center;

  & button {
    border: none;
    background: transparent;
    font-size: 12px !important;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.5px;
  }

  & .nav-text {
    text-transform: capitalize;
    display: flex;
    align-content: center;

    & svg {
      font-size: 14px;
    }
  }
`;

export default Pagination;
