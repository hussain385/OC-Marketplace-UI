/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';

import {
  Badge,
  Box,
  Button,
  Chip,
  Input,
  LinearProgress,
  linearProgressClasses,
  Link,
  styled as materialStyled,
  Tab,
  Typography,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';

import { ToastContainer } from 'react-toastify';

import { Color } from '../../theme';

type ButonProps = {
  display?: string;
  flexWidth?: string;
  background?: string;
  rowCenter?: string;
  columnCenter?: string;
  onClick: () => void;
};

type InputProps = {
  display?: string;
  background?: string;
  paddingLeft?: string;
  flexWidth?: string;
  rowCenter?: string;
  columnCenter?: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

type DivProps = {
  height?: string;
  background?: string;
  positionTop?: string;
  posLeftDesktop?: string;
  posLeftMobile?: string;
  posLeftMobilex320?: string;
};

export const navInputDivStyle = {
  height: '40px',
  maxWidth: '359px',
  borderRadius: '100em',
  paddingInline: '1.5em',
  border: 'none',
  backgroundColor: '#F6F6F6',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
};

// Using a css block
const ButtonDrop = styled.button<ButonProps>`
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
  }

  &:after {
    content: '';
    width: 2px;
    height: 24px;
    background: ${Color.line};
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    margin-left: 16px;
  }

  display: ${(props) => (props.display ? props.display : 'none')};
  flex-basis: ${(props) => props.flexWidth};
  justify-content: ${(props) => props.rowCenter};
  align-items: ${(props) => props.columnCenter};
  background: ${(props) => (props.background ? props.background : 'none')};
`;

const InputDrop = styled.input<InputProps>`
  border: none;
  outline: none;
  font-family: Manrope;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;

  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : '16px')};
  background: ${(props) => (props.background ? props.background : 'none')};
  display: ${(props) => props.display};
  flex-basis: ${(props) => props.flexWidth};
  justify-content: ${(props) => props.rowCenter};
  align-items: ${(props) => props.columnCenter};

  &:focus {
    background: none;
    -webkit-apperance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// const InputDrop = styled.input`
// 	display: flex;
// 	flex-basis: 70%;
// 	border: none;
// 	outline: none;
// `;

const InputUl = styled.ul`
  width: auto;
  margin: 0 auto;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

const InputList = styled.li`
  width: 100%;
  margin: 0 auto;
  list-style-type: none;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 15px;
  gap: 8px;
  letter-spacing: -0.5px;
  text-overflow: ellipsis;
  text-align: left;

  &.selected {
    color: #7e7e7e;
  }

  &:hover {
    cursor: pointer;
    background: #f4f3f2;
  }
`;

const PhoneInputDivision = styled.div<DivProps>`
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7e7e7e;
    border-radius: 10em;
  }

  max-height: 115px;
`;

const Divison = styled.div<DivProps>`
  position: absolute;
  min-width: 316px;

  left: ${(props) => (props.posLeftDesktop ? props.posLeftDesktop : '0')};
  z-index: 99;
  overflow-y: auto;
  scroll-width: thin;
  padding: 24px 16px 24px 16px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  background: #ffffff;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7e7e7e;

    height: 36px;
  }

  max-height: 212px;
  min-height: ${(props) => (props.height ? props.height : '212px')};
  background: ${(props) => props.background};
  top: ${(props) => (props.positionTop ? props.positionTop : '0')};

  @media (max-width: 480px) {
    left: ${(props) => (props.posLeftMobile ? props.posLeftMobile : '0')};
  }

  @media (max-width: 321px) {
    min-width: 280px;

    left: ${(props) => (props.posLeftMobilex320 ? props.posLeftMobilex320 : '0')};
  }
