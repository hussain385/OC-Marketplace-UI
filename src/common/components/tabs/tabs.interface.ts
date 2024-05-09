import { SxProps } from '@mui/material';

export interface OnTabChangeProps {
  index: number;
  label: string;
  tag: string;
}

export interface TabsProps {
  activeTab?: number;
  tabs: string[];
  onTabChange?: (event: OnTabChangeProps) => void;
  containerStyle?: SxProps;
}
