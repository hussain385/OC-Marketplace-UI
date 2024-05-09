import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/number/is-nan';
import './index.css';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Routes } from '@generouted/react-router';
import theme from './theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import store, { persistor } from './redux/store';
import { getCookie, setCookie } from './common/utils/cookie';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
if (!getCookie('x-client-type')) {
  /**
   * TODO set default x-client-type as buyer
   */
  setCookie('x-client-type', 'buyer', 1);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          {/*<Communication />*/}
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
