import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseWeapon, Loadout, LoadoutWeapon, Weapon } from '@types';

const initialState: Partial<Loadout> = {};

const loadoutSlice = createSlice({
  name: 'loadout',
  initialState,
  reducers: {
    setPrimaryWeapon(state, action: PayloadAction<LoadoutWeapon>) {
      state.primary = action.payload;
    },
    setSecondaryWeapon(state, action: PayloadAction<LoadoutWeapon>) {
      state.secondary = action.payload;
    }
  }
});

export const { setPrimaryWeapon, setSecondaryWeapon } = loadoutSlice.actions;
export default loadoutSlice.reducer;
