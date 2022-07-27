import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import houseService from './houseService';

export interface House {
  address: string;
  bathrooms: number;
  bedrooms: number;
  description: string;
  readonly id: string;
  max: number;
  min: number;
  name: string;
  place: string;
  price: number;
}

interface HouseState {
  readonly houses: House[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: HouseState = {
  houses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (_, thunkAPI) => {
    try {
      return await houseService.getHouses();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    createHouse: (state, action: PayloadAction<House>) => {
      state.houses.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHouses.fulfilled, (state, action: AnyAction) => {
      state.houses = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getHouses.rejected, (state, action: AnyAction) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

export const { createHouse } = houseSlice.actions;
export default houseSlice.reducer;
