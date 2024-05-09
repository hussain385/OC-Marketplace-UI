import { Box } from '@mui/material';
import React from 'react';
import { IDetailCardProps } from './detail-card.interface';
import { DetailCardBox } from './detail-card.style';

const DetailCardView = (props: IDetailCardProps) => {
  return <DetailCardBox sx={props.sx}>{props.children}</DetailCardBox>;
};
const Header = ({ children }: any) => {
  return <Box className='header'>{children}</Box>;
};
const Content = ({ children }: any) => {
  return <Box className='content'>{children}</Box>;
};
const Footer = ({ children }: any) => {
  return <Box className='footer'>{children}</Box>;
};
DetailCardView.Header = Header;
DetailCardView.Content = Content;
DetailCardView.Footer = Footer;

export default DetailCardView;
