import { createTheme } from '@mui/material/styles';
import { LinkProps } from '@mui/material';

const mainColor = '#2752E7';
const whiteSpace = '#ffffff';
const mainText = '#ffffff';

export const Color = {
  line: '#eaeaea',
  positive: '#66d19e',
  negative: '#e11900',
  textHint: '#7e7e7e',
  bgGreyLight: '#f6f6f6',
  bgGreyDark: '#7e7e7e',
  priBlue: '#2752e7',
  priWhite: '#ffffff',
  textBlack: '#1d2130',
  priRed: '#ff6a68',
  pureBlack: '#000000',
  lightBlack: '#000',
  bgLine: '#eaeaea',
  darkOrange: '#F43333',
  textBlue: '#276ef1',
  darkGrey: '#1F2024',
  textLight: '#eeeeee ',
  priBlueHover: '#1f40b4',
  secondaryHover: '#f0f0f0',
  priRedHover: '#f35250',
  lightGreen: '#C9F5E6',
  lightBlue: '#E9F4FE',
  lightRed: '#FF6A68',
  transparent: 'transparent',
  textLigBlack: '#2C3131;',
  gridHeaderColor: '#F8F8F8',
  gridHeaderTextColor: '#303030',
  priBlue2: '#195DD3',
  textGray: '#667085',
  borderColorGray: '#EDEDED',
  lightGrey: '#BFBFBF',
  green: '#0F9757',
  purple: '#491EB5',
  pink: '#C11574',
  gray: '#636363',
  orderStatus: {
    notstarted: '#B8B8B8',
    inprogress: '#195DD3',
    requestCancellation: '#B54708',
    requestRevision: '#C11574',
    late: '#B42318',
    reviewDelivery: '#491EB5',
    completed: '#0F9757',
    cancelled: '#636363',
    paid: '#2CAF70',
  },
  gray9C: '#9C9C9C',
  yellow: '#FFD954',
  orderStar: '#2CAF70',
  E3E3E3: '#E3E3E3',
  borderLightOrange: '#F46D33',
  bgLightOrange: '#FFEEE4',
  E9EEFD: '#E9EEFD',
  EFEEEE: '#EFEEEE',
  EFEFEF: '#EFEFEF',
  billingStatus: {
    paid: '#008144',
    pending: '#FFF7CF',
    refunded: '#1044C6',
    refunding: '#F04C4B',
    failed: '#B42318',
  },
  price: '#008144',
  textGray2: '#7A7A7A',
  borderGray2: '#EAEAEA',
  textGray7E: '#7E7E7E',
  litegreen: '#66D19E',
  liteyellow: '#FFD954',
  green2: '#34A853',
};

export const Breakpoints = {
  xs: 0,
  sm: 481,
  md: 769,
  lg: 1281,
  xl: 1441,
};

const theme = createTheme({
  breakpoints: {
    values: Breakpoints,
  },
  palette: {
    primary: {
      main: whiteSpace,
      contrastText: mainText,
    },
    secondary: {
      main: mainColor,
    },
  },
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        //disableRipple: true, // No more ripple!
      },
      styleOverrides: {
        root: {
          '&.MuiPickersDay-root': {
            '&.Mui-selected': {
              backgroundColor: Color.priBlue,
              '&:hover': {
                backgroundColor: Color.priBlue,
              },
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // text buttons
        text: {
          color: mainText,
        },
        outlined: {
          color: mainText,
        },
        contained: {
          color: mainText,
          fontWeight: 700,
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            height: '56px',
            fontSize: '1rem',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                border: '0.5px solid #2752E7',
                borderRadius: '4px',
              },
            },
            '& .MuiOutlinedInput-root:hover': {
              '& > fieldset': {
                border: '0.5px solid #2752E7',
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& > fieldset': {
                borderColor: '#2752E7',
                borderRadius: '4px',
              },
            },
          },
        },
      ],
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: Color.priBlue,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: Color.priBlue,
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        // component: LinkBehavior,
      } as LinkProps,
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            letterSpacing: 'normal !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '-0.56px',
        },
      },
      variants: [
        {
          props: { variant: 'heading' },
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.2',
            letterSpacing: '-0.5px',
            textAlign: 'left',
            color: '#1d2130',
          },
        },
        {
          props: { variant: 'subHeading' },
          style: {
            fontSize: '14px',
            color: '#1d2130',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'subText' },
          style: {
            color: '#7E7E7E',
            fontSize: 12,
            fontWeight: '600',
          },
        },
      ],
      // 	styleOverrides: {
      // 		// text buttons
      // 		h4: {
      // 			fontWeight: 700,
      // 			fontFamily: 'Montserrat',
      // 		},
      // 		h6: {
      // 			fontWeight: 700,
      // 			fontFamily: 'Montserrat',
      // 			color: '#646464',
      // 		},
      // 	},
    },
    // MuiFab: {
    // 	styleOverrides: {
    // 		circular: {
    // 			color: 'black',
    // 			position: 'fixed',
    // 			bottom: 70,
    // 			right: 70,
    // 			fontFamily: 'Montserrat',
    // 		},
    // 	},
    // },
  },
});

export const gridStyles = {
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: 'rgba(39, 82, 231, 0.05)',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'rgba(39, 82, 231, 0.05)',
  },
  '& .MuiCheckbox-root.Mui-checked': {
    color: Color.priBlue,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
    fontFamily: 'Manrope',
    letterSpacing: '-0.5px',
    lineHeight: '24px',
  },
  '& .MuiDataGrid-columnHeaders': {
    background: Color.gridHeaderColor,
    color: Color.gridHeaderTextColor,
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiTablePagination-displayedRows': {
    margin: 'auto',
  },
  '& .MuiTablePagination-selectLabel': {
    margin: 'auto',
  },
};

export default theme;

// Reference Link
// https://mui.com/customization/theming/
// https://mui.com/components/
// https://mui.com/components/material-icons/?theme=Rounded&query=Gear