`;

export { ButtonDrop, InputDrop, Divison, InputList, InputUl, PhoneInputDivision };

export const BoxContainer = materialStyled(Box)(({ theme }) => ({
  width: '100%',
  margin: '10px auto',

  [theme.breakpoints.down('sm')]: {
    margin: '0',
  },
}));

export const BorderdBoxContainer = materialStyled(Box)(() => ({
  width: '100%',
  margin: '10px auto',
  padding: '15px',
  border: `1px solid ${Color.line}`,
  borderRadius: '10px',
}));

export const FormContainer = materialStyled(Box)(() => ({
  display: 'flex',
  borderBottom: '1px solid #EAEAEA',
  margin: '15px 0',
  paddingBottom: '10px',
}));

export const FormLabel = materialStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: Color.textBlack,
  fontFamily: 'Manrope',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    fontWeight: 700,
    letterSpacing: '-0.03em',
  },
}));

export const SubHeading = materialStyled(Typography)(() => ({
  fontSize: '16px',
  color: Color.textBlack,
  fontFamily: 'Manrope',
  fontWeight: 400,
}));

export const TextHint = materialStyled(Typography)({
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.textHint,
});

export const ActionButton = materialStyled(Button)({
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.priBlue,
  fontWeight: 600,
  textTransform: 'inherit',
});

export const StatusBadge = materialStyled(Typography)({
  borderRadius: '100px',
  padding: '4px 8px',
  fontFamily: 'Manrope',
  display: 'inline-block',
  fontSize: '12px',
  margin: 'auto 10px',
  '&.Pending': {
    color: '#FF6A68',
    backgroundColor: '#F6F6F6',
  },
  '&.Approved': {
    color: '#2752E7',
  },
});

export const DeliveryBadge = materialStyled(Typography)({
  borderRadius: '100px',
  padding: '4px 8px',
  fontFamily: 'Manrope',
  display: 'inline-block',
  fontSize: '12px',
  margin: 'auto 10px',
  color: Color.priBlue,
  backgroundColor: '#E9F1FF',
});

export const MuiInputField = materialStyled(Input)(() => ({
  color: Color.lightBlack,
  width: '100%',
  height: '44px',
  padding: '10px',
  fontSize: '14px',
  fontFamily: 'Manrope',
  borderRadius: '2px',
  border: `1px solid ${Color.line}`,
  '&:focus': {
    outline: 'none',
    border: `0px solid ${Color.pureBlack}`,
  },
  '&:before': {
    borderBottomWidth: '0px',
  },
  /*
	[theme.breakpoints.down('sm')]: {
		padding: '15px 16px',
	},
	[theme.breakpoints.down(321)]: {
		fontSize: '14px',
		padding: '15px 8px',
	},*/
}));

export const ErrorLabel = materialStyled(Typography)({
  padding: '4px 0px',
  fontFamily: 'Manrope',
  display: 'inline-block',
  fontSize: '14px',
  margin: '5px 0px',
  color: Color.priRed,
});

export const PrimaryButton = materialStyled(Button)({
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.priWhite,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.priBlue,
  height: '44px',
  padding: '10px 28px',
  '&:hover': {
    backgroundColor: Color.priBlueHover,
  },
  '&.small': {
    padding: '8px 16px',
    height: '36px',
    fontSize: '12px',
  },
  '&.Mui-disabled': {
    backgroundColor: '#7A7A7A70',
    color: Color.priWhite,
  },
});

export const PrimaryRedButton = materialStyled(Button)({
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.priWhite,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.priRed,
  height: '44px',
  padding: '10px 28px',
  '&:hover': {
    backgroundColor: Color.priRedHover,
  },
  '&.small': {
    padding: '8px 16px',
    height: '36px',
    fontSize: '12px',
  },
});

export const SecondryButton = materialStyled(Button)({
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.priBlue,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.bgGreyLight,
  height: '44px',
  padding: '10px 28px',
  '&:hover': {
    backgroundColor: Color.secondaryHover,
  },
  '&.small': {
    padding: '8px 16px',
    height: '36px',
    fontSize: '12px',
  },
});

export const TextButton = materialStyled(Button)({
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.textHint,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: 'transparent',
  padding: '5px 10px',
});

export const MuiPlainInputField = materialStyled(Input)(() => ({
  color: Color.lightBlack,
  width: '100%',
  height: '44px',
  padding: '10px',
  fontSize: '14px',
  fontFamily: 'Manrope',
  borderRadius: '0px',
  border: `0px solid ${Color.line}`,
  '&:focus': {
    outline: 'none',
    border: `0px solid ${Color.pureBlack}`,
  },
  '&:before': {
    borderBottomWidth: '0px',
  },
  /*
	[theme.breakpoints.down('sm')]: {
		padding: '15px 16px',
	},
	[theme.breakpoints.down(321)]: {
		fontSize: '14px',
		padding: '15px 8px',
	},*/
}));

export const AvatarLabel = materialStyled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: 'Manrope',
});

export const NameLabel = materialStyled(Typography)({
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: 'Manrope',
  color: Color.textBlack,
  letterSpacing: '-0.5px',
});

export const EmailLabel = materialStyled(Typography)({
  fontSize: '12px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textHint,
});

export const TimestampLabel = materialStyled(Typography)({
  fontSize: '10px',
  fontWeight: 600,
  fontFamily: 'Manrope',
  color: Color.textHint,
});

export const TextLabel = materialStyled(Typography)({
  fontSize: '12px',
  fontWeight: 400,
  fontFamily: 'Manrope',
  color: Color.textBlack,
});

export const TextLink = materialStyled(Link)({
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: 'Manrope',
  color: Color.priBlue,
});

export const Heading24 = materialStyled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textBlack,
});

export const RoomListCard = materialStyled(Box)(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  flexGrow: 1,
  width: '100%',
  maxWidth: '392px',
  borderRadius: '6px',
  transition: 'all 0.5s',
  cursor: 'pointer',
  marginBottom: '8px',
  // '&:hover, &.active': {
  //   borderBottom: `1px solid ${Color.priBlue}`,
  //   boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.12)',
  // },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    paddingRight: '0',
  },
  '&:hover': {
    background: '#e9f4fe',
  },
}));

export const OCCard = RoomListCard;

export const OnlineStatusBadge = materialStyled(Typography)({
  borderRadius: '100px',
  padding: '2px 4px',
  fontFamily: 'Manrope',
  display: 'inline-block',
  fontSize: '8px',
  fontWeight: '700',
  color: Color.textBlack,
  backgroundColor: Color.lightGreen,
  margin: 'auto 10px',
  '&.Offline': {
    color: Color.textHint,
    backgroundColor: Color.bgGreyLight,
  },
});

export const ChatCard = materialStyled(Box)({
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  transition: 'all 0.5s',
});

export const Heading16 = materialStyled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textBlack,
});

export const Heading12 = materialStyled(Typography)({
  fontSize: '12px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textBlack,
  display: 'inline-block',
});

export const Text11 = materialStyled(Typography)({
  fontSize: '11px',
  fontWeight: 500,
  fontFamily: 'Manrope',
  color: Color.textBlack,
  display: 'inline-block',
});

export const Text12 = materialStyled(Typography)({
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: 'Manrope',
  color: Color.textBlack,
  display: 'inline-block',
});

export const MessageAttachmentCard = materialStyled(Box)(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.textBlack,
  background: Color.lightBlue,
  borderRadius: '6px',
  padding: '4px 10px',
  marginLeft: '15px',
  width: '400px',
  border: `1px solid ${Color.bgLine}`,
  [theme.breakpoints.down('sm')]: {
    width: '50%',
  },
}));

export const OnlineBadge = styled(Badge)(({ theme }: any) => ({
  '&.MuiBadge-root': {
    '&.seller': {
      bottom: '2px',
    },
    position: 'absolute',
    bottom: '0px',
    right: '8px',
  },
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export const OfflineBadge = styled(Badge)(({ theme }: any) => ({
  '&.MuiBadge-root': {
    '&.seller': {
      bottom: '2px',
    },
    position: 'absolute',
    bottom: '0px',
    right: '8px',
  },
  '& .MuiBadge-badge': {
    backgroundColor: '#CCCCCC',
    color: '#CCCCCC',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.5)',
      content: '""',
    },
  },
}));

export const StyledTab = styled(Tab)(({ theme }: any) => ({
  textTransform: 'inherit',
  fontSize: '16px',
  '&.Mui-selected': {
    color: `${Color.priBlue} !important`,
    fontWeight: 'bold',
    fontSize: '14px',
    letterSpacing: '0',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    '&.Mui-selected': {
      fontSize: '14px',
      letterSpacing: '-1.12px',
    },
  },
  [theme.breakpoints.down(321)]: {
    fontSize: '12px',
    '&.Mui-selected': {
      fontSize: '12px',
    },
  },
}));

export const PlainStyledTab = styled(Tab)(({ theme }: any) => ({
  textTransform: 'inherit',
  fontSize: '14px',
  '&.Mui-selected': {
    color: `${Color.priBlue} !important`,
    fontWeight: 'bold',
    letterSpacing: '0',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    '&.Mui-selected': {
      fontSize: '14px',
      letterSpacing: '-1.12px',
    },
  },
  [theme.breakpoints.down(321)]: {
    fontSize: '12px',
    '&.Mui-selected': {
      fontSize: '12px',
    },
  },
}));

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    min-height: 50px;
  }
`;

