import React, { useRef, useState } from 'react';
import { InputBase, Paper, SxProps } from '@mui/material';
import { paperStyle, searchBoxStyle } from './search-box.style';
import { ReactComponent as SearchIcon } from '../../../assets/icons/li_search.svg';
import ClearIcon from '@mui/icons-material/Clear';
import { Color } from '../../../theme';
import { isEmpty } from 'lodash';

interface Props {
  placeholder?: string;
  styleOverrides?: SxProps;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onEnter?: (value: string) => void;
  onClear?: () => void;
}

export const SearchBoxComponent = ({ placeholder, onChange, onEnter, onClear, styleOverrides }: Props & any) => {
  const [isClear, setIsClear] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>();
  const onKeyPressHandle = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter') {
      onEnter && onEnter(e.target.value);
      e.preventDefault();
    }
    return false;
  };
  const onChangeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setIsClear(true);
    }
    onChange && onChange(event);
  };
  const onClearBtnClick = () => {
    if (ref.current) {
      ref.current.value = '';
    }
    setIsClear(false);
    onClear && onClear();
  };
  return (
    <Paper component='form' sx={{ ...paperStyle, ...styleOverrides }} elevation={0}>
      <SearchIcon style={{ marginLeft: '15px' }} />
      <InputBase
        sx={searchBoxStyle}
        placeholder={placeholder ? placeholder : 'Search'}
        onChange={(e) => {
          if (isEmpty(e.target.value)) {
            onClearBtnClick();
            return;
          }
          onChangeHandle(e);
        }}
        onKeyPress={onKeyPressHandle}
        endAdornment={
          isClear ? (
            <ClearIcon sx={{ color: Color.textHint, cursor: 'pointer', fontSize: '18px' }} onClick={() => onClearBtnClick()} />
          ) : null
        }
        inputRef={ref}
      />
    </Paper>
  );
};
