import { Tabs, TabsProps as MuiTabsProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledTab } from '../../styles';
import { Color } from '../../../theme';
import { TabsProps } from './tabs.interface';

export const OMTabs = ({
  tabs,
  activeTab,
  onTabChange,
  containerStyle,
  activeCount,
  ...otherProps
}: TabsProps & MuiTabsProps & { activeCount?: string }) => {
  const active: number = activeTab && activeTab <= tabs.length ? activeTab : 0;
  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, index: number) => {
    setCurrentTab(index);
    typeof onTabChange === 'function'
      ? onTabChange({ index: index, label: tabs[index], tag: tabs[index].replace(/\s/g, '-').toUpperCase() })
      : null;
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentTab(active);
    }, 500);
  }, [active]);

  return (
    <Tabs
      {...otherProps}
      sx={{ '& .MuiButtonBase-root': { fontSize: '14px' }, ...containerStyle }}
      value={currentTab}
      onChange={handleChange}
      TabIndicatorProps={{
        style: {
          backgroundColor: Color.priBlue,
          height: '4px',
        },
      }}
    >
      {tabs
        ? tabs.map((label: string, index: number) => (
            <StyledTab key={index} label={`${label}${activeCount && currentTab === index ? `(${activeCount})` : ''}`} />
          ))
        : null}
    </Tabs>
  );
};
