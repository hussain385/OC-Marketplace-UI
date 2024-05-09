import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import reducers from './combineReducers';
import { combineReducers } from 'redux';
import { baseApi, extraBaseApi } from './baseAPI';
import rtkQueryErrorLogger from '@/redux/middleware/logger';

const persistConfig = {
  key: 'OPNCORP',
  storage,
  blacklist: ['chat'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const combineReducer1 = combineReducers({
  mainState: persistedReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [extraBaseApi.reducerPath]: extraBaseApi.reducer,
});

export const store = configureStore({
  reducer: combineReducer1,
  devTools: import.meta.env.VITE_ENVIRONMENT !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      rtkQueryErrorLogger,
      baseApi.middleware,
      extraBaseApi.middleware,
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export default store;
