import { configureStore } from '@reduxjs/toolkit';
import { equipmentApi } from './slices/equipment-api';
import loadoutReducer from './slices/loadout-slice';

const store = configureStore({
  reducer: {
    [equipmentApi.reducerPath]: equipmentApi.reducer,
    loadout: loadoutReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(equipmentApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
