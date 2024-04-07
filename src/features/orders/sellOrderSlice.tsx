import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type SellOrderState = {
  price: string,
  quantity: string,
  total: string,
}


const initialState: SellOrderState = {
  price: "",
  quantity: "",
  total: "",
};


export const sellOrderSlice = createSlice({
  name: "sellOrder",
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
    setSellOrder: (state, action: PayloadAction<SellOrderState>) => {
      state.price = action.payload.price;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
  }
});


export const { setPrice, setQuantity, setTotal, setSellOrder } = sellOrderSlice.actions;

export default sellOrderSlice.reducer;


