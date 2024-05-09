/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Color } from '../../theme';

const TextBoxItem = styled('p')(() => ({
  fontSize: '12px',
  fontWeight: 600,
  display: 'flex',
  gap: '16px',
  lineHeight: 2,
  letterSpacing: '-0.5px',
  color: Color.textHint,
  '&:hover': {
    cursor: 'pointer',
  },
}));

function MuiTextList<T>({
  lists,
  render,
  style,
  clickEvent,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
  lists: T[];
  render: (list: T) => React.ReactNode | any;
  clickEvent: (list: T) => void;
  style?: any;
}) {
  return (
    <Box>
      {lists.map((list: any, index: number) => (
        <TextBoxItem
          {...rest}
          sx={() => ({
            ...style,
          })}
          onClick={() => clickEvent(list)}
          key={index}
        >
          <i>
            <img src={list.icon} alt='' />
          </i>
          {list.label}
        </TextBoxItem>
      ))}
    </Box>
  );
}

export default MuiTextList;