export const Text14 = materialStyled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: 'Manrope',
  color: Color.pureBlack,
});

export const RoundContainer = materialStyled(Box)(({ theme }) => ({
  background: Color.priWhite,
  borderRadius: '12px',
  padding: '46px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.16)',
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    boxShadow: 'none',
    borderRadius: '0',
  },
}));

export const GreyRoundedContainer = materialStyled(Box)(() => ({
  background: Color.bgGreyLight,
  borderRadius: '4px',
  padding: '10px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

export const ActionButtonPrimary = materialStyled(Button)({
  minWidth: '130px',
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.priWhite,
  fontWeight: 700,
  textTransform: 'inherit',
  backgroundColor: Color.priBlue,
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: Color.priBlueHover,
  },
});

export const ActionButtonSecondry = materialStyled(Button)({
  minWidth: '130px',
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.textBlack,
  fontWeight: 700,
  textTransform: 'inherit',
  backgroundColor: Color.priWhite,
  padding: '8px 16px',
  border: `1px solid ${Color.bgLine}`,
  '&:hover': {
    backgroundColor: Color.secondaryHover,
  },
});

export const DataGriMobile = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': { display: 'none' },
  '& .MuiDataGrid-virtualScroller': { marginTop: '1rem !important', overflow: 'auto !important' },
  '& .MuiDataGrid-virtualScrollerContent': { height: '100% !important', minHeight: '480px !important' },
  '& .MuiDataGrid-renderingZone': {
    maxHeight: 'none !important',
  },
  '& .MuiDataGrid-cell': {
    lineHeight: 'unset !important',
    maxHeight: 'none !important',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    padding: '0 0 1rem 0 !important',
  },
  '& .MuiDataGrid-row': {
    padding: '0 1rem 0 0 !important',
    maxHeight: 'none !important',
    marginBottom: '1.5rem',
    overflow: 'auto',
  },
  virtualScrollerContent: {
    width: '100% !important',
    height: '100% !important',
    overflow: 'scroll',
  },
}));

