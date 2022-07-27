import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface House {
  readonly id: string;
  name: string;
  adress: string;
}

interface HouseState {
  readonly houses: House[];
}

const initialState: HouseState = {
  houses: [],
};

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    createHouse: (state, action: PayloadAction<House>) => {
      state.houses.push(action.payload);
    },
  },
});

// Selector
export const selectHouses = (state: HouseState) => state.houses;

export const { createHouse } = houseSlice.actions;
export default houseSlice.reducer;
