import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../tempDB";

const initialState = {
  currencyFrom: data[0],
  currencyTo: data[1]
};

export const pairSelectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    setCurrencyFrom: (state, action) => {
      state.currencyFrom = action.payload;
    },
    setCurrencyTo: (state, action) => {
      state.currencyTo = action.payload;
    },
    swap: (state) => {
      const temp = state.currencyFrom;
      state.currencyFrom = state.currencyTo;
      state.currencyTo = temp;
    }
  }
});

export const { setCurrencyFrom, setCurrencyTo, swap } = pairSelectorSlice.actions;

export default pairSelectorSlice.reducer;
