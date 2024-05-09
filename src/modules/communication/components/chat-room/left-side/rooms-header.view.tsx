/* eslint-disable no-console */
import { Box } from '@mui/material';
import React from 'react';
import { Text16 } from '@/common/styles';
import { ReactComponent as FilterIcon } from '../../../../../assets/icons/filter-icon.svg';
import DropDownMenu from '@/common/components/dropdown-menu-component';
import { IMenuItems } from '@/common/interface';
import { useMediaBreakpoint } from '@/common/components';

type Props = {
  onDropdownItemClick?: (item: IMenuItems) => void;
};

export const RoomHeaderView = ({ onDropdownItemClick }: Props) => {
  const { xs } = useMediaBreakpoint();
  return (
    <Box
      sx={{
        marginLeft: '23px',
        paddingBottom: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text16>Messages</Text16>
      <DropDownMenu
        icon={<FilterIcon />}
        noSelectionMode={false}
        onMenuItemClick={(item: IMenuItems) => {
          onDropdownItemClick && onDropdownItemClick(item);
        }}
        menuItems={[
          { name: 'All', value: 'ALL' },
          { name: 'Unread', value: 'UNREAD' },
          { name: 'Read', value: 'READ' },
          { name: 'Has File', value: 'HAS_FILE' },
        ]}
        buttonOverrideStyle={{ border: xs ? 'none' : 'inherit' }}
      />
    </Box>
  );
};
