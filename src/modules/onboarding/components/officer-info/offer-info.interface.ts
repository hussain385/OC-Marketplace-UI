export interface IOfficerInfo {
  id?: string;
  name?: string;
  role?: string;
  picture?: string;
  isClickable?: boolean;
  onClickHandle?: (e: any) => void;
  onClick?: () => void;
  selectedId?: string;
}

export interface IOfficerValues {
  officerId: string;
  officerName: string;
  position: string;
  email?: string;
}
