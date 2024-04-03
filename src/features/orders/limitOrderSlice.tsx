import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  price: "",
  limit: "",
  quantity: "",
  total: "",
};


export const limitOrderSlice = createSlice({
  name: "limitOrder",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setLimitOrder: (state, action) => {
      state.price = action.payload.price;
      state.limit = action.payload.price;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
    resetLimitOrder: (state) => {
      state.price = "";
      state.limit = "";
      state.quantity = "";
      state.total = "";
    },
  }
});


export const { setPrice, setLimit, setQuantity, setTotal, setLimitOrder, resetLimitOrder } = limitOrderSlice.actions;

export default limitOrderSlice.reducer;