export const ActionButtonOutlined = materialStyled(Button)({
  minWidth: '130px',
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.priBlue,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.priWhite,
  padding: '4px 32px 4px 32px',
  border: `1px solid ${Color.priBlue}`,
  '&:hover': {
    border: `1px solid ${Color.priBlue}`,
  },
  '&.green': {
    borderColor: Color.litegreen,
    color: Color.litegreen,
    '&:hover': {
      borderColor: Color.litegreen,
    },
  },
});
export const ActionButtonVerify = materialStyled(Button)(({ theme }) => ({
  minWidth: '130px',
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.priWhite,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.darkOrange,
  padding: '5px 7px 5px 7px',

  // border: `1px solid ${Color.priBlue}`,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: Color.darkOrange,
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: '15px',
    padding: '10px 32px 10px 32px',
  },
}));

export const ActionButtonOutlinedPrimary = materialStyled(Button)({
  minWidth: '130px',
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.priWhite,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.priBlue,
  padding: '4px 32px 4px 32px',
  border: `1px solid ${Color.priBlue}`,
  '&:hover': {
    border: `1px solid ${Color.priBlue}`,
    backgroundColor: `${Color.priBlue}90`,
  },
});

export const ActionButtonOutlinedSecondary = materialStyled(Button)({
  minWidth: '130px',
  fontSize: '12px',
  fontFamily: 'Manrope',
  color: Color.textBlack,
  fontWeight: 600,
  borderRadius: '4px',
  textTransform: 'inherit',
  backgroundColor: Color.priWhite,
  padding: '4px 32px 4px 32px',
  border: `1px solid ${Color.textHint}`,
  '&:hover': {
    border: `1px solid ${Color.textBlack}`,
  },
  '&.Mui-disabled': {
    borderColor: Color.borderColorGray,
  },
});

export const Heading20 = materialStyled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textBlack,
});

export const Heading14 = materialStyled(Typography)({
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textBlack,
});

