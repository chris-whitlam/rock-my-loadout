import { configureStore } from '@reduxjs/toolkit';
import { api } from './slices/api';
import loadoutReducer from './slices/loadout-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    loadout: loadoutReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
