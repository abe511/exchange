import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../app/tempDB";


const initialState = {
  orders: data[0]
}


export const sellOrderListSlice = createSlice({
  name: "sellOrderList",
  initialState,
  reducers: {
    addSellOrder: (state, action) => {
      // @ts-expect-error slice type
      const isAdded = state.orders[action.payload.pair].sellOrders.some((el, idx) => {
        if (action.payload.price < el.price) {
      // @ts-expect-error slice type
          state.orders[action.payload.pair].sellOrders.splice(idx, 0, action.payload);
          return true;
        }
      });
      if(!isAdded) {
      // @ts-expect-error slice type
        state.orders[action.payload.pair].sellOrders.push(action.payload);
      }
    },
    filterSellOrderList: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].sellOrders = state.orders[action.payload.pair].sellOrders.filter((el) => el.quantity > 0);
    },
    removeSellOrder: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].sellOrders.splice(action.payload.idx, 1);
    },
    reduceSellQuantity: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].sellOrders[action.payload.idx].quantity -= action.payload.buyQuantity;
    },
    reduceSellOrder: (state, action) => {
      // @ts-expect-error slice type
      const order = state.orders[action.payload.pair].sellOrders[action.payload.idx]; 
      const newTotal = parseFloat((order.total - action.payload.buyTotal).toFixed(2));
      order.quantity -= action.payload.buyQuantity;
      order.total = newTotal;
    }
  }
});


export const { addSellOrder, removeSellOrder, reduceSellQuantity, reduceSellOrder, filterSellOrderList } = sellOrderListSlice.actions;

export default sellOrderListSlice.reducer;