export const ShadowBox = materialStyled(Box)(({ theme }) => ({
  display: 'flex',
  background: Color.priWhite,
  borderRadius: '0px 2px 2px 0px',
  justifyContent: 'space-between',
  padding: '24px',
  boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${Color.borderColorGray}`,
  [theme.breakpoints.down('sm')]: {
    boxShadow: 'none',
  },
}));
export const BpIcon = materialStyled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

export const BpCheckedIcon = materialStyled(BpIcon)({
  backgroundColor: Color.priBlue,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: Color.priBlue,
  },
});

export const LabelOptional = materialStyled(Typography)({
  fontSize: '12px',
  fontWeight: 400,
  fontFamily: 'Manrope',
  color: Color.gray9C,
  display: 'inline-block',
});

export const StatusLabel = materialStyled(Box)(() => ({
  background: Color.bgGreyLight,
  borderRadius: '2px',
  padding: '8px',
  fontFamily: 'Manrope',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '10px',
  letterSpacing: '-0.2px',
  textTransform: 'uppercase',
  '&.paid': {
    color: Color.billingStatus.paid,
  },
  '&.pending': {
    color: Color.textHint,
    background: '#FFF7CF',
  },
  '&.refunded': {
    color: Color.billingStatus.refunded,
    background: '#E9F1FF',
  },
  '&.refunding': {
    color: Color.billingStatus.refunding,
    background: '#FFF7CF',
  },
  '&.failed': {
    color: Color.billingStatus.failed,
    background: '#FDEAE9',
  },
  '&.green': {
    color: Color.green,
    background: `${Color.green}10`,
    display: 'inline-block',
  },
}));

export const RetryPurchaseBtn = materialStyled(Button)(() => ({
  background: '#FFD954',
  fontWeight: '600',
  fontSize: '14px',
  color: Color.textBlack,
  padding: '8px 10px',
  height: '40px',
  borderRadius: '4px',
  textTransform: 'capitalize',
}));

export const Text20 = materialStyled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.pureBlack,
  letterSpacing: '-0.4px',
});

// Table Style
export const StyledTableCell = materialStyled(TableCell)(({ theme }) => ({
  border: `1px solid ${Color.E3E3E3}`,
  verticalAlign: 'top',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Color.bgGreyLight,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: 700,
    border: `1px solid ${Color.E3E3E3}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = materialStyled(TableRow)(({ theme }) => ({
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
  '&.footer': {
    background: Color.E9EEFD,
  },
  '&.no-border': {
    '& td, & th': {
      border: 0,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  ['&.no-background']: {
    '& td, & th': {
      backgroundColor: Color.priWhite,
    },
  },
  '&.border-top': {
    borderTop: `1px solid ${Color.E3E3E3}`,
  },
}));

export const Heading32 = materialStyled(Typography)({
  fontSize: '32px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.textBlack,
});

export const BorderRoundedContainer = styled(Box)({
  border: `1px solid ${Color.borderColorGray}`,
  padding: '16px',
  background: Color.priWhite,
});

export const Text16 = materialStyled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.pureBlack,
  lineHeight: '24px',
});

export const Text18 = materialStyled(Typography)({
  fontSize: '18px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.pureBlack,
  lineHeight: '24px',
});

export const Heading50 = materialStyled(Typography)({
  fontSize: '50px',
  fontWeight: 700,
  fontFamily: 'Manrope',
  color: Color.pureBlack,
  letterSpacing: '-0.4px',
  marginBlock: '15px',
});

export const Text25 = materialStyled(Typography)({
  fontSize: '25px',
  fontWeight: 500,
  fontFamily: 'Manrope',
  color: Color.pureBlack,
  letterSpacing: '-0.4px',
});

export const BorderContainer = styled(Box)({
  border: `1px solid ${Color.borderColorGray}`,
  padding: '16px',
  background: Color.priWhite,
  marginBottom: '32px',
});

export const BorderContainerLight = styled(Box)({
  border: `1px solid ${Color.EFEEEE}`,
  padding: '16px',
  background: Color.priWhite,
  marginTop: '16px',
});

export const FlatStatusBadge = materialStyled(Typography)({
  borderRadius: '4px',
  padding: '4px 8px',
  fontFamily: 'Manrope',
  display: 'block',
  fontSize: '10px',
  margin: '5px 0px',
  '&.blue': {
    color: Color.priWhite,
    backgroundColor: Color.priBlue,
  },
  '&.yellow': {
    color: Color.pureBlack,
    backgroundColor: Color.yellow,
  },
  '&.red': {
    color: Color.priWhite,
    backgroundColor: Color.lightRed,
  },
  '&.uppercase': {
    textTransform: 'uppercase',
  },
  '&.bold': {
    fontWeight: '700',
  },
  '&.inline': {
    display: 'inline-block',
  },
});

export const CustomChip = materialStyled(Chip)({
  height: '22px',
  marginTop: '10px',
  textTransform: 'capitalize',
  '&.pending': {
    borderColor: Color.lightRed,
    '& .MuiChip-label': {
      color: Color.lightRed,
    },
  },
  '&.paid': {
    borderColor: Color.green,
    '& .MuiChip-label': {
      color: Color.green,
    },
  },
});

export const BorderLinearProgress = materialStyled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: Color.green2,
  },
}));

export const PrimaryButtonGreen = materialStyled(Button)({
  fontSize: '14px',
  fontFamily: 'Manrope',
  color: Color.priWhite,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.green2,
  height: '44px',
  padding: '10px 28px',
  '&:hover': {
    backgroundColor: Color.green,
  },
  '&.small': {
    padding: '8px 16px',
    height: '36px',
    fontSize: '12px',
  },
  '&.Mui-disabled': {
    backgroundColor: '#7A7A7A70',
    color: Color.priWhite,
  },
});
