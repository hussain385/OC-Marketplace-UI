export interface IOrderStatusBoxProps {
  title?: string;
  subtext?: string | React.ReactNode;
  status?: string;
  onActionClick?: () => void;
}
