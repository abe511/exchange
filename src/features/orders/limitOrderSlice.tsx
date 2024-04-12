import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Order = {
  price: string,
  limit: string,
  quantity: string,
  total: string
};


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
    setLimitOrder: (state, action: PayloadAction<Order>) => {
      state.price = action.payload.price;
      state.limit = action.payload.limit;
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
