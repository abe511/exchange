import { createSlice } from "@reduxjs/toolkit";
import { codes } from "../../app/tempDB";


const initialState = {
  currencyBase: codes[0],
  currencyQuote: codes[1],
};


export const pairSelectorSlice = createSlice({
  name: "pairSelector",
  initialState,
  reducers: {
    setCurrencyBase: (state, action) => {
      state.currencyBase = action.payload;
    },
    setCurrencyQuote: (state, action) => {
      state.currencyQuote = action.payload;
    },
    swap: (state) => {
      const temp = state.currencyBase;
      state.currencyBase = state.currencyQuote;
      state.currencyQuote = temp;
    }
  }
});


export const { setCurrencyBase, setCurrencyQuote, swap } = pairSelectorSlice.actions;

export default pairSelectorSlice.reducer;
