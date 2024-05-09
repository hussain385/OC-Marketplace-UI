import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
  small: {
    name: 'Small',
    styles: {
      width: '481px',
      height: '567px',
    },
  },
  medium: {
    name: 'Medium',
    styles: {
      width: '769px',
      height: '886px',
    },
  },
  large: {
    name: 'Large',
    styles: {
      width: '1281px',
      height: '720px',
    },
  },
  extralarge: {
    name: 'Extra Large',
    styles: {
      width: '1441px',
      height: '1080px',
    },
  },
};
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  breakpoints: {
    breakpointNames: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1281,
      xl: 1441,
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports
    },
  },
}