import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  price: "",
  quantity: "",
  total: "",
};


export const buyOrderSlice = createSlice({
  name: "buyOrder",
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
    setBuyOrder: (state, action) => {
      state.price = action.payload.price;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
  }
});


export const { setPrice, setQuantity, setTotal, setBuyOrder } = buyOrderSlice.actions;

export default buyOrderSlice.reducer;
