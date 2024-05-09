import { styled } from '@mui/material';
import { ObjectValues } from '../interface';

export const Status = {
  Success: 'success',
  Error: 'error',
  info: 'info',
} as const;

export type TagStatusValues = ObjectValues<typeof Status>;

const BgColor: Record<TagStatusValues, string> = {
  success: 'rgba(44, 175, 112, 0.15)',
  info: 'rgba(247, 158, 27, 0.15)',
  error: 'rgba(255, 106, 104, 0.15)',
};

const TextColor: Record<TagStatusValues, string> = {
  success: '#2CAF70',
  error: '#F4333D',
  info: '#F79E1B',
};

interface ITagStatus {
  variant: TagStatusValues;
}

export const TagStatus = styled('div')<ITagStatus>`
  background: ${(props) => BgColor[props.variant]};
  color: ${(props) => TextColor[props.variant]};
  padding: 4px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;

  & > * {
    font-size: 12px !important;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.48px;
  }
`;
