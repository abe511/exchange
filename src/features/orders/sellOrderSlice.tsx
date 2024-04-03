import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  price: "",
  quantity: "",
  total: "",
};


export const sellOrderSlice = createSlice({
  name: "sellOrder",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setSellOrder: (state, action) => {
      state.price = action.payload.price;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
  }
});


export const { setPrice, setQuantity, setTotal, setSellOrder } = sellOrderSlice.actions;

export default sellOrderSlice.reducer;


