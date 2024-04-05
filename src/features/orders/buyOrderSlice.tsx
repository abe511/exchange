import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type BuyOrderState = {
  price: string,
  quantity: string,
  total: string,
}

const initialState: BuyOrderState = {
  price: "",
  quantity: "",
  total: "",
};


export const buyOrderSlice = createSlice({
  name: "buyOrder",
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setQuantity: (state, action: PayloadAction<string>) => {
      state.quantity = action.payload;
    },
    setTotal: (state, action: PayloadAction<string>) => {
      state.total = action.payload;
    },
    setBuyOrder: (state, action: PayloadAction<BuyOrderState>) => {
      state.price = action.payload.price;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
  }
});


export const { setPrice, setQuantity, setTotal, setBuyOrder } = buyOrderSlice.actions;

export default buyOrderSlice.reducer;
