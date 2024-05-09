import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { showToast, ToastTypes } from '@/common/utils';
import { AppDispatch, RootState } from '@/redux/store';

/**
 * Log a warning and show a toast!
 */
const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload, meta } = action;
    const { data, error, status } = payload as any;

    let message = '';

    if (data) {
      message = data.message;
    } else if (error) {
      if (status === 'FETCH_ERROR') {
        message = 'Something went wrong try again';
      } else {
        message = error;
      }
    }

    if ((status !== 401 || ['loginUser'].includes((meta.arg as any)?.endpointName)) && (meta.arg as any)?.type !== 'query')
      showToast(message, ToastTypes.ERROR);
  }
  return next(action);
};

export default rtkQueryErrorLogger;
