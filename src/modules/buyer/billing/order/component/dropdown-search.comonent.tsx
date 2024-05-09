import { Button, Menu, SxProps } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Color } from '../../../../../theme';
import { Text14 } from '../../../../../common/styles';
import { SearchBoxComponent } from '../../../../../common/components/search-box/search-box.component';

type Props = {
  label: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  onClear?: () => void;
  buttonOverrideStyle?: SxProps;
};

const DropDownSearch = ({ label, onChange, onEnter, onClear, buttonOverrideStyle }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | number>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{ color: Color.pureBlack, textTransform: 'initial', ...buttonOverrideStyle }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Text14 sx={{ fontWeight: '600' }}>
          {label ? label : '[Label]'}: {/*!isEmpty(dateRangeLabel) ? dateRangeLabel : 'All'*/}
        </Text14>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        PaperProps={{
          style: {
            width: 345,
            borderRadius: 0,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            padding: '15px',
          },
        }}
        anchorEl={anchorEl as any}
        open={open}
        onClose={handleClose}
      >
        <SearchBoxComponent
          placeholder='Search company name'
          onEnter={(value: string) => onEnter && onEnter(value)}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onChange && onChange(e.target.value)}
          onClear={() => onClear && onClear()}
        />
      </Menu>
    </>
  );
};

export default DropDownSearch;
