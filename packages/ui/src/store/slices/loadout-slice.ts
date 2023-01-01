import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Loadout, Weapon } from '@types';

const initialState: Partial<Loadout> = {};

const loadoutSlice = createSlice({
  name: 'loadout',
  initialState,
  reducers: {
    setPrimaryWeapon(state, action: PayloadAction<Weapon>) {
      state.primaryWeapon = action.payload;
    },
    setSecondaryWeapon(state, action: PayloadAction<Weapon>) {
      state.secondaryWeapon = action.payload;
    }
  }
});

export const { setPrimaryWeapon, setSecondaryWeapon } = loadoutSlice.actions;
export default loadoutSlice.reducer;
