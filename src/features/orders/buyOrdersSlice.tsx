import { createSlice } from "@reduxjs/toolkit";
import { buyOrders } from "../../app/tempDB";

const initialState = {
  buyOrders: buyOrders
};

export const buyOrdersSlice = createSlice({
  name: "buyOrder",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.buyOrders.push(action.payload);
    },
    removeOrder: (state) => {
      state.buyOrders.pop();
    }
  }
});


export const { addOrder, removeOrder } = buyOrdersSlice.actions;

export default buyOrdersSlice.reducer;
