import '@mui/material/Typography';

declare module '@mui/material/Typography' {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    heading: true;
    subHeading: true;
    subText: true;
  }
}
